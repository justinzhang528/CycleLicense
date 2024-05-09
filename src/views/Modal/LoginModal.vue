<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton @click="onCancelLoginModal()">{{ $t('cancel') }}</IonButton>
      </IonButtons>
      <IonTitle class="center">{{ $t('login') }}</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="center ion-padding">
    <img alt="login" :src="'images/login.png'" style="width: 80%">
    <IonItem>
      <IonInput :label="$t('username')" label-placement="stacked" ref="loginUserNameInput" type="text" maxlength="15"
                :placeholder="$t('enterUserName')" :clear-input="true">
        <IonIcon :icon="person" aria-hidden="true" slot="start"></IonIcon>
      </IonInput>
    </IonItem>
    <IonItem>
      <IonInput :label="$t('password')" label-placement="stacked" ref="loginPasswordInput" type="password"
                maxlength="15" :placeholder="$t('enterPassword')" :clear-input="true">
        <IonIcon :icon="lockClosed" aria-hidden="true" slot="start"></IonIcon>
        <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
      </IonInput>
    </IonItem>
    <br>
    <IonButton @click="onConfirmLoginModal()" shape="round" color="dark">{{ $t('login') }}</IonButton>
  </IonContent>
</template>

<script setup lang="ts">

import {lockClosed, person} from "ionicons/icons";
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonInputPasswordToggle,
  IonItem,
  IonTitle,
  IonToolbar,
  modalController,
} from "@ionic/vue";
import {showAlert, showLoading} from "@/hooks/useUtils";
import {dataResponse} from "@/enum/enum";
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import useFirebase from "@/hooks/useFirebase";
import useData from "@/hooks/useData";

const {getUser,upSertUser} = useFirebase();

const {t} = useI18n();
const loginUserNameInput = ref();
const loginPasswordInput = ref();

const onCancelLoginModal = () => {
  modalController.dismiss(null, 'cancel')
}

const onConfirmLoginModal = () => {
  const loginUsername = loginUserNameInput.value.$el.value;
  const loginPassword = loginPasswordInput.value.$el.value;

  if (loginUsername === '') {
    showAlert(t('warning'), '', t('pleaseInputUsername'), t('ok'));
    return;
  }
  if (loginPassword === '') {
    showAlert(t('warning'), '', t('pleaseInputPassword'), t('ok'));
    return;
  }

  getUser(loginUsername).then((res) => {
    if (res.errorCode === dataResponse.SUCCESS) {
      if (res.data.password.toString() !== loginPassword.toString()) {
        showAlert(t('warning'), '', t('passwordIncorrect'), t('ok'));
        return;
      }
      if(res.data.isUnlimited){
        if(res.data.unlimitedExpiredDate === 0){
          res.data.unlimitedExpiredDate = new Date().getTime() + useData().DEFAULT_UNLIMITED_VALID_TIME;
          upSertUser(res.data.name, res.data.password, res.data.email, res.data.isUnlimited, res.data.unlimitedExpiredDate);
        }
        else if(res.data.unlimitedExpiredDate < new Date().getTime()){
          res.data.isUnlimited = false;
          res.data.unlimitedExpiredDate = 0;
          upSertUser(res.data.name, res.data.password, res.data.email, res.data.isUnlimited, res.data.unlimitedExpiredDate);
        }
      }
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      showLoading(t('pleaseWait'),()=>{
        modalController.dismiss(res.data, 'confirm');
      }, 750);
    } else {
      showAlert(t('warning'), '', t('userNotFound'), t('ok'));
      return;
    }
  }).catch(() => {
    showAlert(t('error'), '', t('systemError'), t('ok'));
  })
};
</script>

<style scoped>

</style>