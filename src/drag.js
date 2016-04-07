'use strict';

exports.install = function(Vue, options) {

  var dropTo = '',
      $ = Vue.util;

  Vue.directive('draggable', {
    bind: function() {
      this.data = {};
      var that = this;

      this.dragstart = function(event) {
        dropTo = that.arg;
        event.target.classList.add(that.data.dragged);
        event.dataTransfer.effectAllowed = 'all';
        event.dataTransfer.setData('data', JSON.stringify(that.data));
        event.dataTransfer.setData('tag', that.arg);
        return false;
      };

      this.dragend = function(event) {
        event.target.classList.remove(that.data.dragged);
        return false;
      };

      this.el.setAttribute('draggable', true);
      $.on(this.el, 'dragstart', this.dragstart);
      $.on(this.el, 'dragend', this.dragend);
    },

    unbind: function() {
      this.el.setAttribute('draggable', false);
      $.off(this.el, 'dragstart', this.dragstart);
      $.off(this.el, 'dragend', this.dragend);
    },

    update: function(value, old) {
      this.data = value;
    }
  });

  Vue.directive('droparea', {
    acceptStatement: true,

    bind: function() {
      var that = this;

      this.dragenter = function(event) {
        if (dropTo == that.arg) {
          event.target.classList.add(that.arg);
        }
        return false;
      };

      this.dragover = function(event) {
        if (event.preventDefault) {
          event.preventDefault();
        }
        if (dropTo == that.arg) {
          event.dataTransfer.effectAllowed = 'all';
          event.dataTransfer.dropEffect = 'copy';
        } else {
          event.dataTransfer.effectAllowed = 'none';
          event.dataTransfer.dropEffect = 'none';
        }
        return false;
      };

      this.dragleave = function(event) {
        if (dropTo == that.arg) {
          event.target.classList.remove(that.arg);
        }
        return false;
      };

      this.drop = function(event) {
        if (event.preventDefault) {
          event.preventDefault();
        }
        var tag = event.dataTransfer.getData('tag');
        var data = event.dataTransfer.getData('data');
        if (dropTo == that.arg) {
          that.handler(tag, JSON.parse(data));
          event.target.classList.remove(self.arg);
        }
        return false;
      };

      $.on(this.el, 'dragenter', this.dragenter);
      $.on(this.el, 'dragleave', this.dragleave);
      $.on(this.el, 'dragover', this.dragover);
      $.on(this.el, 'drop', this.drop);
    },

    unbind: function() {
      $.off(this.el, 'dragenter', this.dragenter);
      $.off(this.el, 'dragleave', this.dragleave);
      $.off(this.el, 'dragover', this.dragover);
      $.off(this.el, 'drop', this.drop);
    },

    update: function(value, old) {
      var vm = this.vm;
      this.handler = function(tag, data) {
        vm.$droptag = tag;
        vm.$dropdata = data;
        var res = value(tag, data);
        vm.$droptag = null;
        vm.$dropdata = null;
        return res;
      };
    }
  });
};
