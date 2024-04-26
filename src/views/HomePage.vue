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
      <IonImg src="images/main.png" style="width: 75%; display: block; margin: 10px auto;"></IonImg>
      <IonList lines="inset">
        <IonItem style="display: flex">
          <IonCard style="width: 65%; box-shadow: none">
            <IonCardHeader>
              <IonCardTitle style="font-size: x-large">{{$t('study')}}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{{$t('studyDescription')}}</IonCardContent>
          </IonCard>
          <IonNavLink router-direction="forward" :component="studyPage">
            <IonButton shape="round" size="default" style="font-size: small" color="dark">{{$t('enter')}}</IonButton>
          </IonNavLink>
        </IonItem>
        <IonItem>
          <IonCard style="width: 65%; box-shadow: none">
            <IonCardHeader>
              <IonCardTitle style="font-size: x-large">{{$t('mockTest')}}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>{{$t('mockTestDescription')}}</IonCardContent>
          </IonCard>
          <IonNavLink router-direction="forward" :component="mockTestPage">
            <IonButton shape="round" size="default" style="font-size: small;" color="dark">{{$t('enter')}}</IonButton>
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
  IonMenuButton,
  IonButtons,
} from '@ionic/vue';
import StudyPage from "@/views/StudyPage.vue";
import {markRaw} from "vue";
import MockTestPage from "@/views/MockTestPage.vue";
import useAdmob from "@/hooks/useAdmob";

const studyPage = markRaw(StudyPage)
const mockTestPage = markRaw(MockTestPage)
const { showBanner } = useAdmob();
showBanner();
</script>

<style scoped>

</style>
