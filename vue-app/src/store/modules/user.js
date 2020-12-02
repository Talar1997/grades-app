import {userService} from '@/utils/user-service';

const state = () => ({
    user: {}
})

const getters = {
    getUser: state => state.user,
    isLoggedIn: state => !!state.user,
    isActive: state => state.user ? state.user.active : false,
}

const actions = {
    async login({commit}, {email, password}) {
        await userService.login(email, password)
            .then((result) => {
                commit('setUser', result.data.user);
            })
            .catch(() => {
                commit('setUser', null)
            });
    },

    async logout({commit}) {
        userService.logout();
        commit('removeUser');
    }
}

const mutations = {
    setUser(state, user) {
        state.user = user
    },

    removeUser(state) {
        state.user = null;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}