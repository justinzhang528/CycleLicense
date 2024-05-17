import {getDatabase, ref as databaseRef, set, get, child, remove, onValue} from "firebase/database";
import {dataResponse} from "@/enum/enum";
import {initializeApp} from "firebase/app";

export default function () {
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

    const upSertUser = (name: string, password: string, email: string, isUnlimited: boolean = false, unlimitedExpiredDate: number = 0, createOn: number = new Date().getTime()): Promise<any> => {
        return new Promise((resolve, reject) => {
            const db = getDatabase();
            set(databaseRef(db, 'Account/' + name), {
                name: name,
                password: password,
                email: email,
                isUnlimited: isUnlimited,
                unlimitedExpiredDate: unlimitedExpiredDate,
                createdOn: createOn,
            }).then(() => {
                resolve({
                    errorCode: dataResponse.SUCCESS,
                    data: null
                });
            }).catch((error) => {
                reject({
                    errorCode: dataResponse.ERROR,
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
                            errorCode: dataResponse.SUCCESS,
                            data: snapshot.val()
                        });
                    } else {
                        resolve({
                            errorCode: dataResponse.NO_DATA,
                            data: null
                        });
                    }
                })
                .catch((error) => {
                    reject({
                        errorCode: dataResponse.ERROR,
                        data: error
                    });
                });
        });
    }

    const removeUser = (name: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            const db = getDatabase();
            remove(databaseRef(db, `Account/${name}`)).then(() => {
                resolve({
                    errorCode: dataResponse.SUCCESS,
                    data: null
                });
            }).catch((error) => {
                reject({
                    errorCode: dataResponse.ERROR,
                    data: error
                });
            });
        });
    }

    const getAds = (dbPath: string, name: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            const dbRef = databaseRef(getDatabase());
            get(child(dbRef, `${dbPath}/${name}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        resolve({
                            errorCode: dataResponse.SUCCESS,
                            data: snapshot.val()
                        });
                    } else {
                        resolve({
                            errorCode: dataResponse.NO_DATA,
                            data: null
                        });
                    }
                })
                .catch((error) => {
                    reject({
                        errorCode: dataResponse.ERROR,
                        data: error
                    });
                });
        });
    }

    const upSertAds = (dbPath: string, name: string, imgUrl: string, link: string, description: string, createdOn: number = new Date().getTime()): Promise<any> => {
        return new Promise((resolve, reject) => {
            const db = getDatabase();
            set(databaseRef(db, `${dbPath}/${name}`), {
                name: name,
                imgUrl: imgUrl,
                link: link,
                description: description,
                createdOn: createdOn
            }).then(() => {
                resolve({
                    errorCode: dataResponse.SUCCESS,
                    data: null
                });
            }).catch((error) => {
                reject({
                    errorCode: dataResponse.ERROR,
                    data: error
                });
            });
        });
    }

    const removeAds = (dbPath: string, name: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            const db = getDatabase();
            remove(databaseRef(db, `${dbPath}/${name}`)).then(() => {
                resolve({
                    errorCode: dataResponse.SUCCESS,
                    data: null
                });
            }).catch((error) => {
                reject({
                    errorCode: dataResponse.ERROR,
                    data: error
                });
            });
        });
    }

    const getAppSetting = (name: string): Promise<any> => {
        return new Promise((resolve, reject) => {
            const dbRef = databaseRef(getDatabase());
            get(child(dbRef, `AppSetting/${name}`))
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        resolve({
                            errorCode: dataResponse.SUCCESS,
                            data: snapshot.val()
                        });
                    } else {
                        resolve({
                            errorCode: dataResponse.NO_DATA,
                            data: null
                        });
                    }
                })
                .catch((error) => {
                    reject({
                        errorCode: dataResponse.ERROR,
                        data: error
                    });
                });
        });
    }

    const handleOnDBValueChange = (path: string = '',func: any) => {
        const db = getDatabase();
        return onValue(databaseRef(db, path), (snapshot) => {
            func();
        });
    }

    return {
        initializeFirebase,
        upSertUser,
        getUser,
        removeUser,
        getAds,
        upSertAds,
        removeAds,
        getAppSetting,
        handleOnDBValueChange,
    }
}