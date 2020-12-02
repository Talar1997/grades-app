<template>
  <div id="wrapper">
    <div id="page-top"></div>
    <Sidebar></Sidebar>

    <div id="content-wrapper">
      <div id="content">
        <div>
          <slot></slot>
        </div>
      </div>
      <AppFooter></AppFooter>
    </div>
  </div>
</template>

<script>
import AppFooter from './Footer.vue';
import Sidebar from './Sidebar.vue';

export default {
  components: {
    Sidebar,
    AppFooter
  }
}
</script>
