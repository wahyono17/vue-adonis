<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="">
          Konfirmasi Terima Barang
        </v-card-title>

        <v-card-text>
          Konfirmasi telah terima barang, maka uang akan diteruskan ke penjual, dan transaksi dinyatakan selesai
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="red lighten-2"
            @click="cancel"
        >
            Batal
        </v-btn>
        <v-btn
            color="primary"
            @click="confirm(order)"
        >
            Konfirmasi
        </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import HTTP from '../http';

  export default {
    props:{
      order:{
        type: Object,
        required: true,
      }
    },
    data () {
      return {
        dialog:true,
      }
    },
    methods:{
        confirm(order){
            // console.log(order.id);
            //tampilkan pesan selesai
            HTTP().post('/order/status',{
              id:order.id,
              next_status:5 //5 konfirmasi selesai
            })
            .then(({data})=>{
              this.$emit('showMessage',data.message,true,order);
              this.$emit('closeDialog',false);
            })
        },
        cancel(){
            this.$emit('closeDialog',false);
        }
    }
  }
</script>