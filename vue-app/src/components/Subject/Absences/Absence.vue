<template>
  <div>
    <Tag class="grade-tag pointer"
         v-bind:severity="computeSeverity()"
         v-on:click="editAbsence()">
      {{ computeValue() }}
    </Tag>
  </div>
</template>

<script>
import Tag from "primevue/components/tag/Tag";

export default {
  name: "Absence",

  props: {
    absence: {required: true},
    student: {required: true}
  },

  components: {
    Tag
  },

  methods: {
    editAbsence() {
      this.emitter.emit('edit-absence-modal-open', {absence: this.absence, student: this.student})
    },

    computeSeverity() {
      if (this.absence.isJustified && !this.absence.isAbsence) return 'success'
      if (!this.absence.isAbsence) return 'danger'
      else return 'primary'
    },

    computeValue() {
      if (!this.absence.isAbsence) return '-'
      else return '+'
    }
  },

}
</script>

<style scoped>

</style>