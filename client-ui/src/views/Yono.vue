<template>
    <v-container>
    <v-row>
        <div v-if="dialog">
        <yono-dialog @closeDialog="closeDialog"></yono-dialog>
        </div>
        <v-col v-for="n in 6" :key=n>
            <v-card
            >
                <v-card-actions>
                    <div class="text-center">
                        <v-btn
                            @click="dialog=true"
                            >
                            Click Me
                        </v-btn>
                    </div>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
    </v-container>
</template>

<script>
import YonoDialog from '../components/YonoDialog.vue'

export default {
    components:{
        YonoDialog,
    },  
    data(){
        return {
            dialog: false,
        }
    },
    methods:{
        closeDialog(value){
            this.dialog=value;
        }
    }
}
</script>
