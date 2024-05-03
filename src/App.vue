<template>
  <ion-app>
    <ion-router-outlet/>
    <ion-nav :root="homePage"></ion-nav>
    <IonMenu side="end" content-id="menu">
      <IonHeader>
        <IonToolbar>
          <IonItem class="center">
            <IonTitle>{{ $t('menu') }}</IonTitle>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem lines="none">
            <IonGrid>
              <IonRow class="ion-justify-content-center ion-padding">
                <span v-for="i in life.totalLife">
                  <IonIcon v-if="life.currentLife>=i" :icon="heart" style="font-size: 22px" color="warning"></IonIcon>
                  <IonIcon v-if="life.currentLife<i" :icon="heartOutline" style="font-size: 22px"></IonIcon>
                </span>
              </IonRow>
              <IonRow class="ion-justify-content-center ion-padding">
                <IonAvatar style="width: 75px; height: 75px">
                  <img v-if="userInfo.name" alt="avatar" :src="'images/avatar.png'">
                  <img v-if="!userInfo.name" alt="avatar" src="https://ionicframework.com/docs/img/demos/avatar.svg">
                </IonAvatar>
              </IonRow>
              <IonRow class="ion-justify-content-center ion-padding">
                <IonIcon v-if="userInfo.isUnlimited" color="warning" :icon="diamond"></IonIcon>
                <IonLabel v-if="userInfo.name" style="padding: 0 5px 0 5px">{{userInfo.name}}</IonLabel>
                <IonIcon v-if="userInfo.isUnlimited" color="warning" :icon="diamond"></IonIcon>
                <span id="openLoginModal">
                  <IonButton v-if="!userInfo.name" color="dark" shape="round">{{$t('login')}}</IonButton>
                </span>
              </IonRow>
              <IonRow class="ion-justify-content-center ion-padding" v-if="userInfo.name" >
                <IonButton fill="clear" color="dark" shape="round" style="text-decoration: underline" @click="onLogoutClick">
                  <IonIcon color="dark" :icon="logOut" style="padding-right: 5px"></IonIcon>
                  {{$t('logout')}}
                </IonButton>
              </IonRow>
              <IonRow class="ion-justify-content-center ion-padding-bottom" >
                <span id="openRegisterModal">
                  <IonButton v-if="!userInfo.name" fill="clear" color="dark" shape="round" style="text-decoration: underline">
                    <IonIcon color="dark" :icon="personAdd" style="padding-right: 5px"></IonIcon>
                    {{$t('register')}}
                  </IonButton>
                </span>
              </IonRow>
            </IonGrid>
          </IonItem>
          <IonItem style="padding-top: 10px; padding-bottom: 10px">
            <IonThumbnail slot="start">
              <img alt="language" :src="'images/languageIcon.png'">
            </IonThumbnail>
            <IonLabel>{{ $t('language') }}</IonLabel>
            <IonSelect style="font-weight: bold" aria-label="Language" interface="popover" :value="currentSelectedLanguageValue" @ionChange="onSelectedLanguageChange">
              <IonSelectOption value="en">English</IonSelectOption>
              <IonSelectOption value="mm">မြန်မာ</IonSelectOption>
              <IonSelectOption value="zh_cn">简体中文</IonSelectOption>
              <IonSelectOption value="zh_tw">繁體中文</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem style="padding-top: 10px; padding-bottom: 10px">
            <IonThumbnail slot="start">
              <img alt="noAds" :src="'images/noAdsIcon.png'">
            </IonThumbnail>
            <IonLabel>{{ $t('adsFree') }}</IonLabel>
            <IonToggle :disabled="!userInfo.isUnlimited" style="padding-left: 60px" :onIonChange="onToggleChanged" :checked="adsFreeToggleCheckedDefaultValue" color="dark"></IonToggle>
          </IonItem>
        </IonList>

        <IonModal ref="loginModal" trigger="openLoginModal">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton @click="onCancelLoginModal()">{{$t('cancel')}}</IonButton>
              </IonButtons>
              <IonTitle class="center">{{$t('login')}}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent class="center ion-padding">
            <img alt="login" :src="'images/login.png'">
            <IonItem>
              <IonInput :label="$t('username')" label-placement="stacked" ref="loginUserNameInput" type="text" maxlength="15" :placeholder="$t('enterUserName')" :clear-input="true">
                <IonIcon :icon="person" aria-hidden="true" slot="start"></IonIcon>
              </IonInput>
            </IonItem>
            <IonItem>
              <IonInput :label="$t('password')" label-placement="stacked" ref="loginPasswordInput" type="password" maxlength="15" :placeholder="$t('enterPassword')" :clear-input="true">
                <IonIcon :icon="lockClosed" aria-hidden="true" slot="start"></IonIcon>
                <IonInputPasswordToggle slot="end"></IonInputPasswordToggle>
              </IonInput>
            </IonItem><br>
            <IonButton @click="onConfirmLoginModal()" shape="round" color="dark">{{ $t('login') }}</IonButton>
          </IonContent>
        </IonModal>

        <IonModal ref="registerModal" trigger="openRegisterModal">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton @click="onCancelRegisterModal()">{{$t('cancel')}}</IonButton>
              </IonButtons>
              <IonTitle class="center">{{$t('register')}}</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent class="center ion-padding">
            <img alt="register" :src="'images/register.png'">
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
        </IonModal>

      </IonContent>
    </IonMenu>
  </ion-app>
