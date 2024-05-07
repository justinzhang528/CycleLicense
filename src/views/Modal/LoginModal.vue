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
import {showAlert} from "@/hooks/useUtils";
import {loginResponse} from "@/enum/enum";
import {ref} from "vue";
import {useI18n} from "vue-i18n";
import useFirebase from "@/hooks/useFirebase";

const {getUser} = useFirebase();
let userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || '{}'));

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
    if (res.errorCode === loginResponse.SUCCESS) {
      if (res.data.password.toString() !== loginPassword.toString()) {
        showAlert(t('warning'), '', t('passwordIncorrect'), t('ok'));
        return;
      }
      localStorage.setItem('userInfo', JSON.stringify(res.data));
      userInfo.value = res.data;
      modalController.dismiss(userInfo.value, 'confirm');
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