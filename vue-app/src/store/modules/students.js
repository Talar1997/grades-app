import {deleteStudentById, fetchAllStudents, patchStudent, postStudent} from "@/api/studentsApi";

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

    async getStudentsFromSubject({commit}, subjectId) {
        await fetchAllStudents({subject: subjectId}).then(result => {
            commit('setStudentsFromSubject', result)
        })
    },

    async createNewStudent({commit}, student) {
        await postStudent(student).then(result => {
            commit('pushNewStudent', result.doc)
        })
    },

    async removeStudent({commit}, id) {
        await deleteStudentById(id).then(() => {
            commit('removeOneFromSubject', id)
        })
    },

    async updateOne({commit}, student) {
        await patchStudent(student._id, student).then(result => {
            commit('updateOneStudent', result)
        })
    }
}

const mutations = {
    setStudents(state, students) {
        state.all = students
    },

    setStudentsFromSubject(state, students) {
        state.studentsFromSubject = students
    },

    pushNewStudent(state, student) {
        state.all.push(student)
        state.studentsFromSubject.push(student)
    },

    updateOneStudent(state, student) {
        let updateIndex = state.studentsFromSubject.map(student => student._id).indexOf(student._id)
        state.studentsFromSubject[updateIndex] = student
    },

    removeOneFromSubject(state, id) {
        let removeIndex = state.studentsFromSubject.map(student => student._id).indexOf(id)
        state.studentsFromSubject.splice(removeIndex, 1)
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}