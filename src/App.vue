<template>
  <v-app id="inspire">
    <Sidebar :drawer="drawer" />
    
    <v-main style="background: #f5f5f540">
      <v-container class="py-8 px-6" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "./components/Sidebar";

export default {
  name: "App",
  components: { 
    Sidebar,
    },
  data: () => ({

  }),
  methods: {},
};
</script>
