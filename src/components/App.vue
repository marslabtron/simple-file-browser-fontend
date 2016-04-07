<template>
  <div class="wrapper">
    <Action
      v-if="nodeId"
      :id="nodeId"
      >
    </Action>

    <!-- viewer -->
    <router-view
      v-ref:finder
      class="view"
      keep-alive
      transition
      transition-mode="out-in">
    </router-view>
  </div>
</template>

<script>
import Action from './Action.vue';

export default {

  data() {
    return {
      nodeId: null
    }
  },

  events: {
    'node-id': function(id) {
      this.nodeId = id;
    },

    'node': function(node) {
      this.$refs.finder && this.$refs.finder.children.push(node);
    }
  },

  components: {
    Action
  }

};

</script>

<style>
html, body {
  font-family: Verdana;
  font-size: 14px;
  height: 100%;
}

body {
  margin: 0;
  padding: 0;
}

ul, li {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
</style>