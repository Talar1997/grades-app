import {fetchAllSubjects} from '@/api/subjectsApi';

const state = () => ({
    all: []
})

const getters = {
    getAll: state => state.all,
}

const actions = {
    async getAllSubjects({commit}) {
        await fetchAllSubjects().then(result => {
            commit('setSubjects', result);
        })
    }
}

const mutations = {
    setSubjects(state, subjects) {
        state.all = subjects
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}