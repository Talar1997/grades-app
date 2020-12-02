import { createStore, createLogger } from 'vuex'
import subjects from "@/store/modules/subjects";
import user from "@/store/modules/user";

const debug = process.env.NODE_ENV !== 'production'

export default createStore({
    modules: {
        subjects,
        user,
    },
    strict: debug,
    plugins: debug ? [createLogger()] : []
})