export const notificationMixin = {
    methods: {
        testFunction(){
          console.log('test')
        },

        pushSuccess(title, details, severity='success'){
            this.pushNotification(title, details, severity)
        },

        pushError(title, details, severity='error'){
            this.pushNotification(title, details, severity)
        },

        pushInfo(title, details, severity='info'){
            this.pushNotification(title, details, severity)
        },

        pushNotification(title, details, severity, life = 5000){
            this.$toast.add({
                severity: severity,
                summary: title,
                detail: details,
                life: life});
        }
    },
}