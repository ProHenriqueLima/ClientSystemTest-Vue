<template>
  <v-app>
    <page-router></page-router>
  </v-app>
</template>

<script>
import PageRouter from "./components/PageRouter.vue";
export default {
  name: "App",
  components: { PageRouter },
};
</script>
