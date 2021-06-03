<template>
  <v-card class="overflow-hidden"
    color="grey lighten-4"
    flat
    tile
  >
    <v-app-bar
      color="green"
      dark fixed
    >

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>account_box</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>fingerprint</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>exit_to_app</v-icon>
      </v-btn>
    </v-app-bar>
    <v-sheet
    >
      <v-container style="height: 50px;">
      </v-container>
    </v-sheet>
  </v-card>
</template>