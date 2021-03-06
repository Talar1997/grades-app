export const gradesMixin = {
    data(){
        return{
            categories: [
                "Sprawdzian",
                "Kartkówka",
                "Kolokwium",
                "Odpowiedź ustna",
            ],
            grades: [2, 2.5, 3, 3.5, 4, 4.5, 5],
            severity: {
                min: 5,
                max: 100,
                step: 5
            },
        }
    },

    methods: {
        countSeverity(severity) {
            if (this.isBetween(severity, 0, 20)) return 'primary'
            if (this.isBetween(severity, 21, 40)) return 'success'
            if (this.isBetween(severity, 41, 60)) return 'info'
            if (this.isBetween(severity, 61, 80)) return 'warning'
            else return 'danger'
        },

        isBetween(num, min, max) {
            return num >= min && num <= max;
        }
    },
}