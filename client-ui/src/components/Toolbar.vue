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

        <v-btn color="green" to="/profile">
          <v-icon class="mr-2">account_circle</v-icon>
        </v-btn>
        <v-btn color="green" to="/orders">
          <v-icon class="mr-2">shopping_bag</v-icon>
        </v-btn>
        <v-btn color="green" to="/basket">
          <v-icon class="mr-2">shopping_basket</v-icon>
          <p>{{count_basket}}</p> 
        </v-btn>
        <v-btn color="green" v-if="!isLoggedIn" to="/register">
          <v-icon class="mr-2">account_box</v-icon>
          Register
        </v-btn>

        <v-btn color="green" v-if="!isLoggedIn" to="/login">
          <v-icon class="mr-2">fingerprint</v-icon>
          Login
        </v-btn>

        <v-btn color="green" v-if="isLoggedIn" @click="logout">
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
import { mapGetters, mapActions, mapState } from 'vuex';

export default {
  props:{
    snackbarP:{
      type: Boolean,
      required: true,
    }
  },
  data () {
    return {
      
    }
  },
  mounted(){
    this.fetchCountBasket();
  },
  computed:{
    ...mapGetters('authentication', [
      'isLoggedIn',
    ]),
    ...mapState('authentication',[
      'count_basket',
    ]),   
  },
  methods:{
    ...mapActions('authentication', [
      'logout',
      'fetchCountBasket'
    ]),
  }

}
</script>



