<template>
  <ion-app>
    <ion-router-outlet/>
    <ion-nav :root="homePage"></ion-nav>
    <IonMenu content-id="menu">
      <IonHeader>
        <IonToolbar>
          <IonItem>
            <IonIcon :icon="settings"></IonIcon>
            <IonTitle>{{ $t('settings') }}</IonTitle>
          </IonItem>
        </IonToolbar>
      </IonHeader>
      <IonContent class="ion-padding">
        <IonList>
          <IonItem>
            <IonThumbnail slot="start">
              <IonImg src="images/lang.png" alt="avatar"></IonImg>
            </IonThumbnail>
            <IonLabel>{{ $t('language') }}</IonLabel>
            <IonSelect aria-label="Language" interface="popover" :value="currentSelectedLanguageValue" @ionChange="onSelectedLanguageChange" style="padding-left: 25px">
              <IonSelectOption value="en">English</IonSelectOption>
              <IonSelectOption value="mm">မြန်မာ</IonSelectOption>
              <IonSelectOption value="zh_cn">简体中文</IonSelectOption>
              <IonSelectOption value="zh_tw">繁體中文</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonThumbnail slot="start">
              <IonImg src="images/testing.png" alt="avatar"></IonImg>
            </IonThumbnail>
            <IonLabel>{{ $t('mockTest') }}</IonLabel>
            <IonButton style="width: 40%;" shape="round" color="dark" id="openMockTestSetting">{{$t('settings')}}</IonButton>

            <IonModal ref="modal" trigger="openMockTestSetting">
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <ion-button @click="onCancelModal()">Cancel</ion-button>
                  </IonButtons>
                  <IonTitle>{{$t('mockTest')}} {{$t('settings')}}</IonTitle>
                  <IonButtons slot="end">
                    <IonButton :strong="true" @click="onConfirmModal()">Confirm</IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <IonContent class="center ion-padding">
                <h5>{{$t('setTheNumberOfQuestions')}}</h5>
                <IonItem>
                  <IonLabel>{{$t('multipleChoiceSign')}}</IonLabel>
                  <IonInput style="width: 25%" ref="multipleChoiceSignInput" type="number" placeholder="1 ~ 100"></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel>{{$t('multipleChoiceRule')}}</IonLabel>
                  <IonInput style="width: 25%" ref="multipleChoiceRuleInput" type="number" placeholder="1 ~ 100"></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel>{{$t('trueFalseSign')}}</IonLabel>
                  <IonInput style="width: 25%" ref="trueFalseSignInput" type="number" placeholder="1 ~ 100"></IonInput>
                </IonItem>
                <IonItem>
                  <IonLabel>{{$t('trueFalseRule')}}</IonLabel>
                  <IonInput style="width: 25%" ref="trueFalseRuleInput" type="number" placeholder="1 ~ 100"></IonInput>
                </IonItem>
              </IonContent>
            </IonModal>

          </IonItem>
        </IonList>
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
  IonIcon
} from '@ionic/vue';
import HomePage from "@/views/HomePage.vue";
import {markRaw, ref} from "vue";
import {useI18n} from "vue-i18n";
import {settings} from "ionicons/icons";


const {locale} = useI18n();

const currentSelectedLanguageValue = ref(localStorage.getItem('currentLanguage') || 'en');
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

const homePage = markRaw(HomePage)
locale.value = localStorage.getItem("currentLanguage") || 'en';

const message = ref('This modal example uses triggers to automatically open a modal when the button is clicked.');

const modal = ref();
const multipleChoiceSignInput = ref();
const multipleChoiceRuleInput = ref();
const trueFalseSignInput = ref();
const trueFalseRuleInput = ref();
const ageInput = ref();
const onCancelModal = () => modal.value.$el.dismiss(null, 'cancel');

const onConfirmModal = () => {
  const multipleChoiceSignCount = multipleChoiceSignInput.value.$el.value || '';
  const multipleChoiceRuleCount = multipleChoiceRuleInput.value.$el.value || '';
  const trueFalseSignCount = trueFalseSignInput.value.$el.value || '';
  const trueFalseRuleCount = trueFalseRuleInput.value.$el.value || '';

  if(multipleChoiceSignCount != '')
    localStorage.setItem('multipleChoiceSignCount', multipleChoiceSignCount);
  if(multipleChoiceRuleCount != '')
    localStorage.setItem('multipleChoiceRuleCount', multipleChoiceRuleCount);
  if(trueFalseSignCount != '')
    localStorage.setItem('trueFalseSignCount', trueFalseSignCount);
  if(trueFalseRuleCount != '')
    localStorage.setItem('trueFalseRuleCount', trueFalseRuleCount);

  modal.value.$el.dismiss(null, 'confirm');
};
</script>

<style>
  ion-thumbnail {
    --size: 40px;
  }
</style>