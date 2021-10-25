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
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="green" v-if="isLoggedIn" to="/profile"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon class="mr-2">account_circle</v-icon>
            </v-btn>
          </template>
          <span>Profile</span>
        </v-tooltip>  

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="green" v-if="isLoggedIn" to="/orders/ready"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon class="mr-2">local_shipping</v-icon>  
              <p>2</p> 
            </v-btn>
            </template>
          <span>Siap diambil</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="green" v-if="isLoggedIn" to="/orders"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon class="mr-2">shopping_bag</v-icon>  
              <p>{{count_orders}}</p> 
            </v-btn>
            </template>
          <span>Pesanan</span>
        </v-tooltip>

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="green" v-if="isLoggedIn" to="/basket" class="non-transform"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon class="mr-2">shopping_cart</v-icon>
              <p>{{count_basket}}</p> 
            </v-btn>
          </template>
          <span>Keranjang</span>
        </v-tooltip>
        <v-btn color="green" v-if="!isLoggedIn" to="/register">
          <v-icon class="mr-2">account_box</v-icon>
          Register
        </v-btn>
        <v-btn color="green" v-if="!isLoggedIn" to="/login">
          <v-icon class="mr-2">fingerprint</v-icon>
          Login
        </v-btn>
        <v-btn color="green" v-if="isLoggedIn" @click="logout" class="non-transform">
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
    this.fetchCountBasket();//untuk hitung jumlah basket
    this.fetchCountOrders();
  },
  computed:{
    ...mapGetters('authentication', [
      'isLoggedIn',
    ]),
    ...mapState('authentication',[
      'count_basket',
      'count_orders'
    ]),   
  },
  methods:{
    ...mapActions('authentication', [
      'logout',
      'fetchCountBasket',
      'fetchCountOrders',
    ]),
  }

}
</script>
<style lang="scss">
 
</style>



