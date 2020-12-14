<template>
  <div class="p-grid p-fluid">
    <div class="p-col-12 p-md-3">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon">
            <i class="pi pi-user"></i>
        </span>
        <InputText placeholder="Nazwa przedmiotu" v-model="updatedSubject.name"/>
      </div>
    </div>

    <div class="p-col-12 p-md-3">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon"><i class="pi pi-calendar"></i></span>

        <Calendar id="date"
                  v-model="updatedSubject.date"
                  v-bind:inline="false"/>
      </div>
    </div>

    <div class="p-col-12 p-md-3">
      <div class="p-inputgroup">
        <span class="p-inputgroup-addon"><i class="pi pi-clock"></i> </span>

        <Calendar id="time"
                  v-model="updatedSubject.hours"
                  v-bind:showTime="true"
                  v-bind:timeOnly="true"
                  v-bind:inline="false"/>
      </div>
    </div>

    <div class="p-col-12 p-md-3">
      <div class="p-inputgroup">

        <SelectButton v-bind:options="selectOptions" optionLabel="name" optionValue="value"
                      v-model="updatedSubject.active" style="width: 100%">
        </SelectButton>
      </div>
    </div>

    <div class="p-col-12 p-md-4">
      <div class="p-inputgroup">
        <Button v-on:click="confirmAction($event, updateSubject)" icon="pi pi-check" label="Zapisz zmiany"
                class="p-button-outlined"></Button>
        <Button v-on:click="confirmAction($event, deleteSubject)" icon="pi pi-times"
                class="p-button-danger p-ml-2 p-button-outlined"
                label="Usuń przedmiot"></Button>
      </div>
    </div>
    <ConfirmPopup></ConfirmPopup>
  </div>
</template>

<script>
import {notificationMixin} from "@/mixins/notoficationMixin";
import InputText from "primevue/components/inputtext/InputText";
import Button from "primevue/components/button/Button";
import SelectButton from "primevue/components/selectbutton/SelectButton";
import ConfirmPopup from "primevue/components/confirmpopup/ConfirmPopup";
import {mapActions} from "vuex";
import Calendar from "primevue/components/calendar/Calendar";

export default {
  name: "SubjectEditForm",

  props: {
    subject: {required: true},
    students: {required: true}
  },

  components: {
    InputText,
    Button,
    SelectButton,
    ConfirmPopup,
    Calendar
  },

  mixins: [
    notificationMixin
  ],

  data(){
    return{
      updatedSubject: {},
      selectOptions: [
        {name: 'Aktywny', value: true},
        {name: 'Nieaktywny', value: false},
      ],
    }
  },

  methods:{
    ...mapActions({
      removeSubject: "subject/removeSubject",
      updateStoreSubject: 'subject/updateSubject',
    }),

    updateSubject() {
      this.updatedSubject.date.setHours(this.updatedSubject.hours.getHours() + 1)
      this.updatedSubject.date.setMinutes(this.updatedSubject.hours.getMinutes())
      const patchedObject = {
        id: this.subject._id,
        name: this.updatedSubject.name,
        date: this.updatedSubject.date,
        active: this.updatedSubject.active,
      }

      //TODO: zrobić, żeby mutacja nazwy była widoczna bez odświeżania strony
      this.updateStoreSubject(patchedObject)
          .then(() => {
            this.pushSuccess("Sukces", "Pomyślnie edytowano przedmiot. Niektóre zmiany mogą być widoczne dopiero po odświezeniu strony")
          })
          .catch(() => {
            this.pushError("Błąd", "Coś poszło nie tak.")
          })
    },

    deleteSubject() {
      if (this.students.length !== 0) {
        this.pushError("Błąd", "Nie można usunąć przedmiotu jeżeli znajdują się w nim studenci")
      } else {
        this.removeSubject(this.subject._id)
            .then(() => {
              this.pushSuccess("Sukces", "Pomyślnie usunięto przedmiot")
              this.$router.push("/dashboard")
            })
      }
    },
  },

  watch: {
    subject(newValue, oldValue) {
      console.log(oldValue)

      this.updatedSubject.name = newValue.name;
      this.updatedSubject.date = new Date(newValue.date)
      this.updatedSubject.hours = new Date(newValue.date)
      this.updatedSubject.hours.setHours(this.updatedSubject.hours.getHours() - 1)

      this.updatedSubject.active = newValue.active
    }
  }
}
</script>

<style scoped>

</style>