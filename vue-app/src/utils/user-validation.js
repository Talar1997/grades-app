import axios from "axios";
import {nodesUrl} from "./api-url";

export const userValidator = {
    isUserLoggedIn,
    isUserInRole,
    validateTokenOnServer,
    validateTokenTimestamp,
};

function isUserLoggedIn() {
    return getUser()
}

export function isUserInRole(role) {
    let user = getUser();
    let userRole = user.data.user.role;
    return userRole === role;
}

// TODO: replace axios with proper dataFetchApi function
async function validateTokenOnServer() {
    if (getUser()) {
        let status = await axios
            .get(nodesUrl.tokenValidation)
            .then(response => {
                return response.data;
            })
            .catch(err => {
                console.log(err)
            });
        return status.valid;
    }
}

// TODO: date.now - ms, server returns seconds timestamp
function validateTokenTimestamp() {
    /*let user = getUser();
    let currentTimestamp = Date.now();
    return user.expires > currentTimestamp;*/
    return true
}

function getUser() {
    return JSON.parse(localStorage.getItem('user'));
}