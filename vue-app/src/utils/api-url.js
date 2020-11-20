export const serverUrl = `${process.env.VUE_APP_TYPE}://${process.env.VUE_APP_ADDR}:${process.env.VUE_APP_PORT}`;
export const apiUrl = '/api/v1';
export const fullUrl = `${serverUrl}${apiUrl}`;

export const environmentType = `${process.env.VUE_APP_ENVIRONMENT}`;
export const requireRecaptcha = `${process.env.VUE_APP_REQUIRE_RECAPTCHA}`;

export const nodesUrl = {
    students: `${fullUrl}/students`,
    subjects: `${fullUrl}/subjects`,
    users: `${fullUrl}/users`,
    login: `${fullUrl}/users/login`,
    logout: `${fullUrl}/users/logout`,
    tokenValidation: `${fullUrl}/users/validate`
};