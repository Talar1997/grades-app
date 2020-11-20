import {nodesUrl} from "@/utils/api-url";
import {fetchData, fetchIdentifiedData, patchData, postData} from "./dataFetchApi";

const endpointUrl = nodesUrl.students;

export const fetchAllStudents = (params = null) => fetchData(endpointUrl, params);
export const postStudent = (object) => postData(endpointUrl, object);
export const patchStudent = (id, object, resolve, reject) => patchData(endpointUrl, id, object, resolve, reject);
export const fetchStudentById = (id) => fetchIdentifiedData(endpointUrl, id);