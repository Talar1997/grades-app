import {fetchAllSubjects, postSubject} from '@/api/subjectsApi';

const state = () => ({
    all: [],
})

const getters = {
    getAll: state => state.all,
    getOwner: (state) => (id) => state.all.filter(el => el.owner._id === id)
}

const actions = {
    async getAllSubjects({commit}) {
        await fetchAllSubjects().then(result => {
            commit('setSubjects', result)
        })
    },

    async createNewSubject({commit}, subject){
        await postSubject(subject)
            .then(result => {
                const newDocument = result.doc
                commit('pushSubject', newDocument)
            })
    }
}

const mutations = {
    setSubjects(state, subjects) {
        state.all = subjects.sort((x, y) => Number(y.active) - Number(x.active))
    },

    pushSubject(state, subject){
        state.all.push(subject)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}