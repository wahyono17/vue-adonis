<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"      
      width="500"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="red lighten-2"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Click Me
        </v-btn>
      </template>
      <Test
        @closeCard="closeCard"
      />
    </v-dialog>
  </div>
</template>

<script>

import Test from '../components/Test.vue'

  export default {
    components:{
      Test
    },
    data () {
      return {
        dialog: false,
      }
    },
    methods:{
      closeCard(){
        this.dialog=false;
      }
    }
    
  }
</script>