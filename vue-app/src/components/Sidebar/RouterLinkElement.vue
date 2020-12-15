<template>
  <li class="sidebar-ul-li"
      v-on:click="setActiveRouteElement()">
    <router-link v-bind:id="id"
                 v-bind:ref="id"
                 class="nav-link"
                 v-bind:to='getPath()'>
      <i class="router-icon pi" v-bind:class="icon"></i>
      <span v-if="!name" class="p-text-capitalize router-name">{{ id }}</span>
      <span v-else class="p-text-capitalize router-name">{{ name }}</span>
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
    this.setActiveRouteElement();
  }

}
</script>

<style scoped>
.sidebar-ul-li a {
  display: block;
  color: #000;
  padding: 8px 16px;
  text-decoration: none;
  transition: background-color .15s ease;
}

.sidebar-ul-li a.active {
  background-color: #318c63;
  color: white;
  font-weight: bold;
}

.sidebar-ul-li a:hover:not(.active) {
  background-color: #5ab880;
  color: white;
  transition: background-color .15s ease;
}

.router-icon {
  padding: 6px;
  font-size: 1.3rem;
}

.router-name {
  position: relative;
  bottom: 3px;
}
</style>