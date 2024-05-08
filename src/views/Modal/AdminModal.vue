<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton @click="onCancelAdminModal">{{ $t('cancel') }}</IonButton>
      </IonButtons>
      <IonTitle class="center">User Management</IonTitle>
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
</template>

<script setup lang="ts">
import useFirebase from "@/hooks/useFirebase";
import {IonButton, IonButtons, IonContent, IonHeader, IonLabel, IonTitle, IonToolbar, modalController, IonList, IonItem} from "@ionic/vue";
import {onMounted, ref} from "vue";
import {showInputAlert} from "@/hooks/useUtils";

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
  showInputAlert('Change password','',`Username: ${users.value[index].name}`,'Ok','Cancel',inputs,(data:any)=>{
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
  showInputAlert('Change unlimited','',`Username: ${users.value[index].name}`,'Ok','Cancel',inputs,(data:any)=>{
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