// Import Local Dependencies
import { getFromStorage } from '../../utils/storage';

// Import Action Types
import {
    SIGN_UP,
    SIGN_IN, 
    SIGN_OUT, 
    OPEN_SIGNIN_DIALOG, 
    OPEN_SIGNUP_DIALOG, 
    OPEN_PROFILE_DIALOG,
    OPEN_DRAWER,
    CLOSE_DIALOGS, 
    VERIFY_SESSION,
    DELETE_USER
} from './types';

// Export openSignIn function
export const openSignIn = () => dispatch => {
    dispatch({type: OPEN_SIGNIN_DIALOG});
};

// Export openSignUp function
export const openSignUp = () => dispatch => {
    dispatch({type: OPEN_SIGNUP_DIALOG});
};

// Export openProfile function
export const openProfile = () => dispatch => {
    dispatch({type: OPEN_PROFILE_DIALOG});
};

// Export openDrawer function
export const openMenuDrawer = () => dispatch => {
    dispatch({type: OPEN_DRAWER});
};

// Export closeDialogs function
export const closeDialogs = () => dispatch => {
    dispatch({type: CLOSE_DIALOGS});
};

export const signUp = (firstName, lastName, email, password, passwordVerification) => dispatch => {
    // Posts new user info to DB
    fetch('api/account/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        passwordVerification: passwordVerification
      }),
    }).then(res => res.json())
      .then(json => dispatch({
          type: SIGN_UP,
          payload: json
      }));
};

// Export signIn function
export const signIn = (email, password) => dispatch => {
    // Posts new user info to DB
    fetch('api/account/signin', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        email: email,
        password: password
        }),
    }).then(res => res.json())
    .then(json => dispatch({
        type: SIGN_IN,
        payload: json
    }));
};

// Export signOut function
export const signOut = () => dispatch => {
    // Get obj from storage
    const obj = getFromStorage('the_main_app');

    // If token exists in obj...
    if (obj && obj.token) {
      // ...delete token
      const { token } = obj;
      fetch(`/api/account/signout?token=${token}`)
      .then(res => res.json())
      .then(json => dispatch({
        type: SIGN_OUT,
        payload: json
      }));
    };
};

// Export verifySession function
export const verifySession = () => dispatch => {
    // Get obj from storage
    const obj = getFromStorage('the_main_app');

    // I do a double fetch here to make sure I can access user data after a refresh/reopen.

    // Fetch user info from DB to pass result into next fetch
    fetch(`/api/account/user/${obj.id}`)
    .then(res => res.json())
    .then(result => {
        // If token exists in obj...
        if (obj && obj.token) {
            // ...verify token
            const { token, expires } = obj;
            fetch(`/api/account/verify?token=${token}&expires=${expires}`)
            .then(res => res.json())
            .then(json => dispatch({
                type: VERIFY_SESSION,
                payload: json,
                user: result.data[0]
            }));
        };
    });
};

// Export deleteUser function
export const deleteUser = (userId) => dispatch => {
    fetch(`/api/account/delete/${userId}`, {
        method: 'DELETE'
    })
    .then(res => res.json())
    .then(json => dispatch({
        type: DELETE_USER,
        payload: json
    }));
};