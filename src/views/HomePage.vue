<template>
  <IonPage>
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonTitle class="center">{{t('drivingLicense')}}</IonTitle>
        <IonSelect aria-label="Language" interface="popover" placeholder="English" slot="end" value="en" @ionChange="onSelectedChange" style="padding-right: 5px">
          <IonSelectOption value="en">English</IonSelectOption>
          <IonSelectOption value="mm">မြန်မာ</IonSelectOption>
          <IonSelectOption value="zh_cn">简体中文</IonSelectOption>
          <IonSelectOption value="zh_tw">繁體中文</IonSelectOption>
        </IonSelect>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <IonImg src="images/main.png" style="width: 75%; display: block; margin: 10px auto;"></IonImg>
      <IonList lines="inset">
        <IonItem style="display: flex">
          <IonCard style="width: 75%; box-shadow: none">
            <IonCardHeader>
              <IonCardTitle>{{t('study')}}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{{t('studyDescription')}}</IonCardContent>
          </IonCard>
          <IonNavLink router-direction="forward" :component="studyPage">
            <IonButton shape="round" size="default" color="dark">{{t('enter')}}</IonButton>
          </IonNavLink>
        </IonItem>
        <IonItem>
          <IonCard style="width: 75%; box-shadow: none">
            <IonCardHeader>
              <IonCardTitle>{{t('mockTest')}}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{{t('mockTestDescription')}}</IonCardContent>
          </IonCard>
          <IonNavLink router-direction="forward" :component="mockTestPage">
            <IonButton shape="round" size="default" color="dark">{{t('enter')}}</IonButton>
          </IonNavLink>
        </IonItem>
      </IonList>
    </IonContent>
  </IonPage>
</template>

<script setup lang="ts">
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonImg,
  IonItem,
  IonList,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonNavLink,
  IonSelect,
  IonSelectOption,
} from '@ionic/vue';
import StudyPage from "@/views/StudyPage.vue";
import {markRaw, ref} from "vue";
import MockTestPage from "@/views/MockTestPage.vue";
import {useI18n} from "vue-i18n";
import "/node_modules/flag-icons/css/flag-icons.min.css";

const {t, locale} = useI18n();
const studyPage = markRaw(StudyPage)
const mockTestPage = markRaw(MockTestPage)
const currentSelectedValue = ref('en');
const onSelectedChange = (e: CustomEvent)=>{
  currentSelectedValue.value = e.detail.value;
  if(currentSelectedValue.value == 'en')
    locale.value = 'en'
  else if(currentSelectedValue.value == 'mm')
    locale.value = 'mm';
  else if(currentSelectedValue.value == 'zh_cn')
    locale.value = 'zh_cn';
  else if(currentSelectedValue.value == 'zh_tw')
    locale.value = 'zh_tw';
}
</script>

<style scoped>

</style>
