<template>
    <Panel title="Project">
        <div
        class="project mt-2"
        v-for="project in projects"
        :key="project.id"
        >
        {{project.title}}
        </div>
        <v-layout row wrap>
            <v-flex xs8>
                <v-text-field
                    placeholder="my project name"
                    @input="setNewProjectName"
                    :value="newProjectName"
                >
                </v-text-field>
            </v-flex>
            <v-flex xs4>
                <v-btn
                @click="createProject"
                dark
                class="mt-2"
                color="green">
                >
                    Create
                <v-icon class="mr-2">add_circle</v-icon>
                </v-btn>
            </v-flex>
        </v-layout>
        <!-- <h1>Testing</h1> -->


    </Panel>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
    mounted() {
        this.fetchProjects();
    },

    computed:{
        ...mapState('projects',[
            // 'newProjectName',
            'projects',
        ]),
    },
    methods: {
        // ...mapMutations('projects',[
        //     'setNewProjectName', //also supports payload `this.nameOfMutation(amount)`
        // ]),
        ...mapActions('projects',[
            // 'createProject',
            'fetchProjects'
        ]),
    },
};

</script>