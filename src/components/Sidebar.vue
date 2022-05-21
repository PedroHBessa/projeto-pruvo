<template>
  <v-navigation-drawer v-model="drawer" app>
    <v-divider></v-divider>
    <v-list>
      <v-list-item v-for="[icon, text, link] in links" :key="icon" link :to="link">
          <v-list-item-icon>
            <v-icon>{{ icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ text }}</v-list-item-title>
          </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: "Sidebar",
  props: ["drawer"],
  data() {
    return {
      links: [
        ["mdi-account", "Alunos", "/"],
        ["mdi-book-open-outline", "Matérias", "/materias"],
        ["mdi-clipboard-outline", "Provas", "/provas"],
      ],
    };
  },
};
</script>

<style scoped></style>
