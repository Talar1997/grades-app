export const notificationMixin = {
    methods: {
        confirmAction(event, acceptAction, rejectAction) {
            this.$confirm.require({
                target: event.currentTarget,
                message: 'Czy na pewno chcesz wykonać daną akcję?',
                acceptLabel: "Tak",
                rejectLabel: "Nie",
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    if (typeof acceptAction === "function") acceptAction();
                },
                reject: () => {
                    if (typeof rejectAction === "function") rejectAction();
                }
            });
        },

        confirmActionWithArg(event, data, acceptAction, rejectAction) {
            this.$confirm.require({
                target: event.currentTarget,
                message: 'Czy na pewno chcesz wykonać daną akcję?',
                acceptLabel: "Tak",
                rejectLabel: "Nie",
                icon: 'pi pi-exclamation-triangle',
                accept: () => {
                    if (typeof acceptAction === "function") acceptAction(data);
                },
                reject: () => {
                    if (typeof rejectAction === "function") rejectAction();
                }
            });
        },

        pushSuccess(title, details, severity = 'success') {
            this.pushNotification(title, details, severity)
        },

        pushError(title, details, severity = 'error') {
            this.pushNotification(title, details, severity)
        },

        pushInfo(title, details, severity = 'info') {
            this.pushNotification(title, details, severity)
        },

        pushNotification(title, details, severity, life = 5000) {
            this.$toast.add({
                severity: severity,
                summary: title,
                detail: details,
                life: life
            });
        }
    },
}