import * as firebase from 'firebase/app';

import {getAuth} from 'firebase/auth'

let instance : any

const authHelper = {
  getFirebase() {
        if (instance) return instance
        instance = firebase.initializeApp({
          apiKey: "AIzaSyBdtgJTpg8-pYIb7sMny70qeJICM-fiSqY",
          authDomain: "nsfopendata.firebaseapp.com",
          projectId: "nsfopendata",
          storageBucket: "nsfopendata.appspot.com",
          messagingSenderId: "534112304877",
          appId: "1:534112304877:web:12c89010611160931cd6e4",
          measurementId: "G-Q543M8QW7L"
        });
        return instance
  },

  addLoginInfo(result: any) {
      sessionStorage.setItem('userInfo', JSON.stringify(result))
  },
  
  getLoginInfo() {
    if(typeof window == 'undefined') {
      return false
    }
    if (sessionStorage.getItem('userInfo'))
      return JSON.parse(sessionStorage.getItem('userInfo')!)
    else
      return false
  },
  logout() {
    const auth = getAuth();
    auth.signOut().then(function() {
      sessionStorage.removeItem('userInfo')

    }).catch(function(error) {
        console.log(error)
      })

  }
}


export default authHelper