<template>
<v-container>
    <v-row>
        <v-col v-for="n in 15" :key=n
            cols="6"
            sm="4"
            md="3"
        >
        <v-card
            class="pa-2"
            outlined
            tile
        >
            <v-img
            height="250"
            src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
            ></v-img>

            <v-card-title>Cafe Badilico</v-card-title>

            <v-card-text>
            <v-row
                align="center"
                class="mx-0"
            >
                <div class="grey--text ms-4">
                nama toko / kecamatan / alamat
                </div>
            </v-row>

            <div class="my-4 text-subtitle-1">
                harga di sini
            </div>

            <div> descripsi di sini Small plates, salads & sandwiches - an intimate setting with 12 indoor seats plus patio seating.</div>
            </v-card-text>

            <v-divider class="mx-4"></v-divider>

            <v-card-actions>
            <v-btn
                color="deep-purple lighten-2"
                @click="reserve"
            >
                Pesan sekarang
            </v-btn>
            </v-card-actions>
        </v-card>
        </v-col>
    </v-row>
</v-container>
</template>