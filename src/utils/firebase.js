import app from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

import moment from 'moment'

const config = {
    apiKey: "AIzaSyA39LHNEgqASAk51V0za88oji_Em2rN8lo",
    authDomain: "auto-express-24-horas.firebaseapp.com",
    databaseURL: "https://auto-express-24-horas.firebaseio.com",
    projectId: "auto-express-24-horas",
    storageBucket: "auto-express-24-horas.appspot.com",
    messagingSenderId: "72162770837",
    appId: "1:72162770837:web:e81a825fdf120c1bcb009c",
    measurementId: "G-JZGL4FZ05B"
}

class Firebase {
    constructor() {
        app.initializeApp(config)
        this.auth = app.auth()
        this.firestore = app.firestore()
        this.storage = app.storage()
    }

    login(email, password) {
        return this.auth.signInWithEmailAndPassword(email,password)
    }
    async register (name,email,password) {
        const timestamp = moment().valueOf()
        await this.auth.createUserWithEmailAndPassword(email,password)
        return this.firestore.collection('users').doc(this.auth.currentUser.uid).set({
            name,
            email,
            password,
            timestamp,
            id: this.auth.currentUser.uid,
            rol: 'user'
        })
    }
    logout() {
        return this.auth.signOut()
    }

    isInitialized() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    }
    userSession() {
        return new Promise(resolve => {
            if (this.auth.currentUser) {
                this.firestore.collection('users').doc(this.auth.currentUser.uid).onSnapshot(snap => {
                    resolve(snap.data())
                })
            }
        })
    }

    async addOnUser(col, item) {
        const ref = this.firestore.collection('users').doc(this.auth.currentUser.uid).collection(col).doc()
        item.id = ref.id
        item.timestamp = moment().valueOf()
        await ref.set(item)
        return ref.id
    }
    async simpleAdd(item,col) {
        const ref = this.firestore.collection(col).doc()
        item.id = ref.id
        item.timestamp = moment().valueOf()
        item.userId = this.auth.currentUser.uid
        item.userEmail = this.auth.currentUser.email
        await ref.set(item)
        const movesRef = this.firestore.collection('usersMoves').doc()
        const move = {
            col,
            timestamp: moment().valueOf(),
            id: movesRef.id,
            type: 'Agregar',
            what: ref.id,
            userId: this.auth.currentUser.uid
        }
        await movesRef.set(move)
        return ref.id
    }

    getCollection(col) {
        const ref = this.firestore.collection(col)
        return ref
    }
    getDocument(col,doc) {
        const ref = this.firestore.collection(col).doc(doc)
        return ref
    }
    update (col,doc,index,value) {
        const ref = this.firestore.collection(col).doc(doc)
        return ref.update({ [index]: value })
    }
    async delete(col,doc,data) {
        const ref = this.firestore.collection(col).doc(doc)
        await ref.delete();
        const movesRef = this.firestore.collection('usersMoves').doc();
        const move = {
            col,
            timestamp: moment().valueOf(),
            id: movesRef.id,
            type: 'Borrar',
            what: ref.id,
            userId: this.auth.currentUser.uid,
            data
        };
        return movesRef.set(move);
    }
    async addFileDoc (col,doc,index,file) {
        const uploadFile = (route,file,name) => {
            return new Promise((resolve,reject) => {
                const ext = file.name.split('.').pop()
                const fileName = `${name}.${ext}`;
                const uploadFile = this.storage.ref(route).child(fileName).put(file);
                uploadFile.on('state_changed', snapshot => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    return progress
                }, error => {
                    reject(error)
                }, () => {
                    uploadFile.snapshot.ref.getDownloadURL().then(url => {
                        resolve(url)
                    })
                });
            })
        }
        const ref = this.firestore.collection(col).doc(doc)
        const url = await uploadFile(`${col}/${doc}`,file,index)
        return ref.update({ [index]: url }).then(() => {
            return url
        })
    }

    async addNew (file,item) {
        const col = 'images'
        const ref = this.firestore.collection(col).doc()
        const uploadFile = (route,file,name) => {
            return new Promise((resolve,reject) => {
                const ext = file.name.split('.').pop()
                const fileName = `${name}.${ext}`;
                const uploadFile = this.storage.ref(route).child(fileName).put(file);
                uploadFile.on('state_changed', snapshot => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    return progress
                }, error => {
                    reject(error)
                }, () => {
                    uploadFile.snapshot.ref.getDownloadURL().then(url => {
                        resolve(url)
                    })
                });
            })
        }
        const url = await uploadFile(`images/${ref.id}`,file,'cover')
        item.id = ref.id
        item.timestamp = moment().valueOf()
        item.userId = this.auth.currentUser.uid
        item.userEmail = this.auth.currentUser.email
        item.cover = url
        await ref.set(item)
        const movesRef = this.firestore.collection('usersMoves').doc()
        const move = {
            col,
            timestamp: moment().valueOf(),
            id: movesRef.id,
            type: 'Agregar',
            what: ref.id,
            userId: this.auth.currentUser.uid
        }
        await movesRef.set(move)
        return ref.id
    }
}

export default new Firebase()