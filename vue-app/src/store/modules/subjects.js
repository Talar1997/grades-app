import {fetchAllSubjects} from '@/api/subjectsApi';

const state = () => ({
    all: []
})

const getters = {
    getAll: state => state.all,
    getOwner: (state) => (id) => state.all.filter(el => el.owner._id === id)
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
        state.all = subjects.sort((x, y) => Number(x.active) - Number(y.active))
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}