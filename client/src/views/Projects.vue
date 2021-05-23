<template>
  <div>
      <v-card
        class="v-flex md-4 sm-12"
        v-for="n in 3"
        :key="n"
        outlined
        tile
      >
        Flex item {{ n }} Lorem ipsum dolor sit, amet consectetur adipisicing elit. Officiis voluptas error est repellendus eveniet? Quam sint repudiandae nam. Necessitatibus ea odio impedit incidunt architecto mollitia laborum, maxime rem ipsum reiciendis!
      </v-card>
  </div>
</template>

<script>
import { mapGetters, mapState } from 'vuex';
import Projects from '@/components/Projects.vue';
import Tasks from '@/components/Tasks.vue';
import router from '../router';

export default {
  components: {
    Projects,
    Tasks,
  },
  mounted() {
    if (!this.isLoggedIn) {
      return router.push('/login');
    }
  },
  computed: {
    ...mapState('projects', [
      'currentProject',
    ]),
    ...mapGetters('authentication', [
      'isLoggedIn',
    ]),
  },
};
</script>
