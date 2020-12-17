<template>
  <router-link :to="{ name: 'Subject', params: { id: subject._id  }}" style="text-decoration: none">
    <BlockUI v-bind:blocked="!subject.active"
             v-on:mouseout="isHovering = false"
             v-on:mouseover="isHovering = true">
      <Card v-bind:key="subject._id"
            class="grades-card"
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
            <Button class="p-button-text p-button-primary" icon="pi pi-arrow-right"/>
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
import {dateMixin} from "@/mixins/dateMixin";


export default {
  name: "SubjectCard",

  components: {
    Card,
    Button,
    BlockUI
  },

  mixins:[
    dateMixin
  ],

  data() {
    return {
      isHovering: false,
    }
  },

  props: {
    subject: null,
  },

}
</script>

<style scoped>
@import "../../assets/css/cards.css";
</style>