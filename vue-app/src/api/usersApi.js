import {nodesUrl} from "../utils/api-url";
import {deleteData, fetchData, fetchIdentifiedData, patchData, postData} from "./dataFetchApi";

const endpointUrl = nodesUrl.users;
const tokenValidationUrl = nodesUrl.tokenValidation;

export const fetchAllUsers = (params = null) => fetchData(endpointUrl, params);
export const fetchUserById = (id) => fetchIdentifiedData(endpointUrl, id);
export const postUser = (object) => postData(endpointUrl, object);
export const patchUser = (id, object, resolve, reject) => patchData(endpointUrl, id, object, resolve, reject);
export const removeUser = (id, resolve, reject) => deleteData(endpointUrl, id, resolve, reject);
export const validateUserToken = () => fetchData(tokenValidationUrl);