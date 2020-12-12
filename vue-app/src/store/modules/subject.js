import {deleteSubjectById, fetchSubjectById, patchSubject} from "@/api/subjectsApi";

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

    async removeSubject({commit}, id) {
        await deleteSubjectById(id)
            .then(() => {
                commit('setSubject', null)
            })
    },

    async updateSubject({commit}, id, object) {
        await patchSubject(id, object)
            .then(result => {
              commit('setSubject', result.doc)
            })
    }
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