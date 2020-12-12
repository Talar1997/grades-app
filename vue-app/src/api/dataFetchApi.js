import axios from "axios";

export async function fetchData(nodeUrl, params = null) {
    return axios
        .get(nodeUrl, {params: params})
        .then(response => {
            if (response.status === 200) return Promise.resolve(response.data.data);
            else {
                return Promise.reject("Cannot get data from node: " + (nodeUrl) + response.status);
            }
        })
        .catch(error => {
            if (error.response) return Promise.reject(error.response);
            else return Promise.reject(error);
        })
}

export async function fetchIdentifiedData(nodeUrl, id) {
    return axios
        .get(nodeUrl + "/" + id)
        .then(response => {
            if (response.status === 200) return Promise.resolve(response.data.data);
            else {
                return Promise.reject("Cannot get data from node: " + (nodeUrl + "/" + id) + response.status);
            }
        })
        .catch(error => {
            if (error.response) return Promise.reject(error.response);
            else return Promise.reject(error);
        })
}


export async function postData(nodeUrl, object) {
    return axios
        .post(nodeUrl, object)
        .then(response => {
            if (response.status === 201) return Promise.resolve(response.data.data);
            else return Promise.reject()
        })
        .catch(error => {
            if (error.response) return Promise.reject(error.response);
            else return Promise.reject(error);
        })
}


export async function patchData(nodeUrl, id, object, resolveFn = null, rejectFn = null) {
    return axios
        .patch(nodeUrl + "/" + id, object)
        .then(response => {
            if (response.status === 200) {
                if (resolveFn) resolveFn();
                return Promise.resolve(response.data.data.doc);
            } else {
                if (rejectFn) rejectFn();
                return Promise.reject(response.status)
            }
        })
        .catch(error => {
            if (error.response) return Promise.reject(error.response);
            else return Promise.reject(error);
        })
}

export async function deleteData(nodeUrl, id) {
    return axios
        .delete(nodeUrl + "/" + id)
        .then(response => {
            if (response.status === 204) {
                //resolve();
                return Promise.resolve(response.data.data);
            } else {
                //reject();
                return Promise.reject(response.status)
            }
        })
        .catch(error => {
            //reject();
            if (error.response) return Promise.reject(error.response);
            else return Promise.reject(error);
        })
}
