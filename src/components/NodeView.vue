<template>
  <div class="finder">
    <div class="nodes">
      <node
        v-for="child in children"
        :atom="child"
        :index="$index"
        :path="path"
        v-draggable:over="{node: child, index: $index, dragged: 'dragged'}"
        v-droparea:over="{move: move($index, $droptag, $dropdata)}"
        track-by="id">
      </node>
    </div>
    <div class="trashcan" v-droparea:over="{remove: remove($droptag, $dropdata)}">
      <p>拖拽文件或文件夹到此处删除</p>
    </div>
  </div>
</template>

<script>
import api from '../api';
import Node from './Node.vue';

export default {

  name: 'NodeView',

  components: {
    Node
  },

  data() {
    return {
      path: '',
      children: []
    }
  },

  methods: {
    move: function(index, tag, data) {
      var node = data.node,
          newParent = this.children[index];
      if (node.parent_id==newParent.id || node.id==newParent.id
          || newParent.permission==1)
      {
        return;
      }
      api.node.move(newParent.id, node.id, resp => {
        this.children.splice(data.index, 1);
      });
    },

    remove: function(tag, data) {
      var node = data.node;
      api.node.delete(node.id, resp => {
        this.children.splice(data.index, 1);
      });
    }
  },

  route: {
    data ({ to }) {
      let path = to.params.path || '';
      this.path = to.path;
      api.path.find(path, resp => {
        this.children = resp.children;
        this.$dispatch('node-id', resp.node.id);
        document.title = resp.node.name || 'Not Found';
      });
    }
  }
}
</script>

<style>
.trashcan {
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  background-color: #cacaca;
  padding: 10px;
}

.trashcan p {
  line-height: 45px;
  margin: 0 auto;
}

.trashcan.over {
  background-color: #494956;
}
</style>