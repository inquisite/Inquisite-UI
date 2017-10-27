<template>
    <transition :name="transition">
        <div id="signup-msg" class="alert alert-info" role="alert" v-show="message.show">
        <div class="msg">{{message.text}}</div>
        </div>
    </transition>
</template>

<script>

import store from '../../store/store.js'
export default {
    props: {
      transition: {
        type: String,
        default: "messageShow",
        required: false
      }
    },

    computed: {
        message: function() { return this.$store.getters['getMessage']; }
    }
}
</script>