import {validateUserToken} from "@/api/usersApi"

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
    let user = getUser()
    let userRole = user.data.user.role
    return userRole === role
}

async function validateTokenOnServer() {
    if (getUser()) {
        let status = await validateUserToken()
            .then(response => {
                return response.status
            })
            .catch(error => {
                console.log(error)
            })
        return status.valid
    }
}

function validateTokenTimestamp() {
    let user = getUser()
    if (user) return new Date(user.expires) > new Date()
    else return false
}

function getUser() {
    return JSON.parse(localStorage.getItem('user'))
}