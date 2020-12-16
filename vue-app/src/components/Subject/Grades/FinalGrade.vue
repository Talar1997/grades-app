<template>
  <div>
    <Skeleton v-if="loading" width="50%" height="1.5rem"/>
    <span v-else class="p-text-bold">
      {{ finalGrade.toFixed(2) }}
      <span v-if="specialTreatment"
            v-tooltip="'Ponieważ student posiada 100% obecności, jego najniższa ocena nie została wliczona do średniej'">*
      </span>
    </span>
  </div>
</template>

<script>
import Skeleton from "primevue/components/skeleton/Skeleton";
import Tooltip from 'primevue/tooltip';

export default {
  name: "FinalGrade",

  components: {
    Skeleton
  },

  directives: {
    'tooltip': Tooltip
  },

  props: {
    student: {required: true}
  },

  data() {
    return {
      haveAnyAbsence: false,
      finalGrade: 0,
      loading: true,
      specialTreatment: false,
    }
  },

  methods: {
    haveAnyAbsences() {
      return this.student.absences.length !== 0
    },

    findLessValuable() {
      if(!this.haveAnyAbsences() && this.student.grades.length > 2) {
        const grades = [...this.student.grades]

        grades.sort((a, b) => {
          return (a.grade * a.severity) - (b.grade * b.severity)
        })

        return grades[0]._id
      }
      return null;
    },

    //Jeżeli student ma 100% obecność na zajęciach anuluje się jedną kartkówkę z której miał najsłabszą ocenę.
    computeFinalGrade() {
      let sumOfSeverity = 0
      let sumOfGradesTimesSeverity = 0
      let lessValuable = this.findLessValuable()

      if (this.student.grades.length !== 0) {
        this.student.grades.forEach(grade => {
          if(lessValuable && lessValuable === grade._id){
            sumOfSeverity += 0
            sumOfGradesTimesSeverity += 0
            this.specialTreatment = true
          }
          else{
            sumOfSeverity += grade.severity
            sumOfGradesTimesSeverity += (grade.severity * grade.grade)
          }
        })

        this.finalGrade = sumOfGradesTimesSeverity / sumOfSeverity;
        this.loading = false
      } else {
        this.loading = false
        this.finalGrade = 0
      }
    }
  },

  mounted() {
    this.computeFinalGrade()
  },

  created() {
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === 'students/updateOneStudent') {
        this.loading = true
        setTimeout(() => {
          this.computeFinalGrade()
        }, 150)
      }
    });
  },

  beforeUnmount() {
    this.unsubscribe();
  },
}
</script>

<style scoped>
@import "../../../assets/css/grades.css";
</style>