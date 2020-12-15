import {createLogger, createStore} from 'vuex'
import subjects from "@/store/modules/subjects";
import user from "@/store/modules/user";
import students from "@/store/modules/students";
import users from "@/store/modules/users";
import subject from "@/store/modules/subject";

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        subjects,
        user,
        users,
        students,
        subject,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})