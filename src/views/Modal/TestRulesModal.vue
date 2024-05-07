<template>
  <IonHeader>
    <IonToolbar>
      <IonButtons slot="start">
        <IonButton @click="onCancelDonateModal">{{ $t('cancel') }}</IonButton>
      </IonButtons>
      <IonTitle class="center">{{ $t('testRules') }}</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="center ion-padding">
    <IonGrid class="ion-text-left">
      <IonRow>
        <IonLabel>{{$t('notification')}}</IonLabel>
      </IonRow>
      <IonRow>
        <IonCol size="1">
          <IonLabel>{{$t('1')}}{{$t('.')}}</IonLabel>
        </IonCol>
        <IonCol size="11">
          <IonLabel>{{$t('testRules-1')}}</IonLabel>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="1">
          <IonLabel>{{$t('2')}}{{$t('.')}}</IonLabel>
        </IonCol>
        <IonCol size="11">
          <IonLabel>{{$t('testRules-2')}}</IonLabel>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="1">
          <IonLabel>{{$t('3')}}{{$t('.')}}</IonLabel>
        </IonCol>
        <IonCol size="11">
          <IonLabel>{{$t('testRules-3')}}</IonLabel>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="1">
          <IonLabel>{{$t('4')}}{{$t('.')}}</IonLabel>
        </IonCol>
        <IonCol size="11">
          <IonLabel>{{$t('testRules-4')}}</IonLabel>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="1">
          <IonLabel>{{$t('5')}}{{$t('.')}}</IonLabel>
        </IonCol>
        <IonCol size="11">
          <IonLabel>{{$t('testRules-5')}}</IonLabel>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol size="1">
          <IonLabel>{{$t('6')}}{{$t('.')}}</IonLabel>
        </IonCol>
        <IonCol size="11">
          <IonLabel>{{$t('testRules-6')}}</IonLabel>
        </IonCol>
      </IonRow>
    </IonGrid>
  </IonContent>
</template>

<script setup lang="ts">
import {IonButton, IonButtons, IonContent, IonHeader, IonItem, IonTitle, IonToolbar, modalController, IonGrid, IonRow, IonCol, IonLabel} from "@ionic/vue"

const onCancelDonateModal = () => {
  modalController.dismiss(null, 'cancel')
}
</script>

<style scoped>
ion-grid {
  --ion-grid-columns: 12;
}
</style>