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

        <v-tooltip bottom v-if="isLoggedIn">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-if="buyer_seller==1" color="green" to="/products"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon class="mr-2">home</v-icon>
            </v-btn>
          </template>
          <span>Home</span>
        </v-tooltip>

        <v-tooltip bottom v-if="isLoggedIn">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-if="buyer_seller==1 || buyer_seller==2" color="green" to="/profile"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon class="mr-2">account_circle</v-icon>
            </v-btn>
          </template>
          <span>Profile</span>
        </v-tooltip>

        <v-tooltip bottom v-if="isLoggedIn">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-if="buyer_seller == 1" color="green" to="/orders/ready"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon class="mr-2">local_shipping</v-icon>
              <p>{{count_ready}}</p>
            </v-btn>
            </template>
          <span>Siap diambil</span>
        </v-tooltip>

        <v-tooltip bottom v-if="isLoggedIn">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-if="buyer_seller==1 || buyer_seller==2" color="green" to="/orders"
              v-bind="attrs"
              v-on="on"
            >
              <v-icon class="mr-2">shopping_bag</v-icon>
              <p>{{count_orders}}</p>
            </v-btn>
            </template>
          <span>Pesanan</span>
        </v-tooltip>

        <v-tooltip bottom v-if="isLoggedIn">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-if="buyer_seller==1" color="green" to="/basket" class="non-transform"
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
      test:0
    }
  },
  mounted(){
    this.fetchCountBasket();//untuk hitung jumlah basket
    this.fetchCountOrders();
    this.fetchCountReady();
    this.fetchProfile();
  },
  computed:{
    ...mapGetters('authentication', [
      'isLoggedIn',
    ]),
    ...mapState('authentication',[
      'count_basket',
      'count_orders',
      'count_ready',
      'buyer_seller'
    ]),
  },
  methods:{
    ...mapActions('authentication', [
      'logout',
      'fetchCountBasket',
      'fetchCountOrders',
      'fetchCountReady',
      'fetchProfile'
    ]),
  }

}
</script>
<style lang="scss">

</style>



