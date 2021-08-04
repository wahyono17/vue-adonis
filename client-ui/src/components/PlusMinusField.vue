<template>
  <div class="minusplusnumber">
      <v-btn color="primary" v-on:click="mpminus()" style="min-width: 0;" @click="sendOrderQty">
        -
      </v-btn>
      <div id="field_container">
        <input type="number" v-model="newValue" disabled />
      </div>
      <v-btn color="primary" v-on:click="mpplus()" style="min-width: 0;" @click="sendOrderQty">
        +
      </v-btn>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      default: 1,
      type: Number
    },
    min: {
      default: 1,
      type: Number
    },
    max: {
      default: undefined,
      type: Number
    }
  },

  data () {
    return {
      newValue: 0
    }
  },

  methods: {
    sendOrderQty(){
      this.$emit('recOrderQty',this.newValue)
    },
    getNotificationClass (notification) {
      return `alert alert-${notification.type}`
    },
    mpplus: function () {
      if (this.max === undefined || (this.newValue < this.max)) {
        this.newValue = this.newValue + 1
        this.$emit('input', this.newValue)
      }
    },
    mpminus: function () {
      if ((this.newValue) > this.min) {
        this.newValue = this.newValue - 1
        this.$emit('input', this.newValue)
      }
    }
  },
  watch: {
    value: {
      handler: function (newVal) {//, oldVal
        this.newValue = newVal
      }
    }
  },
  created: function () {
    this.newValue = this.value
  }
}
</script>
<style lang="scss" scoped>
  .vbtn {
    min-width: 0;
  }
  .minusplusnumber {
      border:1px solid silver;
      border-radius:5px;
      background-color: #FFF;
      margin:0 5px 0 5px;
      display:inline-block;
      user-select: none;
  }
  .minusplusnumber div {
      display:inline-block;
  }
  .minusplusnumber #field_container input {
      width:50px;
      text-align:center;
      font-size:15px;
      padding:3px;
      border:none;
  }
  // .minusplusnumber .mpbtn {
  //     padding:3px 10px 3px 10px;
  //     cursor:pointer;
  //     // border-radius:5px;
  //     background-color: rgb(74, 212, 74);
  // }
  .minusplusnumber .mpbtn:hover {
      background-color:#DDD;
  }
  .minusplusnumber .mpbtn:active {
      background-color:#c5c5c5;
  }
</style>
