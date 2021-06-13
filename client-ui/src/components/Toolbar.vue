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

      <v-toolbar-items>
        <v-btn flat color="green" v-if="!isLoggedIn" to="/register">
          <v-icon class="mr-2">account_box</v-icon>
          Register
        </v-btn>

        <v-btn flat color="green" v-if="!isLoggedIn" to="/login">
          <v-icon class="mr-2">fingerprint</v-icon>
          Login
        </v-btn>

        <v-btn flat color="green" v-if="isLoggedIn" @click="logout">
          <v-icon class="mr-2">exit_to_app</v-icon>
          Logout
        </v-btn>


      </v-toolbar-items>
    </v-app-bar>

    <v-sheet
    >
      <v-container style="height: 50px;">
      </v-container>
    </v-sheet>
  </v-card>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  data () {
      return {

      }
  },
  computed:{
    ...mapGetters('authentication', [
      'isLoggedIn',
    ]),
  },
  methods:{
    ...mapActions('authentication', [
      'logout',
    ]),
  }

}
</script>

