<template>
  <IonHeader>
    <IonToolbar>
      <IonTitle class="center">Admin</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-padding">
    <IonList v-for="(user,index) in users" class="ion-padding-bottom">
      <IonItem v-if="user.name !=='admin'">
        <IonLabel fill="clear">
          {{user.name}}
          <img v-if="user.isUnlimited" :src="'images/icon/unlimitedIcon.png'" alt="unlimited" style="width: 20px"/>
        </IonLabel>
        <IonButton @click="onClickPassword(index)" fill="clear" style="text-decoration: underline">Password</IonButton>
        <IonButton @click="onClickUnlimited(index)" fill="clear" style="text-decoration: underline">Unlimited</IonButton>
      </IonItem>
    </IonList>
  </IonContent>
  <IonButton class="ion-padding ion-align-self-center" @click="onCancelAdminModal" color="dark" size="small" shape="round">{{$t('close')}}</IonButton>
</template>

<script setup lang="ts">
import useFirebase from "@/hooks/useFirebase";
import {IonButton, IonButtons, IonContent, IonHeader, IonLabel, IonTitle, IonToolbar, modalController, IonList, IonItem} from "@ionic/vue";
import {onMounted, ref} from "vue";
import {showInputAlert} from "@/hooks/useUtils";
import {useI18n} from "vue-i18n";

const { t } = useI18n();
const {getUser,upSertUser} = useFirebase();
const users = ref([]);

const getAllUsers = ()=>{
  getUser('').then((res) => {
    users.value = res.data;
  });
}

const onCancelAdminModal = () => {
  modalController.dismiss(null, 'cancel')
}

const onClickPassword = (index: number) => {
  const inputs = [{
    name:'password',
    label: 'Password',
    type: 'text',
    value: users.value[index].password,
    placeholder: 'Password'
  }]
  showInputAlert(t('changePassword'),'',`${t('username')}: ${users.value[index].name}`,t('ok'),t('cancel'),inputs,(data:any)=>{
    upSertUser(users.value[index].name,data.password,users.value[index].email,users.value[index].isUnlimited,users.value[index].unlimitedExpiredDate).then(()=>{
      users.value[index].password = data.password;
    });
  });
}

const onClickUnlimited = (index: number) => {
  const inputs = [{
    name:'unlimited',
    label: 'Unlimited',
    type: 'checkbox',
    value: true,
    checked: users.value[index].isUnlimited,
  }]
  showInputAlert(t('changeUnlimited'),'',`${t('username')}: ${users.value[index].name}`,t('ok'),t('cancel'),inputs,(data:any)=>{
    upSertUser(users.value[index].name,users.value[index].password,users.value[index].email,data.length > 0,users.value[index].unlimitedExpiredDate).then(()=>{
      users.value[index].isUnlimited = data.length > 0;
    });
  });
}

onMounted(()=> {
  getAllUsers();
});
</script>

<style scoped>

</style>