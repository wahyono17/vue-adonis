<template>
  <v-app>
    <Toolbar v-if="!mobileView" :snackbarP="snackbar"/>
    <ToolbarMobile v-if="mobileView"/>

    <v-snackbar v-model="snackbar" :timeout="1500" color="purple lighten-5" top>
      <span style="color:black">{{messageText}}</span>
    </v-snackbar>

    <div id="app">
      <router-view @showMessage="showMessage"/>
    </div>

  </v-app>
</template>

<script>
import Toolbar from '@/components/Toolbar.vue';
import ToolbarMobile from '@/components/ToolbarMobile.vue';
// import HTTP from './http';

export default {
  data: () => {
    return {
      mobileView:false,
      snackbar:false,
      messageText:""
    };
  },
  components: {
    Toolbar,
    ToolbarMobile,
    // Test
  },
  methods: {
    handleView() {
      this.mobileView = window.innerWidth <= 990;
    },
    showMessage(message,value){
      this.messageText = message
      this.snackbar = value
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
  margin-top: 5px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
}
.non-transform {
  text-transform: none !important;
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

//clas tambahan yono
.text-bold{
    font-size: 20px;
  }
  .text-small{
    font-size: 14px;
  }
</style>
