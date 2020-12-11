import {fetchSubjectById} from "@/api/subjectsApi";

const state = () => ({
    subject: {}
})

const getters = {
    getSubject: state => () => state.subject,
}

const actions = {
    async getSubjectById({commit}, id) {
        await fetchSubjectById(id)
            .then(result => {
                commit('setSubject', result)
            })
    },
}

const mutations = {
    setSubject(state, subject) {
        state.subject = subject
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}