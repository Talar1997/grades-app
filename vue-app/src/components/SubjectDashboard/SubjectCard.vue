<template>
  <router-link :to="{ name: 'Subject', params: { id: subject._id  }}" style="text-decoration: none">
    <BlockUI v-bind:blocked="!subject.active"
             v-on:mouseover="isHovering = true"
             v-on:mouseout="isHovering = false">
      <Card class="grades-card"
            v-bind:key="subject._id"
            v-bind:class="{'p-shadow-3': isHovering}">
        <template #header>
        </template>
        <template #title>
          <span v-if="!subject.active" class="p-tag p-tag-danger">Nieaktywny</span> {{ subject.name }}
        </template>
        <template #subtitle>
          {{ subject.owner.name }}
        </template>
        <template #content>
          <div>
            Pierwsze zajęcia: {{ toClearDate(subject.date) }} <br>
            Występowanie: {{ toClearDayName(subject.date) }}
          </div>

        </template>
        <template #footer>
          <router-link :to="{ name: 'Subject', params: { id: subject._id  }}" class="float-right">
            <Button icon="pi pi-arrow-right" class="p-button-text p-button-primary"/>
          </router-link>
          <div class="clear-both"></div>
        </template>
      </Card>
    </BlockUI>
  </router-link>
</template>

<script>
import Card from "primevue/components/card/Card";
import Button from "primevue/components/button/Button";
import BlockUI from 'primevue/blockui';


export default {
  name: "SubjectCard",

  components: {
    Card,
    Button,
    BlockUI
  },

  data() {
    return {
      isHovering: false,
    }
  },

  props: {
    subject: null,
  },

  methods: {
    toClearDate(date) {
      let newDate = new Date(date);
      return `${newDate.getDate()}/${newDate.getUTCMonth() + 1}/${newDate.getFullYear()}`
    },

    toClearHour(date) {
      let newDate = new Date(date);
      let minutes = newDate.getUTCMinutes()
      let minutesString = minutes < 10 ? `0${minutes}` : minutes;
      return `${newDate.getUTCHours()}:${minutesString}`
    },

    toClearDayName(date) {
      let newDate = new Date(date);
      var days = ['Niedziela', 'Poniedziałek', 'Wtorek', 'Środa', 'Czwartek', 'Piątek', 'Sobota'];
      return days[newDate.getDay()] + ", godzina: " + this.toClearHour(date);
    },
  }
}
</script>

<style scoped>
@import "../../assets/css/cards.css";
</style>