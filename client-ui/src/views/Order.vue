<template>
<v-container>
    <h1>hello word</h1>
</v-container>
</template>

<script>
import HTTP from '../http';
export default {
    data () {
        return {
            order:[],
        }
    },
    mounted() {
        const url = this.$route.path;
        HTTP().get(`${url}`)
        .then(({data})=>{
            this.order = data
            console.log(this.order)
        })
    },
}
</script>