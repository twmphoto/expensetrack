import React, { Component } from 'react';
import 'whatwg-fetch';
import {
  getFromStorage,
  setInStorage,
} from '../../components/utils/storage';
import './style.css'
import {loginImg} from './logo.png'
import e from 'express';
import {ExpenseTracker} from '../ExpenseTracker/ExpenseTracker'

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      token: '',
      signUpError: '',
      signInError: '', 
      signInEmail: '',
      SignInPassword: '',
      signUpFirstName: '',
      signUpLastName: '',
      signUpEmail: '',
      signUpPassword:'',
    };
    this.onTextBoxChange = this.onTextBoxChange.bind(this)
    this.onSignIn = this.onSignIn.bind(this)
    this.onSignUp = this.onSignUp.bind(this)
    this.logOut = this.logOut.bind(this)
  }

  componentDidMount() {
   const obj = getFromStorage('the_main_app')
   const {token} = obj;
   if(obj && obj.token){
    //verify token
    fetch('/api/account/verify?token='+ token)
    .then(res => res.json())
    .then(json => {
      if(json.success){
        this.setState({
          token: token,
          isLoading: false
        });
      }else {
        this.setState({
          isLoading: false
        })

      }
    });

   }else {
     this.setState({
       isLoading: false
     });
   }
  }

  onTextBoxChange = e => {
    //prevent reset
    //take value from textbox and apply to state
    e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value,
    });
  }

  onSignUp = e => {
    //grab state value
    
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword
    } = this.state

    this.setState({
      isLoading: true,
    })
  //Post request to Backend
  fetch('/api/account/signup', { 
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      firstName: signUpFirstName,
      lastName: signUpLastName,
      email: signUpEmail,
      password: signUpPassword
    }), 
  }).then(res => res.json())
  .then(json => {
    if (json.success) {
      this.setState({
        signUpError: json.message, 
        isLoading: false
      })
    } else {
      this.setState({
        signUpError: json.message, 
        isLoading: false,
        signUpEmail: '',
        signUpPassword: '',
        signUpFirstName: '',
        signUpLastName: ''
      })

    }
  });

  }
 

  onSignIn = e => {
    const {
      signInEmail,
      signInPassword
    } = this.state

    this.setState({
      isLoading: true,
    })
    fetch('/api/account/signin', { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        userName: signInEmail,
        password: signInPassword,
      }), 
    }).then(res => res.json())
    .then(json => {
      if (json.success){
        setInStorage('the_main_app', {token: json.token})
        this.setState({
          signUpError: json.message, 
          isLoading: false,
          token: json.token
        })
      } else {
        this.setState({
          signUpError: json.message, 
          isLoading: false,
          signInEmail: '',
          signInPassword: ''
     
        })
      }
    });
    
  }

  logOut = e => {
 
    this.setState({
      isLoading: true,
    })
    const obj = getFromStorage('the_main_app')
   const {token} = obj;
   if(obj && obj.token){
    //verify token
    fetch('/api/account/verify?logout'+ token)
    .then(res => res.json())
    .then(json => {
      if(json.success){
        this.setState({
          token: '',
          isLoading: false
        });
      }else {
        this.setState({
          isLoading: false
        })

      }
    });

   }else {
     this.setState({
       isLoading: false
     });
   }
  }


  render() {
    const {isLoading, 
            token, 
            signInError, 
            signInEmail, 
            signInPassword,
            signUpFirstName,
            signUpLastName,
            signUpEmail,
            signUpPassword
          } = this.state

    if (isLoading){
      return (<div>Loading...</div>)

    }

    if(!token) {
      return (
        //Sign IN
     <div>
      <div>
      {
        (signInError) ? (
          <p>{signInError}</p>
        ) : (null)

      }
      <p> Sign In</p>
      <input type="email" placeholder ="Enter Email" value = {signInEmail} onChange ={this.onTextBoxChange}/><br />
      <input type="password" placeholder ="Enter Password" value = {signInPassword} onChange ={this.onTextBoxChange}/><br />
      <button onClick ={this.onSignIn}>Sign In</button>
      </div>
      <br />
      <br />
      <input type="firstName" placeholder ="Enter First Name" value = {signUpFirstName} onChange ={this.onTextBoxChange} /><br />
      <input type="lastName" placeholder ="Enter Last Name" value = {signUpLastName} onChange ={this.onTextBoxChange}/><br />
      <input type="email" placeholder ="Enter Email" value = {signUpEmail} onChange ={this.onTextBoxChange}/><br />
      <input type="password" placeholder ="Enter Password" value = {signUpPassword} onChange ={this.onTextBoxChange}/><br />
      <button onClick ={this.onSignUp}>Sign Up</button>
     </div>
    )}

    return (
    <div>
    <h2>Account</h2>
    <ExpenseTracker />
    <button onClick = {logOut}>Log Out</button>

    </div>
    

    )
  }
}

export default Home;
