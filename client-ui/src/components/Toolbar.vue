<template>
  <v-card
    color="grey lighten-4"
    flat
    height="200px"
    tile
  >
    <v-toolbar color="green" dark fixed>
      <v-toolbar-title>Title</v-toolbar-title>
      <v-spacer></v-spacer>

      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat color="green">
          <v-icon>account_box</v-icon>
          Register
        </v-btn>
        <v-btn flat color="green">
          <v-icon>fingerprint</v-icon>
          Login
        </v-btn>
        <v-btn flat color="green">
          <v-icon>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-toolbar>
  </v-card>
</template>

<script>
export default {
  data () {
      return {

      }
  },
  computed:{

  },
  methods:{

  }

}
</script>

