const {mapActions} = require("vuex");
export const subjectsMixin = {
    data(){
        return{
            subjects: null,
            subjectsLoading: true,
        }
    },

    methods: {
        isEmpty() {
            return this.subjects === null || this.subjects.length === 0;
        },

        stopLoadingDocuments(delay) {
            setTimeout(() => {
                this.subjectsLoading = false;
            }, delay);
        },

        ...mapActions('subjects', [
            'getAllSubjects'
        ]),
    },
}