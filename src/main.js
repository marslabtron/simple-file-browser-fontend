import Vue from 'vue'
import Router from 'vue-router'
import Drag from './drag'
import App from './components/App.vue'
import NodeView from './components/NodeView.vue'


if (process.env.NODE_ENV === 'dev') {
  Vue.config.debug = true;
}

// install router
Vue.use(Router);
// install drag
Vue.use(Drag);

var router = new Router({
  hashbang: false,
  history: true,
  saveScrollPosition: true
});

router.map({
  '/': {
    name: 'root',
    component: NodeView
  },

  '/*path': {
    name: 'path',
    component: NodeView
  }
});

router.start(App, '#app');
