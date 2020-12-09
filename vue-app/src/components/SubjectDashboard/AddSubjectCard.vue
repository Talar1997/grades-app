<template>
  <div>
    <Card class="grades-card-add" v-on:click="openNew()">
      <template #content>
        <div class="add-wrapper">
          <div class="icon-wrapper">
            <i class="pi pi-plus-circle add-icon"></i>
          </div>
        </div>
      </template>
    </Card>
    <AddSubjectModal v-model:subjectDialog="subjectDialog"></AddSubjectModal>
  </div>
</template>

<script>
import Card from "primevue/components/card/Card";
import AddSubjectModal from "@/components/SubjectDashboard/AddSubjectModal";

export default {
  name: "AddSubjectCard",
  components: {
    Card,
    AddSubjectModal,
  },
  data() {
    return {
      subjectDialog: false,
    }
  },
  methods: {
    openNew() {
      this.subjectDialog = true;
      this.emitter.emit("toggle-add-subject-modal", this.subjectDialog);
    },
  },
}
</script>

<style scoped>
@import "../../assets/css/cards.css";
</style>