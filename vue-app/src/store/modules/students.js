import {fetchAllStudents} from "@/api/studentsApi";

const state = () => ({
    all: []
})

const getters = {
    getStudents: state => state.all,
}

const actions = {
    async getAllStudents({commit}) {
        await fetchAllStudents().then(result => {
            commit('setStudents', result)
        })
    }
}

const mutations = {
    setStudents(state, students){
        state.all = students;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}