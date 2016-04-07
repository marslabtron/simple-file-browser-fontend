<template>
  <div class="action-bar">
    <ul class="action">
      <li><input type="button" v-on:click="newFolder" value="新建文件夹"></li>
      <li><input type="file" name="files[]" v-on:change="onFileChange"></li>
    </ul>
  </div>
</template>

<script>
import api from '../api';

export default {

  name: 'Action',

  props: {
    id: Number
  },

  data () {
    return {
      files: []
    };
  },

  methods: {
    newFolder: function() {
      var name = prompt("请输入文件夹名","");
      if (name=="" || name==null) {
         return;
      }
      api.node.create(this.id, name, resp => {
        this.$dispatch('node', resp.node);
      });
    },

    onFileChange: function(e) {
      var files = e.target.files || e.dataTransfer.files;
      api.node.upload(this.id, files, resp => {
        this.$dispatch('node', resp.node);
      });
    }
  }
}

</script>

<style>
.action-bar {
  padding: 10px;
}

.action li {
  display: inline-block;
}
</style>