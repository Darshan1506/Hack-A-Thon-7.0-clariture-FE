import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth ,db} from "../firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";


const userAuthContext = createContext();
export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState({});

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const signUp = async(email, password,ipAddress)=>{
    createUserWithEmailAndPassword(auth, email, password).then(
      async(result)=>{
        console.log(result)
        try{
          const docref = await setDoc(doc(db,"users",result.user.uid),{
            ipAddress,
            userId:`${result.user.uid}`
          });

          console.log("welcom")
          console.log(docref.id)

        }catch(e){
          console.error(e);
        }
      }
    )

  }
  
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, logIn, signUp, logOut, googleSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
