import {fetchAllStudents} from "@/api/studentsApi";

const state = () => ({
    all: [],
    studentsFromSubject: []
})

const getters = {
    getStudents: state => state.all,
    getFromSubject: state => () => state.studentsFromSubject,
}

const actions = {
    async getAllStudents({commit}) {
        await fetchAllStudents().then(result => {
            commit('setStudents', result)
        })
    },

    async getStudentsFromSubject({commit}, subjectId){
        await fetchAllStudents({subject: subjectId}).then(result => {
            commit('setStudentsFromSubject', result)
        })

    }
}

const mutations = {
    setStudents(state, students){
        state.all = students
    },

    setStudentsFromSubject(state, students){
        state.studentsFromSubject = students
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}