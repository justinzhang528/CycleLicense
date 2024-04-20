<template>
  <ion-app>
    <ion-router-outlet/>
    <ion-nav :root="homePage"></ion-nav>
  </ion-app>
</template>

<script setup lang="ts">
import {IonApp, IonRouterOutlet, IonNav} from '@ionic/vue';
import HomePage from "@/views/HomePage.vue";
import {markRaw} from "vue";

const homePage = markRaw(HomePage)
</script>