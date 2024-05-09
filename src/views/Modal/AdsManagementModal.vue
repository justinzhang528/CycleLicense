<template>
  <IonHeader>
    <IonToolbar>
      <IonTitle class="center">{{$t('adsManagement')}}</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-padding">
    <IonButton @click="onClickCreate" fill="clear" style="text-decoration: underline">{{ $t('create') }}</IonButton>
    <IonList v-for="(ad,index) in ads" class="ion-padding-bottom">
      <IonItem>
        <IonLabel>{{ad.name}}</IonLabel>
        <IonButton @click="onClickEdit(index)" fill="clear" style="text-decoration: underline">{{ $t('edit') }}</IonButton>
        <IonButton @click="onClickDelete(index)" fill="clear" style="text-decoration: underline">{{ $t('delete') }}</IonButton>
      </IonItem>
    </IonList>
  </IonContent>
  <IonButton class="ion-padding ion-align-self-center" @click="onCancelAdminModal" color="dark" size="small" shape="round">{{$t('close')}}</IonButton>
</template>

<script setup lang="ts">
import useFirebase from "@/hooks/useFirebase";
import {IonButton, IonContent, IonHeader, IonLabel, IonTitle, IonToolbar, modalController, IonList, IonItem} from "@ionic/vue";
import {onMounted, ref} from "vue";
import {showToast, showInputAlert} from "@/hooks/useUtils";
import {useI18n} from "vue-i18n";

const { t } = useI18n();
const {getAds,upSertAds,removeAds} = useFirebase();
const ads = ref({});

const getAllAds = ()=>{
  getAds('').then((res) => {
    ads.value = res.data;
  });
}

const onCancelAdminModal = () => {
  modalController.dismiss(null, 'cancel')
}

const onClickCreate = () => {
  const inputs = [{
    name:'name',
    type: 'text',
    placeholder: t('name')
  },{
    name:'imgUrl',
    type: 'textarea',
    placeholder: t('imgUrl')
  },{
    name:'link',
    type: 'textarea',
    placeholder: t('link')
  },{
    name:'description',
    type: 'textarea',
    placeholder: t('description')
  }]
  showInputAlert(t('createAds'),'','',t('ok'),t('cancel'),inputs,(data:any)=>{
    if(data.name === '' || data.imgUrl === '' || data.description === ''){
      showToast(t('pleaseFillAllFields'),1500);
      return;
    }
    if(ads.value !== null && ads.value.hasOwnProperty(data.name)){
      showToast(t('alreadyExist'),1500);
      return;
    }
    upSertAds(data.name,data.imgUrl,data.link,data.description).then(()=>{
      ads.value = {...ads.value, [data.name]: {
          name: data.name,
          imgUrl: data.imgUrl,
          link: data.link,
          description: data.description
        }};
      showToast(t('successfullyCreated'),1500);
    });
  });
}

const onClickEdit = (index: number) => {
  const inputs = [{
    name:'name',
    type: 'text',
    value: ads.value[index].name,
    placeholder: t('name'),
    disabled: true
  },{
    name:'imgUrl',
    type: 'textarea',
    value: ads.value[index].imgUrl,
    placeholder: t('imgUrl')
  },{
    name:'link',
    type: 'textarea',
    value: ads.value[index].link,
    placeholder: t('link')
  },{
    name:'description',
    type: 'textarea',
    value: ads.value[index].description,
    placeholder: t('description')
  }]
  showInputAlert(t('updateAds'),'','',t('ok'),t('cancel'),inputs,(data:any)=>{
    if(data.imgUrl === '' || data.link ==='' || data.description === ''){
      showToast(t('pleaseFillAllFields'),1500);
      return;
    }
    upSertAds(data.name,data.imgUrl,data.link,data.description).then(()=>{
      ads.value[index].name = data.name;
      ads.value[index].imgUrl = data.imgUrl;
      ads.value[index].link = data.link;
      ads.value[index].description = data.description;
      showToast(t('successfullyUpdated'),1500);
    });
  });
}

const onClickDelete = (index: number) => {
  showInputAlert(t('deleteAds'),'',`${t('name')}: ${ads.value[index].name}`,t('ok'),t('cancel'),[],()=>{
    const name = ads.value[index].name;
    removeAds(name).then(()=>{
      delete ads.value[name];
      showToast(t('successfullyDeleted'),1500);
    });
  });
}

onMounted(()=> {
  getAllAds();
});
</script>

<style scoped>

</style>