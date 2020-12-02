<template>
  <ul>
    <li
        v-for="subject in subjects"
        :key="subject._id">
      {{subject.name}} - {{subject.owner.email}}
    </li>
  </ul>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'


export default {
  name: 'DataTest',
  data(){
    return{
      test: null,
    }
  },
  computed: {
    ...mapState({
      subjects: state => state.subjects.all
    }),
    ...mapGetters({
      getAll: 'subjects/getAll',
    }),
  },

  methods: {
    ...mapActions('subjects', [
      'getAllSubjects'
    ]),

  },
  created () {
    this.$store.dispatch('subjects/getAllSubjects')
  }
}
</script>

<style>

</style>
