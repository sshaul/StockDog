import { ACTION_TYPES } from '../actions/actionTypes';

export default loginReducer = (state = {user: null, password: null}, action) => {
    switch(action.type) {
        case ACTION_TYPES.LOGIN_USER:
            return { user: action.creds.user, password: action.creds.password};
        default:
            return state;
    }
};
