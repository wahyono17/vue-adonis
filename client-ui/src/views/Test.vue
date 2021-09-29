<template>
  <v-sheet elevation="6">
    <v-tabs
      next-icon="mdi-arrow-right-bold-box-outline"
      prev-icon="mdi-arrow-left-bold-box-outline"
      show-arrows
    >
      <v-tabs-slider></v-tabs-slider>
      <v-tab
        class="non-transform"
        v-for="order in orders"
        :key="order.id"
      >
        {{ order.name }} <span><v-chip>{{order.count}}</v-chip></span>
      </v-tab>
    </v-tabs>
  </v-sheet>
</template>

<script>
export default {
  setup() {
    
  },
  data(){
    return {
      orders:[
        {name:"Belum dibayar",count:12},
        {name:"Sudah dibayar",count:12},
        {name:"Konfirmasi",count:20},
      ],
    }
  }
}
</script>
