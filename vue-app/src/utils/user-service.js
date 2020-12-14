import axios from 'axios';
import {nodesUrl} from './api-url';

export const userService = {
    login,
    logout
};

function login(email, password) {
    return axios
        .post(nodesUrl.login, {
            email: email,
            password: password,
        })
        .then(response => {
            if (response.status === 401) {
                logout();
                return Promise.reject();
            } else if (response.status === 200) {
                let user = response.data;
                localStorage.setItem('user', JSON.stringify(user));
                return user;
            }
        })
}

function logout() {
    axios.get(nodesUrl.logout).then(() => {
        localStorage.removeItem('user');
    });
}
