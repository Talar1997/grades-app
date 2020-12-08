import {fetchAllUsers} from "@/api/usersApi";

const state = () => ({
    all: []
})

const getters = {
    getUsers: state => state.all,
}

const actions = {
    async getAllUsers({commit}) {
        await fetchAllUsers().then(result => {
            commit('setUsers', result)
        })
    }
}

const mutations = {
    setUsers(state, users) {
        state.all = users
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}