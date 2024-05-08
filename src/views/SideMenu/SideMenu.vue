<template>
  <IonMenu side="end" content-id="menu" menu-id="menu">
    <IonHeader>
      <IonToolbar>
      </IonToolbar>
    </IonHeader>
    <IonContent>
      <IonList>
        <IonItem lines="full">
          <IonGrid>
            <IonRow v-if="userInfo.name" class="ion-justify-content-center">
              <IonIcon @click="onClickRefreshUserInfo" :icon="refresh" :class="{ 'rotate': isRotating }"></IonIcon>
            </IonRow>
            <IonRow class="ion-justify-content-center ion-padding">
              <IonAvatar style="width: 75px; height: 75px">
                <img v-if="userInfo.name" alt="avatar" :src="'images/avatar.png'">
                <img v-if="!userInfo.name" alt="avatar" src="https://ionicframework.com/docs/img/demos/avatar.svg">
              </IonAvatar>
            </IonRow>
            <IonRow class="ion-justify-content-center ion-padding-bottom">
              <IonIcon v-if="userInfo.isUnlimited" color="warning" :icon="diamond"></IonIcon>
              <IonLabel v-if="userInfo.name" style="padding: 0 5px 0 5px">{{userInfo.name}}</IonLabel>
              <IonIcon v-if="userInfo.isUnlimited" color="warning" :icon="diamond"></IonIcon>
              <span @click="openLoginModal">
                  <IonButton v-if="!userInfo.name" color="dark" shape="round">{{$t('login')}}</IonButton>
                </span>
            </IonRow>
            <IonRow class="ion-justify-content-center">
                <span v-for="i in life.totalLife" v-if="userInfo.name && !userInfo.isUnlimited">
                  <IonIcon v-if="life.currentLife>=i" :icon="heart" style="font-size: 22px" color="warning"></IonIcon>
                  <IonIcon v-if="life.currentLife<i" :icon="heartOutline" style="font-size: 22px" color="warning"></IonIcon>
                </span>
              <span class="center" v-if="userInfo.isUnlimited">
                  <img :src="'images/icon/unlimitedIcon.png'" alt="unlimited" style="width: 15%"/>
                </span>
            </IonRow>
            <IonRow class="ion-justify-content-center ion-padding-top" v-if="userInfo.name" >
              <IonButton fill="clear" color="dark" shape="round" style="text-decoration: underline" @click="onLogoutClick">
                <IonIcon color="dark" :icon="logOut" style="padding-right: 5px"></IonIcon>
                {{$t('logout')}}
              </IonButton>
            </IonRow>
            <IonRow class="ion-justify-content-center" >
                <span @click="openRegisterModal">
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
            <img alt="language" :src="'images/icon/languageIcon.png'">
          </IonThumbnail>
          <IonLabel>{{ $t('language') }}</IonLabel>
          <IonSelect style="font-weight: bold" aria-label="Language" interface="popover" :value="currentSelectedLanguageValue" @ionChange="onSelectedLanguageChange">
            <IonSelectOption value="en">English</IonSelectOption>
            <IonSelectOption value="mm">မြန်မာ</IonSelectOption>
            <IonSelectOption value="zh_cn">简体中文</IonSelectOption>
            <IonSelectOption value="zh_tw">繁體中文</IonSelectOption>
          </IonSelect>
        </IonItem>
        <IonItem style="padding-top: 10px; padding-bottom: 10px" class="center">
          <IonThumbnail slot="start">
            <img alt="notice" :src="'images/icon/taiwanMyanmarFlagIcon.png'">
          </IonThumbnail>
          <span style="width: 100%;">
              <IonButton :disabled="!userInfo.name" @click="openAboutTaiwanModal" size="default" fill="clear" color="dark" style="text-decoration: underline;">
                {{ $t('aboutTaiwan') }}
              </IonButton>
            </span>
        </IonItem>
        <IonItem class="center">
          <IonThumbnail slot="start">
            <img alt="donate" :src="'images/icon/donateIcon.png'">
          </IonThumbnail>
          <span style="width: 100%; padding-bottom: 10px">
              <IonButton :disabled="!userInfo.name" @click="openDonateModal" size="default" fill="clear" color="dark" style="text-decoration: underline;">
                {{ $t('donate') }}
              </IonButton><br>
              <IonLabel color="medium">({{$t('unlockUnlimitedFeature')}})</IonLabel>
            </span>
        </IonItem>
      </IonList>

    </IonContent>
  </IonMenu>
