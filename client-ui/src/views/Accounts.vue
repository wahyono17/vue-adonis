<template>
    <v-container>
        <div v-for="account in accounts" :key="account.id">
            <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title>{{account.bank}} {{account.number}}</v-list-item-title>
                <v-list-item-subtitle>{{account.name}}</v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
        </div>
    </v-container>
</template>

<script>
import HTTP from '../http';
export default {
    setup() {
        
    },
    data(){
        return {
            accounts:[]
        }
    },
    mounted() {
        HTTP().get('/accounts')
        .then(({data})=>{
            this.accounts = data
        })
    },

}
</script>