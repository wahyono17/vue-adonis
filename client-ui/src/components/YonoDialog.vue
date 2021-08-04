<template>
    <v-dialog
        v-model="dialog"
        width="500"
        >
        <v-card>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Accusamus nulla, repellendus fugit eius natus, beatae et unde consequuntur aperiam eos similique sequi nihil tempore, nostrum doloribus aut ea id error!</p>
            <v-divider></v-divider>

            <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn
                color="primary"
                text
                @click="closeDialog"
            >
                I accept
            </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>    
</template>

<script>
export default {
    props:{
        
    },
    data(){
        return{
            dialog:true
        }
    }, 
    methods:{
        closeDialog(){
            this.$emit('closeDialog',false);
        }
    },
}
</script>