</template>

<script setup lang="ts">
import {
  IonContent,
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
  IonIcon,
  IonAvatar,
  IonRow,
  IonGrid,
  modalController,
} from '@ionic/vue';
import {onMounted, ref} from "vue";
import {useI18n} from "vue-i18n";
import {diamond, heart, heartOutline, logOut, personAdd, refresh} from "ionicons/icons";
import {showAlertWithAction} from "@/hooks/useUtils";
import useData from "@/hooks/useData";
import scheduleNotification from "@/hooks/useLocalNotification";
import LoginModal from "@/views/Modal/LoginModal.vue";
import RegisterModal from "@/views/Modal/RegisterModal.vue";
import AboutTaiwanModal from "@/views/Modal/AboutTaiwanModal.vue";
import DonateModal from "@/views/Modal/DonateModal.vue";
import useFirebase from "@/hooks/useFirebase";

const {t,locale} = useI18n();
const currentSelectedLanguageValue = ref(localStorage.getItem('currentLanguage') || 'en');
let userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || '{}'));
const {life} = useData();
const isRotating = ref(false);
const {getUser,upSertUser} = useFirebase();

const rotateIcon = () => {
  isRotating.value = true;
  setTimeout(() => {
    isRotating.value = false;
  }, 500);
};

const onClickRefreshUserInfo = () => {
  rotateIcon();
  getUser(userInfo.value.name).then((res) => {
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
    userInfo.value = res.data;
    localStorage.setItem('userInfo', JSON.stringify(res.data));
  });
  life.value.currentLife = Number(localStorage.getItem('currentLife'));
};

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
  scheduleNotification(t('drivingLicense'),t('timeToStudy'));
}

const onLogoutClick = ()=>{
  showAlertWithAction(t('warning'), '', t('areYouSureToLogout'), t('confirm'), t("cancel"), ()=>{
    localStorage.removeItem('userInfo');
    localStorage.setItem('isUnlimited','false');
    userInfo.value = {};
    const nav = document.querySelector('ion-nav');
    nav?.popToRoot();
  });
}

const openLoginModal = async () => {
  const modal = await modalController.create({
    component: LoginModal,
  });

  modal.present();

  const { data, role } = await modal.onWillDismiss();

  if (role === 'confirm') {
    userInfo.value = data;
    localStorage.setItem('isUnlimited', data.isUnlimited ? 'true' : 'false');
  }
};

const openRegisterModal = async () => {
  const modal = await modalController.create({
    component: RegisterModal,
  });

  modal.present();

  const { data, role } = await modal.onWillDismiss();

  if (role === 'confirm') {
    userInfo.value = data;
  }
};

const openAboutTaiwanModal = async () => {
  const modal = await modalController.create({
    component: AboutTaiwanModal,
  });

  modal.present();
};

const openDonateModal = async () => {
  const modal = await modalController.create({
    component: DonateModal,
  });

  modal.present();
};

onMounted(()=> {
  setInterval(()=>{
    if(localStorage.getItem('currentLife')){
      life.value.currentLife = Number(localStorage.getItem('currentLife'));
    }
  }, 3000);
});
</script>

<style>
ion-thumbnail {
  --size: 40px;
}

.rotate {
  animation: rotateAnimation 0.5s infinite linear;
}

@keyframes rotateAnimation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>