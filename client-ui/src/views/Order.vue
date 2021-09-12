<template>
<v-container>
    <v-data-table
        :headers="headers"
        :items="desserts"
        :items-per-page="15"
        class="elevation-1"
    ></v-data-table>
</v-container>
</template>

<script>
import HTTP from '../http';
export default {
    data () {
        return {
        order:[],
        headers: [
          { text: 'Produk', sortable: true, value: 'name' },
          { text: 'Jumlah', sortable: true, value: 'qty' },
          { text: 'Satuan', sortable: true, value: 'unit' },
          { text: 'Harga', sortable: true, value: 'patungan_price' },
          { text: 'Total', sortable: true, value: 'amount' },
        //   { text: 'Calories', sortable: true, value: 'calories' },
        ],
        desserts: [],
        }
    },
    mounted() {
        const url = this.$route.path;
        HTTP().get(`${url}`)
        .then(({data})=>{
            // this.order = data
            data.forEach(element => {
                this.desserts.push({
                    name:element.name,
                    qty:element.qty,
                    unit:element.unit,
                    patungan_price:'Rp ' + this.formatPrice(element.patungan_price),
                    amount:'Rp ' + this.formatPrice(element.amount),
                })    
            });
            // console.log(this.desserts)
        })
    },
    methods:{
        formatPrice(value) {
            let val = (value/1).toFixed(0).replace('.', ',')
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")
        },
    }
}
</script>