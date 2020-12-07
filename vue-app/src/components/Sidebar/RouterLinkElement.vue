<template>
  <li class="sidebar-ul-li"
      v-on:click="setActiveRouteElement()">
    <!-- TODO: poprawić wygląd sidebara: znaleźć lepszą czcionke, ustawić ikonki tak żeby nie były za blisko -->
    <router-link v-bind:id="id"
                 v-bind:ref="id"
                 class="nav-link"
                 v-bind:to='getPath()'>
      <i class="pi" v-bind:class="icon"></i>
      <span v-if="!name" class="p-text-capitalize">{{ id }}</span>
      <span v-else class="p-text-capitalize">{{ name }}</span>
    </router-link>
  </li>

</template>

<script>
export default {
  name: "RouterLinkElement",
  props: {
    id: {
      type: String,
      required: true,
    },

    icon: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: false,
    },
    restricted: {
      type: String,
      required: false,
    }
  },
  methods: {
    getPath() {
      return `/${this.$props['id']}`
    },

    setActiveRouteElement() {
      let routeName = this.$router.currentRoute.value.name.toLowerCase();
      routeName = !routeName ? 'dashboard' : routeName;

      let selector = this.$refs[routeName] ? this.$refs[routeName].$el : null;
      if (selector) selector.classList.add("active");
    }

  },

  mounted() {
    setTimeout(() => {
      this.setActiveRouteElement();
    }, 150);
  }

}
</script>

<style scoped>
.sidebar-ul-li a {
  display: block;
  color: #000;
  padding: 8px 16px;
  text-decoration: none;
}

.sidebar-ul-li a.active {
  background-color: #50a3a2;
  color: white;
}

.sidebar-ul-li a:hover:not(.active) {
  background-color: #555;
  color: white;
}
</style>