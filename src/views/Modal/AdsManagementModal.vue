<template>
  <IonHeader>
    <IonToolbar>
      <IonTitle class="center">{{$t('adsManagement')}}</IonTitle>
    </IonToolbar>
  </IonHeader>
  <IonContent class="ion-padding">
    <IonButton @click="onClickCreate" fill="clear" style="text-decoration: underline">{{ $t('create') }}</IonButton>
    <IonList v-for="(ad,key) in ads" class="ion-padding-bottom">
      <IonItem>
        <IonLabel>
          {{ad.name}}
          <img v-if="homeAds != null && homeAds.name === ad.name" :src="'images/icon/crownIcon.png'" alt="crown" style="width: 20px"/>
        </IonLabel>
        <IonButton @click="onClickAddToHomePage(key)" fill="clear" style="text-decoration: underline">
          <IonIcon :icon="home"></IonIcon>
        </IonButton>
        <IonButton @click="onClickEdit(key)" fill="clear" style="text-decoration: underline">{{ $t('edit') }}</IonButton>
        <IonButton @click="onClickDelete(key)" fill="clear" style="text-decoration: underline">{{ $t('delete') }}</IonButton>
      </IonItem>
    </IonList>
  </IonContent>
  <IonButton class="ion-padding ion-align-self-center" @click="onCancelAdminModal" color="dark" size="small" shape="round">{{$t('close')}}</IonButton>
</template>

<script setup lang="ts">
import useFirebase from "@/hooks/useFirebase";
import {IonButton, IonContent, IonHeader, IonLabel, IonTitle, IonToolbar, modalController, IonList, IonItem, IonIcon} from "@ionic/vue";
import {onMounted, ref} from "vue";
import {showToast, showInputAlert, showAlertWithAction} from "@/hooks/useUtils";
import {useI18n} from "vue-i18n";
import {home} from "ionicons/icons";

const { t } = useI18n();
const {getAds,upSertAds,removeAds} = useFirebase();
const ads = ref({});
const homeAds = ref();

const getAllAds = ()=>{
  getAds('Ads','').then((res) => {
    ads.value = res.data;
  });
}

const getHomeAds = ()=>{
  getAds('HomeAds','').then((res) => {
    for (const item in res.data) {
      homeAds.value = res.data[item];
    }
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
    upSertAds('Ads',data.name,data.imgUrl,data.link,data.description).then(()=>{
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

const onClickAddToHomePage = (key: string) => {
  showAlertWithAction(t('warning'),'',t('addToHomePage'),t('ok'),t('cancel'),()=>{
    removeAds('HomeAds','');
    upSertAds('HomeAds',ads.value[key].name,ads.value[key].imgUrl,ads.value[key].link,ads.value[key].description,ads.value[key].createdOn).then(()=>{
      showToast(t('addedToHomePage'),1500);
      getHomeAds();
    });
  });
}

const onClickEdit = (key: string) => {
  const inputs = [{
    name:'name',
    type: 'text',
    value: ads.value[key].name,
    placeholder: t('name'),
    disabled: true
  },{
    name:'imgUrl',
    type: 'textarea',
    value: ads.value[key].imgUrl,
    placeholder: t('imgUrl')
  },{
    name:'link',
    type: 'textarea',
    value: ads.value[key].link,
    placeholder: t('link')
  },{
    name:'description',
    type: 'textarea',
    value: ads.value[key].description,
    placeholder: t('description')
  }]
  showInputAlert(t('updateAds'),'','',t('ok'),t('cancel'),inputs,(data:any)=>{
    if(data.imgUrl === '' || data.link ==='' || data.description === ''){
      showToast(t('pleaseFillAllFields'),1500);
      return;
    }
    upSertAds(data.name,data.imgUrl,data.link,data.description,'Ads',ads.value[key].createdOn).then(()=>{
      ads.value[key].name = data.name;
      ads.value[key].imgUrl = data.imgUrl;
      ads.value[key].link = data.link;
      ads.value[key].description = data.description;
      showToast(t('successfullyUpdated'),1500);
    });
  });
}

const onClickDelete = (key: string) => {
  showAlertWithAction(t('deleteAds'),'',`${t('name')}: ${ads.value[key].name}`,t('ok'),t('cancel'),()=>{
    const name = ads.value[key].name;
    removeAds('Ads',name).then(()=>{
      delete ads.value[name];
      showToast(t('successfullyDeleted'),1500);
    });
  });
}

onMounted(()=> {
  getAllAds();
  getHomeAds();
});
</script>

<style scoped>

</style>