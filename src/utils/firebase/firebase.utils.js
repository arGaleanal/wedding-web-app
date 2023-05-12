import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes,uploadBytesResumable, getDownloadURL } from "firebase/storage";
import '@firebase/firestore' // 👈 Don't forget this!
// import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import moment from 'moment';
// import { getRemoteConfig } from "firebase/remote-config";
// import { getValue } from "firebase/remote-config";
// import { fetchAndActivate } from "firebase/remote-config";
import { useState, useEffect, useContext, createContext } from 'react'

import {
  getAuth,
  deleteUser,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updatePassword,
  updateEmail,
  sendPasswordResetEmail
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  addDoc,
  deleteDoc,
  where,
  getDoc, 
  setDoc, 
  collection, 
  writeBatch,
  getDocs,
  query,
  updateDoc,
  orderBy
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyArkynnFYKR_SBdkHy2_TmZ0RxthXDTIOM",
  authDomain: "wedding-app-d8b18.firebaseapp.com",
  projectId: "wedding-app-d8b18",
  storageBucket: "wedding-app-d8b18.appspot.com",
  messagingSenderId: "488965825956",
  appId: "1:488965825956:web:eb318dd3cf402d49820d31"
};
const firebaseApp = initializeApp(firebaseConfig);
// export const remoteConfig = getRemoteConfig(firebaseApp);

// let rcDefaults = require('./remote_config_defaults.json');

// // const rcDefaultsFile = await fetch('remote_config_defaults.json');
// // const rcDefaultsJson = await rcDefaultsFile.json();
// remoteConfig.defaultConfig = rcDefaults;
// remoteConfig.settings.minimumFetchIntervalMillis = 3600000;

// export const windowFlag2 = getValue(remoteConfig, "window_flag");

export const storage = getStorage(firebaseApp);
export const storageRef = ref(storage);


const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();

// =========================================================================================
// 
// =========================================================================================

export const createConfirmacionDocument = async (confirmacion) => {
  if (!confirmacion) return;

  const confirmacionDocRef = doc(collection(db, "confirmaciones"));
  
  const {asistencia, numeroInvitados, nombreInvitado } = confirmacion;
  const createdAt = new Date();
  
  try {
      await setDoc(confirmacionDocRef, {
      createdAt,
      asistencia,
      numeroInvitados,
      nombreInvitado,
      });
  } catch (error) {
      console.log('error creating the jugador', error.message);
  }
  const confirmacionSnapshot = await getDoc(confirmacionDocRef);

  
  return confirmacionSnapshot;
}

export const getConfirmacionesAndDocument = async () => {
  const collectionRef = collection(db, 'confirmaciones');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => {
    return {id: docSnapshot.id, ...docSnapshot.data()}
  });
}
// =========================================================================================
//
// =========================================================================================

const authContext = createContext();

export const ProvideAuth = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

// Hook for child components to get the auth object ...
// ... and re-render when it changes.
export const useAuth = () => {
  return useContext(authContext);
};
// Provider hook that creates auth object and handles state
const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  // Subscribe to user on mount
  // Because this sets state in the callback it will cause any ...
  // ... component that utilizes this hook to re-render with the ...
  // ... latest auth object.
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth,(userAuth) => {
      if (userAuth) {
        console.log('here unsubscribe',userAuth)
        setUser(userAuth);
      } else {
        setUser(false);
      }
    });
    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [user]);
  // Return the user object and auth methods
  return {
    user
  };
}
// =========================================================================================
// =========================================================================================

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

export const db = getFirestore();

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);
  
  objectsToAdd.forEach((object) => {
     const docRef = doc(collectionRef);
     batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

// =========================================================================
// Images Functions
// =========================================================================

export const uploadImage = async (image, teamName, folder) => {
    const imageRef = ref(storage, `equipos/equipo-${teamName}-${image.name}`);
    const uploadTask = uploadBytesResumable(imageRef, image);

    uploadTask.on('state_changed',(snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, (error) => {
    console.log('Upload error',error);
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, async () => {
    // Upload completed successfully, now we can get the download URL
    console.log('Upload completed successfully');
    
  }
);
    return uploadTask;
}

export const getUrlImage = async (imageRef) => {
    return await getDownloadURL(imageRef);//.then((downloadURL) => downloadURL);
}

// =========================================================================
// User Functions
// =========================================================================
export const createUserDocumentFromAuth = async (
    userAuth,
    additionalInformation = {}
  ) => {
    if (!userAuth) return;
  
    const userDocRef = doc(db, 'users', userAuth.uid);
  
    const userSnapshot = await getDoc(userDocRef);
  
    if (!userSnapshot.exists()) {
      const { displayName, email } = userAuth;
      const createdAt = new Date();
  
      try {
        await setDoc(userDocRef, {
          displayName,
          email,
          createdAt,
          ...additionalInformation,
        });
      } catch (error) {
        console.log('error creating the user', error.message);
      }
    }
  
    return userSnapshot;
};

export const deleteUserDocument = async (idUser) => {
  let deleteUser;
  try {
    deleteUser = await deleteDoc(doc(db, "users", idUser));
  } catch (error) {
      console.log('error creating the team', error.message);
  }
  return deleteUser;
}


export const updatePasswordUserAuth = async (newPassword) => {
  const user = auth.currentUser;
  const updating = await updatePassword(user, newPassword);
  return updating;
};

export const updateEmailUserAuth = async (newEmail) => {
  const user = auth.currentUser;
  const updating = await updateEmail(user, newEmail);
  return updating;
};

export const resetUserAuthPassword = async (email) => {
const reset = sendPasswordResetEmail(auth, email).then(() => {
    // Password reset email sent!
    // ..
    console.log('sendPasswordResetEmail Password reset email sent!');
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
  
  return reset;
};

export const createUserDocumentFromAuth2 = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
    const userSnapshot = await getDoc(userDocRef);
    console.log('createUserDocumentFromAuth userSnapshot',userSnapshot);

  return userSnapshot;
};

export const createUserDocument = async (additionalInformation) => {
  if (!additionalInformation) return;

  const userDocRef = doc(collection(db, "users"));

    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
    const userSnapshot = await getDoc(userDocRef);

  return userSnapshot;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  const auth2 = getAuth();
  return await createUserWithEmailAndPassword(auth2, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => {
  if(!callback) return;
  onAuthStateChanged(auth, callback);
};

export const getUsersAndDocument = async () => {
  const collectionRef = collection(db, 'users');
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map((docSnapshot) => {
    return {id: docSnapshot.id, ...docSnapshot.data()}
  });
};

export const onGetUserFromAuth = async (user) => {
  const docUserRef = doc(db, 'users', user.uid);
  
  const docUserSnap = await getDoc(docUserRef);

  return docUserSnap;
}
export const getCurrentUser = () => {
    return new Promise((resolve, reject) => {
      const unsubscribe = onAuthStateChanged(
        auth,
        (userAuth) => {
          unsubscribe();
          resolve(userAuth);
        },
        reject
      );
    });
  };
// =========================================================================