<template>
  <a v-link="{ path: href }" class="node">
    <div class="icon" v-bind:class="{'file': atom.permission==1}"></div>
    <p class="label">{{atom.name}}</p>
  </a>
</template>

<script>
import {pathJoin} from '../utils';

export default {

  name: 'Node',

  props: {
    atom: Object,
    index: Number,
    path: String
  },

  computed: {
    href() {
      var uri;
      if (this.atom.permission > 0) {
        uri = '';
      } else {
        uri = pathJoin([this.path, this.atom.name]);
      }
      return uri;
    }
  }

};
</script>

<style>
.node {
  display: inline-block;
  box-sizing: border-box;
  -webkit-box-flex: 1;
      -webkit-flex: 1;
          -ms-flex: 1;
              flex: 1;
  -webkit-border-radius: 6px;
     -moz-border-radius: 6px;
      -ms-border-radius: 6px;
          border-radius: 6px;
  padding: 7px 0 0;
  -webkit-tap-highlight-color: transparent;
  margin: 5px;
  text-align: center;
}

.node.dragged {
  opacity: 0.2;
  color: black;
}

.node.over {
  background-color: #ccc;
}

.icon {
  margin: 0 auto;
  width: 32px;
  height: 32px;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAAA2BAMAAACFPIIxAAAAKlBMVEUAAAD96Y7yzTjSoQHuxzHYqxT++e/eqQTdpgDnuRr98dr62pzqxljltCoqab5oAAAAAXRSTlMAQObYZgAAAE5JREFUOMtj6ICDbgasoEkJBtwXEFCgeY2AAqU5aVgAsgLNckxQAVSAF2hQQUGLC17gwWAaihcEMxgK4gXCowpGFYwqGFUwqoDmCowJAACRD6mKZ3dVkAAAAABJRU5ErkJggg==');
  background-repeat: no-repeat;
  background-size: 32px 32px;
  background-position: center;
}

.icon.file {
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAAA6AgMAAACCHJIIAAAACVBMVEX////Hzti6v8mOVfM4AAAAIUlEQVQoz2NYhQwYGhgQgIkuvFAYGDVz1EwGhkHGQ8kdAA5RQqBgYZwcAAAAAElFTkSuQmCC');
}

.label {
  margin-top: 5px;
  width: 80px;
  text-overflow: ellipsis;
  overflow: hidden;
}

[draggable] {
  -moz-user-select: none;
  -khtml-user-select: none;
  -webkit-user-select: none;
  user-select: none;
  /* Required to make elements draggable in old WebKit */
  -khtml-user-drag: element;
  -webkit-user-drag: element;
}
</style>