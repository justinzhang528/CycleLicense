<template>
  <ion-app>
    <ion-router-outlet/>
    <ion-nav :root="homePage"></ion-nav>
    <IonMenu side="end" content-id="menu">
      <IonHeader>
        <IonToolbar>
          <IonItem>
            <IonIcon :icon="settings"></IonIcon>
            <IonTitle>{{ $t('settings') }}</IonTitle>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList>
          <IonItem lines="none">
            <IonGrid>
              <IonRow class="ion-justify-content-center ion-padding" >
                <IonAvatar style="width: 75px; height: 75px">
                  <IonImg src="https://ionicframework.com/docs/img/demos/avatar.svg"></IonImg>
                </IonAvatar>
              </IonRow>
              <IonRow class="ion-justify-content-center ion-padding">
                <IonButton v-if="!userInfo.name" color="dark" shape="round" @click="onLoginClick">{{$t('login')}}</IonButton>
                <IonLabel v-if="userInfo.name">{{userInfo.name}}</IonLabel>
              </IonRow>
              <IonRow class="ion-justify-content-center ion-padding" v-if="userInfo.name" >
                <IonButton fill="clear" color="dark" shape="round" style="text-decoration: underline" @click="onLogoutClick">
                  <IonIcon color="dark" :icon="logOutOutline" style="padding-right: 5px"></IonIcon>
                  {{$t('logout')}}
                </IonButton>
              </IonRow>
              <IonRow class="ion-justify-content-center ion-padding-bottom" v-if="!userInfo.name" >
                <IonButton fill="clear" color="dark" shape="round" style="text-decoration: underline">
                  <IonIcon color="dark" :icon="personAddOutline" style="padding-right: 5px"></IonIcon>
                  {{$t('register')}}
                </IonButton>
              </IonRow>
            </IonGrid>
          </IonItem>
          <IonItem style="padding-top: 10px; padding-bottom: 10px">
            <IonThumbnail slot="start">
              <IonImg src="images/lang.png" alt="avatar"></IonImg>
            </IonThumbnail>
            <IonLabel>{{ $t('language') }}</IonLabel>
            <IonSelect :disabled="!userInfo.name" style="font-weight: bold" aria-label="Language" interface="popover" :value="currentSelectedLanguageValue" @ionChange="onSelectedLanguageChange">
              <IonSelectOption value="en">English</IonSelectOption>
              <IonSelectOption value="mm">မြန်မာ</IonSelectOption>
              <IonSelectOption value="zh_cn">简体中文</IonSelectOption>
              <IonSelectOption value="zh_tw">繁體中文</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem style="padding-top: 10px; padding-bottom: 10px">
            <IonThumbnail slot="start">
              <IonImg src="images/testing.png" alt="avatar"></IonImg>
            </IonThumbnail>
            <IonLabel>{{ $t('mockTest') }}</IonLabel>
            <IonButton :disabled="!userInfo.name" size="default" style="width: 40%; padding-right: 10px; font-size: x-small" shape="round" color="dark" id="openMockTestSetting">{{$t('settings')}}</IonButton>
          </IonItem>
          <IonItem style="padding-top: 10px; padding-bottom: 10px">
            <IonThumbnail slot="start">
              <IonImg src="images/noAds.png" alt="avatar"></IonImg>
            </IonThumbnail>
            <IonLabel>{{ $t('adsFree') }}</IonLabel>
            <IonToggle :disabled="!userInfo.isUnlimited" style="padding-left: 60px" :onIonChange="onToggleChanged" :checked="adsFreeToggleCheckedDefaultValue" color="dark"></IonToggle>
          </IonItem>
        </IonList>

        <IonModal ref="modal" trigger="openMockTestSetting">
          <IonHeader>
            <IonToolbar>
              <IonButtons slot="start">
                <IonButton @click="onCancelModal()">{{$t('cancel')}}</IonButton>
              </IonButtons>
              <IonTitle>{{$t('settings')}}</IonTitle>
              <IonButtons slot="end">
                <IonButton :strong="true" @click="onConfirmModal()">{{$t('confirm')}}</IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonContent class="center ion-padding">
            <h5 style="padding-bottom: 15px">{{$t('setTheNumberOfQuestions')}}</h5>
            <IonItem>
              <IonLabel>{{$t('multipleChoiceSign')}}<br><p>({{$t('rangeMustBe')}} {{'1 ~ '+dataSource.signs.length}})</p></IonLabel>
              <IonInput style="width: 25%" ref="multipleChoiceSignInput" type="number" :value="multipleChoiceSignDefaultCount" maxlength="2" :placeholder="'1 ~ '+dataSource.signs.length"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>{{$t('multipleChoiceRule')}}<br><p>({{$t('rangeMustBe')}} {{'1 ~ '+dataSource.rules.length}})</p></IonLabel>
              <IonInput style="width: 25%" ref="multipleChoiceRuleInput" type="number" :value="multipleChoiceRuleDefaultCount" :placeholder="'1 ~ '+dataSource.rules.length"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>{{$t('trueFalseSign')}}<br><p>({{$t('rangeMustBe')}} {{'1 ~ '+dataSource.signs.length}})</p></IonLabel>
              <IonInput style="width: 25%" ref="trueFalseSignInput" type="number" :value="trueFalseSignDefaultCount" :placeholder="'1 ~ '+dataSource.signs.length"></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>{{$t('trueFalseRule')}}<br><p>({{$t('rangeMustBe')}} {{'1 ~ '+dataSource.rules.length}})</p></IonLabel>
              <IonInput style="width: 25%" ref="trueFalseRuleInput" type="number" :value="trueFalseRuleDefaultCount" :placeholder="'1 ~ '+dataSource.rules.length"></IonInput>
            </IonItem>
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
  IonImg,
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
  alertController,
} from '@ionic/vue';
import HomePage from "@/views/HomePage.vue";
import {markRaw, onMounted, reactive, ref} from "vue";
import {useI18n} from "vue-i18n";
import {logOut, logOutOutline, personAdd, personAddOutline, settings} from "ionicons/icons";
import dataSource from "@/json/dataSource.json"
import useData from '@/hooks/useData'
import useAdmob from "@/hooks/useAdmob";
import useInternetConnection from "@/hooks/useInternetConnection";
import useFirebase from "@/hooks/useFirebase";

