import {nodesUrl} from "@/utils/api-url";
import {deleteData, fetchData, fetchIdentifiedData, patchData, postData} from "./dataFetchApi";

const endpointUrl = nodesUrl.subjects;

export const fetchAllSubjects = (params = null) => fetchData(endpointUrl, params);
export const postSubject = (object) => postData(endpointUrl, object);
export const patchSubject = (id, object, resolve, reject) => patchData(endpointUrl, id, object, resolve, reject);
export const fetchSubjectById = (id) => fetchIdentifiedData(endpointUrl, id);
export const deleteSubjectById = (id) => deleteData(endpointUrl, id);