import moment from 'moment'

export const dateMixin = {
    methods: {
        toClearDate(date) {
            let newDate = moment(new Date(date))
            return newDate.format('DD/MM/YYYY')
        },

        toClearHour(date) {
            let newDate = moment(new Date(date))
            newDate.add(-1, 'h')
            return newDate.format('HH:mm')
        },

        toClearDayName(date) {
            let newDate = new Date(date)
            const days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota']
            return days[newDate.getDay()] + ", godzina: " + this.toClearHour(date)
        },

        compareDates(date1, date2){
            const compareDateFormat = 'DDMMYYYY'
            return moment(date1).format(compareDateFormat) === moment(date2).format(compareDateFormat)
        },

        computeDate(week, subject) {
            let subjectDate = moment(new Date(subject))
            const weeks = (week - 1) * 7;
            subjectDate.add(weeks, 'd')
            return subjectDate;
        },
    },
}