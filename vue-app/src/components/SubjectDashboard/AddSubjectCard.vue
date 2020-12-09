<template>
  <div>
    <Card class="grades-card-add"
          v-on:click="openNew()"
          v-on:mouseover="isHovering = true"
          v-on:mouseout="isHovering = false">
      <template #content>
        <div class="add-wrapper">
          <div class="icon-wrapper">
            <i class="pi pi-plus-circle add-icon"
               v-bind:class="{'rotate-icon': isHovering}"></i>
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
      isHovering: false,
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