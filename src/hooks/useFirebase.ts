import {getDatabase, ref, set, get, child} from "firebase/database";
import {loginResponse} from "@/enum/enum";
import {initializeApp} from "firebase/app";

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

    const upSertUser = (name: string, password: string, email: string)=> {
        const db = getDatabase();
        set(ref(db, 'Account/' + name), {
            name: name,
            password : password,
            email: email,
            isUnlimited: false,
        });
    }

    const getUser = (name: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            const dbRef = ref(getDatabase());
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

    return{
        initializeFirebase,
        upSertUser,
        getUser
    }
}