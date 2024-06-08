import {ref} from 'vue';

export default function useInternetConnection() {
    const isOnline = ref(navigator.onLine);

    window.addEventListener('online', () => {
        isOnline.value = true;
    });

    window.addEventListener('offline', () => {
        isOnline.value = false;
    });

    return {isOnline};
}