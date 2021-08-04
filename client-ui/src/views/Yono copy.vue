<template>
    <v-container>
    <v-row>
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
                    @click="dialog = false"
                >
                    I accept
                </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
        <v-col v-for="n in 6" :key=n>
            <v-card
            >
                <v-card-actions>
                    <div class="text-center">
                        <v-btn
                            @click.stop="dialog=true"
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
export default {
    data(){
        return {
            dialog: false,
        }
    },
}
</script>
