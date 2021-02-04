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
    password : '',
    image : '',
    success : false,
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



  const handleSubmit = (event) =>{

    if(user.name && user.password && user.email){
                   
      firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
     .then((res) => {
    // Signed in 
          var value = res.user;
       //  console.log(value)
    // ...
    const newUser = {...user};
    newUser.error ='';
    newUser.success = true;
    setUser(newUser);
           })
        .catch((error) => {
         const newUser = {...user};
         newUser.error = error.message;
         newUser.success = false;
         setUser(newUser);
          // ..
        });

    }
   
event.preventDefault();
  }


  const handleChange = (event)=>{
    //console.log(event.target.value);
    let isFieldValid = true;
    if(event.target.name === 'email'){

          isFieldValid= /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(event.target.value);
      

    }
    if(event.target.name === 'password'){

      isFieldValid = event.target.value.length > 6 ;
     
    }
    if( isFieldValid){
      const newUser = {...user};
      newUser[event.target.name] = event.target.value;
      setUser(newUser);
    }
  }
  return (
    <div className="App">
             {
              ( user.isSignIn) ? <button onClick={handleSignOut}>LogOut</button> :  <button onClick = {handleSignIn}>Sign In</button>
             }
             {
               (user.isSignIn) && <div>
                   <p>Name : {user.name}</p>
                   <p>Email : {user.email}</p>
                   <img src = {user.image} alt=""/>
               </div>
             }

             <h1>Our own authentication</h1>
            
             <form onSubmit = {handleSubmit}>
                    <input type="text" onBlur = {handleChange}  name = "name"placeholder = "your name" required/><br/>
                    <input type="email" onBlur = {handleChange}  name = "email"placeholder = "Your email" required/><br/>
                    <input type="password" onBlur = {handleChange}  name="password" id="" placeholder = "password " required/>
                    <br/>
                   <input type="submit" value="Submit"/>
             </form>
             <p style={{color:'red'}}>{user.error}</p>
             {
               user.success && <p style ={{color:'green'}}>Your login success</p>
             }
    </div>


  );
}

export default App;
