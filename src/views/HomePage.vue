<template>
  <IonPage id="menu">
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonButtons slot="end">
          <IonMenuButton></IonMenuButton>
        </IonButtons>
        <IonTitle class="center">{{$t('drivingLicense')}}</IonTitle>
      </IonToolbar>
    </IonHeader>
    <IonContent :fullscreen="true">
      <img :src="'images/main.png'" alt="main" style="width: 75%; display: block; margin: 10px auto;">
      <IonList lines="inset">
        <IonItem style="display: flex">
          <IonCard style="width: 65%; box-shadow: none">
            <IonCardHeader>
              <IonCardTitle style="font-size: x-large">{{$t('study')}}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{{$t('studyDescription')}}</IonCardContent>
          </IonCard>
          <IonButton @click="checkLoginStatus(studyPage)" shape="round" size="default" style="font-size: small" color="dark">{{$t('enter')}}</IonButton>
        </IonItem>
        <IonItem>
          <IonCard style="width: 65%; box-shadow: none">
            <IonCardHeader>
              <IonCardTitle style="font-size: x-large">{{$t('mockTest')}}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{{$t('mockTestDescription')}}</IonCardContent>
          </IonCard>
          <IonButton @click="checkLoginStatus(mockTestPage)" shape="round" size="default" style="font-size: small;" color="dark">{{$t('enter')}}</IonButton>
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
  IonItem,
  IonList,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonMenuButton,
  IonButtons,
  menuController,
} from '@ionic/vue';
import StudyPage from "@/views/StudyPage.vue";
import {markRaw} from "vue";
import MockTestPage from "@/views/MockTestPage.vue";
import {showToast} from "@/hooks/useUtils";
import {useI18n} from "vue-i18n";

const studyPage = markRaw(StudyPage)
const mockTestPage = markRaw(MockTestPage)
const { t } = useI18n();

const checkLoginStatus = (page: any) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
  if (!userInfo.name) {
    showToast(t('pleaseLoginFirst'),1500);
    menuController.open('menu');
  }else {
    const nav = document.querySelector('ion-nav');
    nav?.push(page);
  }
}
</script>

<style scoped>

</style>
