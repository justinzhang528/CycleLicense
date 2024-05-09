<template>
  <IonHeader>
    <IonToolbar>
      <IonTitle class="center">{{$t('userManagement')}}</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-padding">
    <IonButton @click="onClickCreate" fill="clear" style="text-decoration: underline">{{ $t('create') }}</IonButton>
    <IonList v-for="(user,index) in users" class="ion-padding-bottom">
      <IonItem v-if="user.name !=='admin'">
        <IonLabel>
          {{user.name}}
          <img v-if="user.isUnlimited" :src="'images/icon/unlimitedIcon.png'" alt="unlimited" style="width: 20px"/>
        </IonLabel>
        <IonButton @click="onClickPassword(index)" fill="clear" style="text-decoration: underline">{{ $t('password') }}</IonButton>
        <IonButton @click="onClickUnlimited(index)" fill="clear" style="text-decoration: underline">{{ $t('unlimited') }}</IonButton>
        <IonButton @click="onClickDelete(index)" fill="clear" style="text-decoration: underline">{{ $t('delete') }}</IonButton>
      </IonItem>
    </IonList>
  </IonContent>
  <IonButton class="ion-padding ion-align-self-center" @click="onCancelAdminModal" color="dark" size="small" shape="round">{{$t('close')}}</IonButton>
</template>

<script setup lang="ts">
import useFirebase from "@/hooks/useFirebase";
import {IonButton, IonContent, IonHeader, IonLabel, IonTitle, IonToolbar, modalController, IonList, IonItem} from "@ionic/vue";
import {onMounted, ref} from "vue";
import {showInputAlert, showToast} from "@/hooks/useUtils";
import {useI18n} from "vue-i18n";

const { t } = useI18n();
const {getUser, upSertUser, removeUser} = useFirebase();
const users = ref({});

const getAllUsers = ()=>{
  getUser('').then((res) => {
    users.value = res.data;
  });
}

const onCancelAdminModal = () => {
  modalController.dismiss(null, 'cancel')
}

const onClickCreate = () => {
  const inputs = [{
    name:'name',
    type: 'text',
    placeholder: t('username')
  },{
    name:'password',
    type: 'text',
    placeholder: t('password')
  },{
    name:'email',
    type: 'text',
    placeholder: t('email')
  }]
  showInputAlert(t('createUser'),'','',t('ok'),t('cancel'),inputs,(data:any)=>{
    if(data.name === '' || data.password === '' || data.email === ''){
      showToast(t('pleaseFillAllFields'),1500);
      return;
    }
    if(users.value !== null && users.value.hasOwnProperty(data.name)){
      showToast(t('alreadyExist'),1500);
      return;
    }
    upSertUser(data.name,data.password,data.email).then(()=>{
      getAllUsers();
      showToast(t('successfullyCreated'),1500);
    });
  });

}

const onClickPassword = (index: number) => {
  const inputs = [{
    name:'password',
    label: 'Password',
    type: 'text',
    value: users.value[index].password,
    placeholder: t('password')
  }]
  showInputAlert(t('changePassword'),'',`${t('username')}: ${users.value[index].name}`,t('ok'),t('cancel'),inputs,(data:any)=>{
    if(data.password === ''){
      showToast(t('pleaseFillAllFields'),1500);
      return;
    }
    upSertUser(users.value[index].name,data.password,users.value[index].email,users.value[index].isUnlimited,users.value[index].unlimitedExpiredDate).then(()=>{
      users.value[index].password = data.password;
      showToast(t('successfullyUpdated'),1500);
    });
  });
}

const onClickUnlimited = (index: number) => {
  const inputs = [{
    name:'unlimited',
    label: t('unlimited'),
    type: 'checkbox',
    value: true,
    checked: users.value[index].isUnlimited,
  }]
  showInputAlert(t('changeUnlimited'),'',`${t('username')}: ${users.value[index].name}`,t('ok'),t('cancel'),inputs,(data:any)=>{
    upSertUser(users.value[index].name,users.value[index].password,users.value[index].email,data.length > 0,users.value[index].unlimitedExpiredDate).then(()=>{
      users.value[index].isUnlimited = data.length > 0;
      showToast(t('successfullyUpdated'),1500);
    });
  });
}

const onClickDelete = (index: number) => {
  showInputAlert(t('deleteUser'), '', `${t('username')}: ${users.value[index].name}`, t('ok'), t('cancel'), [], () => {
    const name = users.value[index].name;
    removeUser(name).then(() => {
      delete users.value[name];
      showToast(t('successfullyDeleted'), 1500);
    });
  });
}

onMounted(()=> {
  getAllUsers();
});
</script>

<style scoped>

</style>