const {isOnline} = useInternetConnection();
const {t,locale} = useI18n();
const {DEFAULT_PROBLEM_COUNT, isInteger} = useData();
const currentSelectedLanguageValue = ref(localStorage.getItem('currentLanguage') || 'en');
const adsFreeToggleCheckedDefaultValue = ref(localStorage.getItem('isAdsFree') === 'true' || false);
const homePage = markRaw(HomePage)
const modal = ref();
const multipleChoiceSignInput = ref();
const multipleChoiceRuleInput = ref();
const trueFalseSignInput = ref();
const trueFalseRuleInput = ref();
const multipleChoiceSignDefaultCount = ref(Number(localStorage.getItem('multipleChoiceSignCount')) || DEFAULT_PROBLEM_COUNT);
const multipleChoiceRuleDefaultCount = ref(Number(localStorage.getItem('multipleChoiceRuleCount')) || DEFAULT_PROBLEM_COUNT);
const trueFalseSignDefaultCount = ref(Number(localStorage.getItem('trueFalseSignCount')) || DEFAULT_PROBLEM_COUNT);
const trueFalseRuleDefaultCount = ref(Number(localStorage.getItem('trueFalseRuleCount')) || DEFAULT_PROBLEM_COUNT);
let userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || '{}'));
const {getUser} = useFirebase();

const onCancelModal = () => modal.value.$el.dismiss(null, 'cancel');

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
  localStorage.setItem('isAdsFree',String(event.detail.checked));
}

const onConfirmModal = () => {
  let isValidCount: number = 0;

  const multipleChoiceSignCount = multipleChoiceSignInput.value.$el.value;
  const multipleChoiceRuleCount = multipleChoiceRuleInput.value.$el.value;
  const trueFalseSignCount = trueFalseSignInput.value.$el.value;
  const trueFalseRuleCount = trueFalseRuleInput.value.$el.value;

    if(isInteger(multipleChoiceSignCount) && multipleChoiceSignCount >= 1 && multipleChoiceSignCount <= dataSource.signs.length)
      isValidCount++;
    if(isInteger(multipleChoiceRuleCount) && multipleChoiceRuleCount >= 1 && multipleChoiceRuleCount <= dataSource.rules.length)
      isValidCount++;
    if(isInteger(trueFalseSignCount) && trueFalseSignCount <= dataSource.signs.length)
      isValidCount++;
    if(isInteger(trueFalseRuleCount) && trueFalseRuleCount >= 1 && trueFalseRuleCount <= dataSource.rules.length)
      isValidCount++;

  if(isValidCount === 4){
    localStorage.setItem('multipleChoiceSignCount', multipleChoiceSignCount.toString());
    localStorage.setItem('multipleChoiceRuleCount', multipleChoiceRuleCount.toString());
    localStorage.setItem('trueFalseSignCount', trueFalseSignCount.toString());
    localStorage.setItem('trueFalseRuleCount', trueFalseRuleCount.toString());
    multipleChoiceSignDefaultCount.value = multipleChoiceSignCount;
    multipleChoiceRuleDefaultCount.value = multipleChoiceRuleCount;
    trueFalseSignDefaultCount.value = trueFalseSignCount;
    trueFalseRuleDefaultCount.value = trueFalseRuleCount;
    modal.value.$el.dismiss(null, 'confirm');
  }else{
    showAlert(t('invalidInput'), '', t('pleaseCheckYourInput'), t('ok'));
  }
};

const showAlert = async (header: string, subHeader: string, message: string, buttonText: string) => {
  const alert = await alertController.create({
    header: header,
    subHeader: subHeader,
    message: message,
    buttons: [
      {
        text: buttonText,
        role: 'confirm',
      }
    ],
    backdropDismiss: false,
  });
  await alert.present();
}

const checkInternetConnection = ()=> {
  if(!isOnline.value){
    showAlert(t('noInternet'),t('pleaseCheckYourInternetConnection'),'',t('ok'));
  }
}

const onLoginClick = ()=>{
  getUser('justin').then((res)=>{
    localStorage.setItem('userInfo',JSON.stringify(res.data));
    userInfo.value = res.data;
  }).catch(()=>{
    console.error('error');
  })
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