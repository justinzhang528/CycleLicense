<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton @click="onCancelRegisterModal()">{{$t('cancel')}}</IonButton>
      </IonButtons>
      <IonTitle class="center">{{$t('register')}}</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="center ion-padding">
    <img alt="register" :src="'images/register.png'" style="width: 80%">
    <IonItem>
      <IonInput :label="$t('username')" label-placement="stacked" ref="registerUserNameInput" type="text" maxlength="15" :placeholder="$t('enterUserName')" :clear-input="true">
        <IonIcon :icon="person" aria-hidden="true" slot="start"></IonIcon>
      </IonInput>
    </IonItem>
    <IonItem>
      <IonInput :label="$t('password')" label-placement="stacked" ref="registerPasswordInput" type="password" maxlength="15" :placeholder="$t('enterPassword')" :clear-input="true">
        <IonIcon :icon="lockClosed" aria-hidden="true" slot="start"></IonIcon>
        <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
      </IonInput>
    </IonItem>
    <IonItem>
      <IonInput :label="$t('confirmPassword')" label-placement="stacked" ref="registerConfirmPasswordInput" type="password" maxlength="15" :placeholder="$t('enterPasswordAgain')" :clear-input="true">
        <IonIcon :icon="lockClosed" aria-hidden="true" slot="start"></IonIcon>
        <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
      </IonInput>
    </IonItem>
    <IonItem>
      <IonInput :label="$t('email')" label-placement="stacked" ref="registerEmailInput" type="text" :placeholder="$t('enterEmail')" :clear-input="true">
        <IonIcon :icon="mail" aria-hidden="true" slot="start"></IonIcon>
      </IonInput>
    </IonItem><br>
    <IonButton @click="onConfirmRegisterModal()" shape="round" color="dark">{{ $t('register') }}</IonButton>
  </IonContent>
</template>

<script setup lang="ts">

import {lockClosed, mail, person} from "ionicons/icons";
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
import {isValidEmail, showAlert, showLoading} from "@/hooks/useUtils";
import {loginResponse, registerResponse} from "@/enum/enum";
import {useI18n} from "vue-i18n";
import {ref} from "vue";
import useFirebase from "@/hooks/useFirebase";

const { t } = useI18n();
const {getUser, upSertUser} = useFirebase();
const registerUserNameInput = ref();
const registerPasswordInput = ref();
const registerConfirmPasswordInput = ref();
const registerEmailInput = ref();

const onCancelRegisterModal = ()=>{
  modalController.dismiss(null, 'cancel')
}

const onConfirmRegisterModal = ()=>{
  const registerUsername = registerUserNameInput.value.$el.value;
  const registerPassword = registerPasswordInput.value.$el.value;
  const registerConfirmPassword = registerConfirmPasswordInput.value.$el.value;
  const registerEmail = registerEmailInput.value.$el.value;

  if(registerUsername === ''){
    showAlert(t('warning'), '', t('pleaseInputUsername'), t('ok'));
    return;
  }
  if(registerPassword === ''){
    showAlert(t('warning'), '', t('pleaseInputPassword'), t('ok'));
    return;
  }
  if(registerConfirmPassword === ''){
    showAlert(t('warning'), '', t('pleaseInputConfirmPassword'), t('ok'));
    return;
  }
  if(registerEmail === ''){
    showAlert(t('warning'), '', t('pleaseInputEmail'), t('ok'));
    return;
  }
  if(registerPassword !== registerConfirmPassword){
    showAlert(t('warning'), '', t('passwordNotMatch'), t('ok'));
    return;
  }
  if(!isValidEmail(registerEmail)){
    showAlert(t('warning'), '', t('invalidEmailFormat'), t('ok'));
    return;
  }

  // check if user already exist before insert new user
  getUser(registerUsername).then((res)=>{
    if(res.errorCode === loginResponse.SUCCESS){
      showAlert(t('warning'), '', t('userAlreadyExist'), t('ok'));
    }else{
      // insert new user
      upSertUser(registerUsername,registerPassword,registerEmail).then((res)=>{
        if(res.errorCode === registerResponse.SUCCESS){
          const data = {
            name: registerUsername,
            password: registerPassword,
            email: registerEmail,
            isUnlimited: false,
          }
          localStorage.setItem('userInfo',JSON.stringify(data));
          showLoading(t('pleaseWait'),()=>{
            modalController.dismiss(data, 'confirm');
            showAlert(t('completed'), '', t('registrationSuccess'), t('ok'));
          }, 1000);
        }
      }).catch(()=>{
        showAlert(t('error'), '', t('systemError'), t('ok'));
      })
    }
  }).catch(()=>{
    showAlert(t('error'), '', t('systemError'), t('ok'));
  })
}
</script>

<style scoped>

</style>