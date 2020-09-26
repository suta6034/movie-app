import {LOGIN_USER, REGISTER_USER, AUTH_USER} from '../_actions/types'

export default (prevState={}, action) =>{
    switch(action.type){
        case LOGIN_USER :
            return {...prevState,loginResponse: action.payload};
        case REGISTER_USER :
            return {...prevState,registerResponse: action.payload};
        case AUTH_USER :
            return {...prevState,authCheckResponse: action.payload};
        default :
            return prevState;
    }
}