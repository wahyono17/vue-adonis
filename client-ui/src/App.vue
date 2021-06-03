<template>
  <v-app>
    <Toolbar v-if="!mobileView"/>
    <ToolbarMobile v-if="mobileView"/>
    <Test/>
  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue';
import ToolbarMobile from '@/components/ToolbarMobile.vue';
import Test from '@/components/Test.vue';

export default {
  data: () => {
    return {
      mobileView: false,
      // showNav: false
    };
  },
  components: {
    Toolbar,
    ToolbarMobile,
    Test
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 990;
    }
  },
  created() {
    this.handleView();
    window.addEventListener('resize', this.handleView);
  }

}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
