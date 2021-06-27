<template>
    <v-container>
        <v-layout>
            <v-flex xs4>
                <Projects></Projects>
            </v-flex>

            <v-flex xs8 class="pl-4">
                <Panel title="Task">
                    <h1>Testing</h1>
                </Panel>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
import Projects from '../components/Projects.vue'

export default {
    components:{
        Projects,
    }
}
</script>