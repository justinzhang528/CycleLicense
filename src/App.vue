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
      <IonContent>
        <IonList>
          <IonItem style="padding-top: 20px; padding-bottom: 20px">
            <IonThumbnail slot="start">
              <IonImg src="images/lang.png" alt="avatar"></IonImg>
            </IonThumbnail>
            <IonLabel>{{ $t('language') }}</IonLabel>
            <IonSelect style="font-weight: bold" aria-label="Language" interface="popover" :value="currentSelectedLanguageValue" @ionChange="onSelectedLanguageChange">
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
                    <ion-button @click="onCancelModal()">{{$t('cancel')}}</ion-button>
                  </IonButtons>
                  <IonTitle>{{$t('mockTest')}} {{$t('settings')}}</IonTitle>
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
import dataSource from "@/json/dataSource.json"
import useData from '@/hooks/useData'

const {locale} = useI18n();
const {DEFAULT_PROBLEM_COUNT} = useData();

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

const modal = ref();
const multipleChoiceSignInput = ref();
const multipleChoiceRuleInput = ref();
const trueFalseSignInput = ref();
const trueFalseRuleInput = ref();
const multipleChoiceSignDefaultCount = ref(Number(localStorage.getItem('multipleChoiceSignCount')) || DEFAULT_PROBLEM_COUNT);
const multipleChoiceRuleDefaultCount = ref(Number(localStorage.getItem('multipleChoiceRuleCount')) || DEFAULT_PROBLEM_COUNT);
const trueFalseSignDefaultCount = ref(Number(localStorage.getItem('trueFalseSignCount')) || DEFAULT_PROBLEM_COUNT);
const trueFalseRuleDefaultCount = ref(Number(localStorage.getItem('trueFalseRuleCount')) || DEFAULT_PROBLEM_COUNT);
const onCancelModal = () => modal.value.$el.dismiss(null, 'cancel');

const onConfirmModal = () => {
  let isValidCount: number = 0;

  const multipleChoiceSignCount = multipleChoiceSignInput.value.$el.value;
  const multipleChoiceRuleCount = multipleChoiceRuleInput.value.$el.value;
  const trueFalseSignCount = trueFalseSignInput.value.$el.value;
  const trueFalseRuleCount = trueFalseRuleInput.value.$el.value;

    if(multipleChoiceSignCount != null && multipleChoiceSignCount != '' && multipleChoiceSignCount >= 1 && multipleChoiceSignCount <= dataSource.signs.length)
      isValidCount++;
    if(multipleChoiceRuleCount != null && multipleChoiceRuleCount != '' && multipleChoiceRuleCount >= 1 && multipleChoiceRuleCount <= dataSource.rules.length)
      isValidCount++;
    if(trueFalseSignCount != null && trueFalseSignCount != '' && trueFalseSignCount >= 1 && trueFalseSignCount <= dataSource.signs.length)
      isValidCount++;
    if(trueFalseRuleCount != null && trueFalseRuleCount != '' && trueFalseRuleCount >= 1 && trueFalseRuleCount <= dataSource.rules.length)
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
  }
};
</script>

<style>
  ion-thumbnail {
    --size: 40px;
  }
</style>