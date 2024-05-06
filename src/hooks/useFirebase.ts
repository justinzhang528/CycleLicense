import {getDatabase, ref as databaseRef, set, get, child} from "firebase/database";
import {loginResponse,registerResponse} from "@/enum/enum";
import {initializeApp, getApp} from "firebase/app";
import { getStorage, ref as storageRef, listAll, getDownloadURL } from "firebase/storage";

export default function (){
    const initializeFirebase = () => {
        const firebaseConfig = {
            apiKey: "AIzaSyBQy-DZkRDAx-u7GG3_h3RmsNGAm6fT-Cs",
            authDomain: "drivinglicense-10d0e.firebaseapp.com",
            projectId: "drivinglicense-10d0e",
            storageBucket: "drivinglicense-10d0e.appspot.com",
            messagingSenderId: "412450721206",
            appId: "1:412450721206:web:394350d8b9e4e2f26a0517",
            databaseURL: "https://drivinglicense-10d0e-default-rtdb.asia-southeast1.firebasedatabase.app",
        };

        initializeApp(firebaseConfig);
    }

    const upSertUser = (name: string, password: string, email: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            const db = getDatabase();
            set(databaseRef(db, 'Account/' + name), {
                name: name,
                password : password,
                email: email,
                isUnlimited: false,
            }).then(() => {
                resolve({
                    errorCode: registerResponse.SUCCESS,
                    data: null
                });
            }).catch((error) => {
                reject({
                    errorCode: registerResponse.ERROR,
                    data: error
                });
            });
        });
    }

    const getUser = (name: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            const dbRef = databaseRef(getDatabase());
            get(child(dbRef, `Account/${name}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        resolve({
                            errorCode: loginResponse.SUCCESS,
                            data: snapshot.val()
                        });
                    } else {
                        resolve({
                            errorCode: loginResponse.NO_DATA,
                            data: null
                        });
                    }
                })
                .catch((error) => {
                    reject({
                        errorCode: loginResponse.ERROR,
                        data: error
                    });
                });
        });
    }

    const listStorage = ()=>{
        const firebaseApp = getApp();
        const storage = getStorage(firebaseApp, "gs://drivinglicense-10d0e.appspot.com");
        const ref = storageRef(storage, 'DrivingLicense/image/');
        // Find all the prefixes and items.
        listAll(ref)
            .then((res) => {
                res.items.forEach((itemRef) => {

                    const localRef = storageRef(storage, itemRef.fullPath);
                    // Get the download URL
                    getDownloadURL(localRef)
                        .then((url) => {
                            console.log(url);
                        })
                        .catch((error) => {
                            // A full list of error codes is available at
                            // https://firebase.google.com/docs/storage/web/handle-errors
                            switch (error.code) {
                                case 'storage/object-not-found':
                                    // File doesn't exist
                                    break;
                                case 'storage/unauthorized':
                                    // User doesn't have permission to access the object
                                    break;
                                case 'storage/canceled':
                                    // User canceled the upload
                                    break;

                                // ...

                                case 'storage/unknown':
                                    // Unknown error occurred, inspect the server response
                                    break;
                            }
                        });
                    
                });
            }).catch((error) => {
            // Uh-oh, an error occurred!
        });
    }

    return{
        initializeFirebase,
        upSertUser,
        getUser,
        listStorage
    }
}