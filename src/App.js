import logo from './logo.svg';
import './App.css';
import {useState} from 'react';
import firebaseConfig from './firebaseConfig';
import firebase from "firebase/app";
import "firebase/auth";
firebase.initializeApp(firebaseConfig)
function App() {

  //using at component provider
  const provider = new firebase.auth.GoogleAuthProvider();
  //default value
  const [user , setUser] = useState({
    isSignIn : false,
    name : '',
    email : '',
    image : ''
  })
  //for google sign in
  const handleSignIn = ()=>{
            
            firebase.auth()
          .signInWithPopup(provider)
          .then((result) => {
            
            const {displayName , photoURL , email} = result.user;
            //console.log(displayName , photoURL , email)
            const signInuser  = {
                          isSignIn : true,
                          name : displayName , 
                          email : email,
                          image : photoURL
            }
            setUser(signInuser)
  })
  .catch(err=> console.log(err.message))
  }


  //google sign out
      const handleSignOut = ()=>{
        firebase.auth().signOut()
            .then(res=>{
              const signInOut = {
                isSignIn : false,
                name : '',
                email : '',
                image : ''
              }
              setUser(signInOut)
            })
            .catch((error) => {
              // An error happened.
            }); 
            
  }
  return (
    <div className="App">
             {
              ( user.isSignIn) ? <button onClick={handleSignOut}>LogOut</button> :  <button onClick = {handleSignIn}>Sign In</button>
             }
    </div>
  );
}

export default App;
