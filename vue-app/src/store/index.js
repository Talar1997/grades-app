import { createStore, createLogger } from 'vuex'
import subjects from "@/store/modules/subjects";
import user from "@/store/modules/user";
import students from "@/store/modules/students";
import users from "@/store/modules/users";

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        subjects,
        user,
        users,
        students
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})