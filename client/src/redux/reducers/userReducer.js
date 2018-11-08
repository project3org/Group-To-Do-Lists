// Import Local Dependencies
import { setInStorage } from '../../utils/storage';

import toastr from 'toastr';

// Import action types
import { 
    SIGN_IN, 
    SIGN_OUT,
    OPEN_SIGNIN_DIALOG,
    OPEN_SIGNUP_DIALOG, 
    OPEN_DRAWER,
    CLOSE_DIALOGS, 
    VERIFY_SESSION
} from '../actions/types';

// Set Initial States
const initialState = {
    serverPayload: {},
    openSignInDialog: false,
    openSignUpDialog: false,
    openDrawer: false,
    errorMessage: ' ',
    signedIn: false,
    buttonTitle: 'Sign In',
    currentUser: {}
};

// Export states
export default function(state = initialState, action)  {
    // Switch statement determining which states to export based upon the action called
    switch(action.type) {
        // Open Sign In Dialog Action
        case OPEN_SIGNIN_DIALOG:
            // Return States
            return {
                ...state,
                openSignInDialog: true
            };

        // Open Sign Up Dialog Action
        case OPEN_SIGNUP_DIALOG:
            // Return States
            return {
                ...state,
                openSignUpDialog: true
            };

        // Open Drawer Action
        case OPEN_DRAWER: 
            // Return States
            return {
                ...state,
                openDrawer: true
            };

        // Close Dialogs Action
        case CLOSE_DIALOGS:
            // Return States
            return {
                ...state,
                openSignInDialog: false,
                openSignUpDialog: false,
                openDrawer: false,
                errorMessage: ''
            };

        // Sign Up Action
        case SIGN_UP:
            // If Sign Up was successful
            if(action.payload.success) {
                // Display a success message telling user to check their email
                // Creates toastr options
                toastr.options = {
                    "closeButton": true,
                    "positionClass": "toast-top-right",
                    "onclick": null,
                    "showDuration": "300",
                    "hideDuration": "1000",
                    "timeOut": "5000",
                    "extendedTimeOut": "1000",
                    "showEasing": "swing",
                    "hideEasing": "linear",
                    "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
            
                // Sends toastr success message to user
                toastr.success("Please follow the link sent to your email.", "Account successfully created!");
                // return states with signUpDialog set to false
                return {
                    ...state,
                    serverPayload: action.payload,
                    errorMessage: '',
                    openSignUpDialog: false

                };
            } else {
                return {
                    ...state,
                    serverPayload: action.payload,
                    errorMessage: action.payload.message
                }
            }

        // Sign In Action
        case SIGN_IN:
        // If Sign in was successful
        if (action.payload.success) {
            // save user token in localStorage
            setInStorage('the_main_app', { 
                id: action.payload.userData._id, 
                token: action.payload.token, 
                expires: action.payload.expires 
            });

            // Return States
            return {
                ...state,
                serverPayload: action.payload,
                signedIn: true,
                buttonTitle: 'Sign Out',
                errorMessage: '',
                currentUser: action.payload.userData,
                openSignInDialog: false
            };
        // Else
        } else {
            // Return States
            return {
                ...state,
                serverPayload: action.payload,
                signedIn: true,
                errorMessage: action.payload.message,
                currentUser: action.payload.userData,
            };
        }
    
        // Sign Out Action
        case SIGN_OUT:
        if (action.payload.success) {
            // Return States
            return {
                ...state,
                signedIn: false,
                buttonTitle: 'Sign In',
                errorMessage: '',
                currentUser: {}
            };
        } else {
            // Return States
            return {
                ...state,
                signedIn: false,
                buttonTitle: 'Sign In',
                errorMessage: action.payload.message,
                currentUser: {}
            };
        }

        // Sign In Action
        case SIGN_IN:
            // If Sign in was successfull
            if (action.payload.success) {
                // save user token in localStorage
                setInStorage('the_main_app', { token: action.payload.token, expires: action.payload.expires });

                // Return States
                return {
                    ...state,
                    serverPayload: action.payload,
                    signedIn: true,
                    buttonTitle: 'Sign Out',
                    errorMessage: '',
                    currentUser: action.payload.userData,
                    openSignInDialog: false
                };
            // Else
            } else {
                // Return States
                return {
                    ...state,
                    serverPayload: action.payload,
                    signedIn: true,
                    errorMessage: action.payload.message,
                    currentUser: action.payload.userData,
                };
            }

        // Verify Session Action
        case VERIFY_SESSION:           
            // If Session is Still Active
            if(action.payload.success) {
                console.log(action.user);
                // Return States with signedIn set to true
                return {
                    ...state,
                    signedIn: true,
                    buttonTitle: 'Sign Out',
                    currentUser: action.user
                };
            // Else
            } else {
                // Return States with signedIn set to false
                return {
                    ...state,
                    signedIn: false,
                    buttonTitle: 'Sign In'
                }
            }

        // Export Initial States By Default
        default:
        return state;
    }
};