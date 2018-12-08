import { ACTION_TYPES } from '../../actions/actionTypes';
import api from '../../api';

export default authReducer = (state = {user: null, password: null}, action) => {
    switch(action.type) {
        case ACTION_TYPES.LOGIN_USER:
            return { user: action.creds.user, password: action.creds.password};
        case ACTION_TYPES.REGISTER_USER:
            return { user: action.creds.user, password: action.creds.password};
        default:
            return state;
    }
};
