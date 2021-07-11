<template>
    <v-row>
        <v-col v-for="n in 6" :key=n>
            <v-card
            >
                <v-card-actions>
                    <div class="text-center">
                        <v-dialog
                        v-model="dialog"
                        width="500"
                        >
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                            v-bind="attrs"
                            v-on="on"
                            >
                            Click Me
                            </v-btn>
                        </template>

                        <v-card>
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
                    </div>
                </v-card-actions>
            </v-card>
        </v-col>
    </v-row>
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
