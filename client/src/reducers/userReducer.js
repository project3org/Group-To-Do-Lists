// Import Local Dependencies
import { setInStorage } from '../utils/storage';

// Import action types
import { 
    SIGN_IN, 
    SIGN_OUT,
    OPEN_SIGNIN_DIALOG,
    OPEN_SIGNUP_DIALOG, 
    CLOSE_DIALOGS, 
    VERIFY_SESSION 
} from '../actions/types';

// Set Initial States
const initialState = {
    serverPayload: {},
    openSignInDialog: false,
    openSignUpDialog: false,
    errorMessage: '',
    signedIn: false,
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

        // Close Dialogs Action
        case CLOSE_DIALOGS:
            // Return States
            return {
                ...state,
                openSignInDialog: false,
                openSignUpDialog: false
            };

        // Sign Out Action
        case SIGN_OUT:
            // Return States
            return {
                ...state,
                signedIn: false,
                errorMessage: action.payload.message,
                currentUser: {}
            };

        // Sign In Action
        case SIGN_IN:
            // If Sign in was successfull
            if (action.payload.success) {
                // save user token in localStorage
                setInStorage('the_main_app', { token: this.props.serverPayload.token, expires: this.props.serverPayload.expires });

                // Return States
                return {
                    ...state,
                    serverPayload: action.payload,
                    signedIn: true,
                    errorMessage: action.payload.message,
                    currentUser: action.payload.userData,
                    openSignIn: false
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
                // Return States with signedIn set to true
                return {
                    ...state,
                    signedIn: true
                };
            // Else
            } else {
                // Return States with signedIn set to false
                return {
                    ...state,
                    signedIn: false
                }
            }

        // Export Initial States By Default
        default:
        return state;
    }
};