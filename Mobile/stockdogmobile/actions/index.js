import { ACTION_TYPES } from './actionTypes';

export function loginUser(username, password) {
    var creds = {user: username, password: password};
    return { creds, type: ACTION_TYPES.LOGIN_USER };
};