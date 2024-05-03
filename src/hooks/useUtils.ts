import {alertController, toastController} from "@ionic/vue";

export function isValidEmail (email: string): boolean {
    const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function shuffleArray(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export async function showAlert (header: string, subHeader: string, message: string, buttonText: string){
    const alert = await alertController.create({
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: [
            {
                text: buttonText,
                role: 'confirm',
            }
        ],
        backdropDismiss: false,
    });
    await alert.present();
}

export async function showAlertWithAction (header: string, subHeader: string, message: string, confirmButtonText: string, cancelButtonText: string, func: any, subFunc: any){
    const alert = await alertController.create({
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: [
            {
                text: cancelButtonText,
                role: 'cancel'
            },
            {
                text: confirmButtonText,
                role: 'confirm',
                handler: ()=>{
                    func(subFunc);
                }
            },
        ],
        backdropDismiss: false,
    });
    await alert.present();
}

export async function showFinishAlert(header: string, subHeader: string, message: string, buttonText: string, handler: any) {
    const alert = await alertController.create({
        header: header,
        subHeader: subHeader,
        message: message,
        buttons: [
            {
                text: buttonText,
                role: 'confirm',
                handler: handler,
            }
        ],
        backdropDismiss: false,
    });

    await alert.present();
}

export async function showToast (msg: string) {
    const toast = await toastController.create({
        message: msg,
        duration: 300,
        position: 'bottom',
    });
    await toast.present();
}