</template>

<script setup lang="ts">
import {
  IonApp,
  IonRouterOutlet,
  IonNav,
  IonContent,
  IonTitle,
  IonMenu,
  IonHeader,
  IonToolbar,
  IonSelectOption,
  IonSelect,
  IonLabel,
  IonList,
  IonItem,
  IonThumbnail,
  IonButton,
  IonButtons,
  IonInput,
  IonModal,
  IonIcon,
  IonToggle,
  IonAvatar,
  IonRow,
  IonGrid,
  IonInputPasswordToggle,
} from '@ionic/vue';
import HomePage from "@/views/HomePage.vue";
import {markRaw, onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {diamond, heart, heartOutline, lockClosed, logOut, mail, person, personAdd} from "ionicons/icons";
import useAdmob from "@/hooks/useAdmob";
import useInternetConnection from "@/hooks/useInternetConnection";
import useFirebase from "@/hooks/useFirebase";
import {loginResponse,registerResponse} from "@/enum/enum";
import {isValidEmail, showAlert} from "@/hooks/useUtils";
import useData from "@/hooks/useData";

const {isOnline} = useInternetConnection();
const {t,locale} = useI18n();
const currentSelectedLanguageValue = ref(localStorage.getItem('currentLanguage') || 'en');
const adsFreeToggleCheckedDefaultValue = ref(localStorage.getItem('isRemoveAds') === 'true' || false);
const homePage = markRaw(HomePage)
const loginModal = ref();
const registerModal = ref();
const loginUserNameInput = ref();
const loginPasswordInput = ref();
const registerUserNameInput = ref();
const registerPasswordInput = ref();
const registerConfirmPasswordInput = ref();
const registerEmailInput = ref();
let userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || '{}'));
const {getUser,upSertUser} = useFirebase();
const {life} = useData();

const onSelectedLanguageChange = (e: CustomEvent)=>{
  currentSelectedLanguageValue.value = e.detail.value;
  if(currentSelectedLanguageValue.value == 'en')
    locale.value = 'en'
  else if(currentSelectedLanguageValue.value == 'mm')
    locale.value = 'mm';
  else if(currentSelectedLanguageValue.value == 'zh_cn')
    locale.value = 'zh_cn';
  else if(currentSelectedLanguageValue.value == 'zh_tw')
    locale.value = 'zh_tw';
  localStorage.setItem('currentLanguage',currentSelectedLanguageValue.value);
}

const onToggleChanged=(event: CustomEvent)=>{
  if(event.detail.checked){
    useAdmob().hideBanner();
  }else{
    useAdmob().resumeBanner();
  }
  localStorage.setItem('isRemoveAds',String(event.detail.checked));
}
const onCancelLoginModal = () => loginModal.value.$el.dismiss(null, 'cancel');

const onConfirmLoginModal = () => {
  const loginUsername = loginUserNameInput.value.$el.value;
  const loginPassword = loginPasswordInput.value.$el.value;

  if(loginUsername === ''){
    showAlert(t('warning'), '', t('pleaseInputUsername'), t('ok'));
    return;
  }
  if(loginPassword === ''){
    showAlert(t('warning'), '', t('pleaseInputPassword'), t('ok'));
    return;
  }

  getUser(loginUsername).then((res)=>{
    if(res.errorCode === loginResponse.SUCCESS){
      if(res.data.password.toString() !== loginPassword.toString()){
        showAlert(t('warning'), '', t('passwordIncorrect'), t('ok'));
        return;
      }
      localStorage.setItem('userInfo',JSON.stringify(res.data));
      userInfo.value = res.data;
      loginModal.value.$el.dismiss(null, 'confirm');
    }else{
      showAlert(t('warning'), '', t('userNotFound'), t('ok'));
      return;
    }
  }).catch(()=>{
    showAlert(t('error'), '', t('systemError'), t('ok'));
  })
};

const onCancelRegisterModal = () => registerModal.value.$el.dismiss(null, 'cancel');

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
          userInfo.value = data;
          registerModal.value.$el.dismiss(null, 'confirm');
          showAlert(t('completed'), '', t('registrationSuccess'), t('ok'));
          return;
        }
      }).catch(()=>{
        showAlert(t('error'), '', t('systemError'), t('ok'));
      })
    }
  }).catch(()=>{
    showAlert(t('error'), '', t('systemError'), t('ok'));
  })
}
const checkInternetConnection = ()=> {
  if(!isOnline.value){
    showAlert(t('noInternet'),t('pleaseCheckYourInternetConnection'),'',t('ok'));
  }
}

const onLogoutClick = ()=>{
  localStorage.removeItem('userInfo');
  userInfo.value = {};
}

onMounted(()=> {
  locale.value = localStorage.getItem("currentLanguage") || 'en';
  setInterval(checkInternetConnection, 5000);
});
</script>

<style>
  ion-thumbnail {
    --size: 40px;
  }
</style>