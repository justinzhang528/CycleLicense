<template>
  <IonPage>
    <IonHeader :translucent="true">
      <IonToolbar>
        <IonTitle align="center">Driving License</IonTitle>
      </IonToolbar>
    </IonHeader>

    <IonContent :fullscreen="true">
      <IonImg src="images/main.png" style="width: 75%; display: block; margin: 20px auto;"></IonImg>
      <IonList lines="inset">
        <IonItem style="display: flex">
          <IonCard style="width: 75%; box-shadow: none">
            <IonCardHeader>
              <IonCardTitle>Study</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Here's a best place you can study motorcycle rules.
            </IonCardContent>
          </IonCard>
          <IonNavLink router-direction="forward" :component="studyPage">
            <IonButton shape="round" size="default" color="dark">Enter</IonButton>
          </IonNavLink>
        </IonItem>
        <IonItem>
          <IonCard style="width: 75%; box-shadow: none">
            <IonCardHeader>
              <IonCardTitle>Mock Test</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              Here's a best place you can do a quick test.
            </IonCardContent>
          </IonCard>
          <IonNavLink router-direction="forward" :component="mockTestPage">
            <IonButton shape="round" size="default" color="dark">Enter</IonButton>
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
  IonNavLink
} from '@ionic/vue';
import StudyPage from "@/views/StudyPage.vue";
import {markRaw} from "vue";
import MockTestPage from "@/views/MockTestPage.vue";

const studyPage = markRaw(StudyPage)
const mockTestPage = markRaw(MockTestPage)
</script>

<style scoped>

</style>
