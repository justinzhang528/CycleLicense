<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title align="center">Driving License</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-img src="./public/images/main.png" style="width: 75%; display: block; margin: 20px auto;"></ion-img>
      <ion-list lines="inset">
        <ion-item style="display: flex">
          <ion-card style="width: 75%; box-shadow: none">
            <ion-card-header>
              <ion-card-title>Study</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              Here's a best place you can study motorcycle rules.
            </ion-card-content>
          </ion-card>
          <ion-nav-link router-direction="forward" :component="studyPage">
            <ion-button shape="round" size="default" color="dark">Enter</ion-button>
          </ion-nav-link>
        </ion-item>
        <ion-item>
          <ion-card style="width: 75%; box-shadow: none">
            <ion-card-header>
              <ion-card-title>Mock Test</ion-card-title>
            </ion-card-header>
            <ion-card-content>
              Here's a best place you can do a quick test.
            </ion-card-content>
          </ion-card>
          <ion-nav-link router-direction="forward" :component="mockTestPage">
            <ion-button shape="round" size="default" color="dark">Enter</ion-button>
          </ion-nav-link>
        </ion-item>
      </ion-list>
    </ion-content>
  </ion-page>
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
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>
