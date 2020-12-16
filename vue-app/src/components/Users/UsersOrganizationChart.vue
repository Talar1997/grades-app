<template>
  <OrganizationChart v-model:selectionKeys="selection"
                     class="company"
                     selectionMode="single"
                     v-bind:collapsible="true"
                     v-bind:value="chartData"
                     v-on:node-select="onNodeSelect">
    <template #person="slotProps">
      <div class="node-content">
        <Avatar class="p-mr-2" icon="pi pi-user" shape="circle"/>
        <div>{{ slotProps.node.data.name }}</div>
      </div>
    </template>
    <template #default="slotProps">
      <span>{{ slotProps.node.data.label }}</span>
    </template>
  </OrganizationChart>
</template>

<script>
import Avatar from "primevue/components/avatar/Avatar";
import OrganizationChart from "primevue/components/organizationchart/OrganizationChart";
import {mapGetters} from "vuex";

export default {
  name: "UsersOrganizationChart",

  components: {
    OrganizationChart,
    Avatar
  },

  data() {
    return {
      chartData: {
        key: '0',
        data: {label: 'GradesApp'},
        children: [],
      },
      selection: {},
    }
  },

  props: {
    subjects: {required: true},
    users: {required: true},
  },

  computed: {
    ...mapGetters({
      getOwnedByUser: "subjects/getOwner",
    }),
  },

  methods: {
    clearChartData() {
      this.chartData = {
        key: '0',
        data: {label: 'GradesApp'},
        children: [],
      }
    },

    assignUsersToChart() {
      this.clearChartData();

      this.users.forEach(user => {
        const usersSubjects = this.getOwnedByUser(user._id);
        let childrenSubjects = []
        usersSubjects.forEach(subject => {
          const newChildren = {
            key: subject._id,
            type: 'subject',
            data: {label: subject.name},
            selectable: false,
            styleClass: 'selectable-node'
          }
          childrenSubjects.push(newChildren)
        })

        const owner = {
          key: user._id,
          type: 'person',
          styleClass: 'p-person',
          data: {name: user.name},
          children: childrenSubjects,
        }

        if (owner.children.length !== 0) this.chartData.children.push(owner)
      })
    },

    onNodeSelect(node) {
      if(node.type === 'subject'){
        const id = node.key;
        this.$router.push({ name: 'Subject', params: { id }})
      }
    },
  },

  watch: {
    subjects: function () {
      this.assignUsersToChart()
    },
    users: function () {
      this.assignUsersToChart()
    },
  }
}
</script>

<style>
  .selectable-node{
    cursor: pointer;
  }
</style>