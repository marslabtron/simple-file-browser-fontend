var request = require('./xhr');

exports.path = {

  url: function(path) {
    return '/api/' + path;
  },

  find: function(path, cb) {
    return request.get(this.url(path), cb);
  }
};

exports.node = {

  url: function(id) {
    return '/api/node/' + id;
  },

  uploadUrl: function(id) {
    return '/api/node/' + id + '?p=1';
  },

  create: function(id, name, cb) {
    request.post(this.url(id), {name: name}, cb);
  },

  move: function(id, childId, cb) {
    request.put(this.url(id), {nid: childId}, cb);
  },

  delete: function(id, cb) {
    request.del(this.url(id), {}, cb);
  },

  upload: function(id, files, cb) {
    var data = new FormData();
    for (let i=0, f; f=files[i]; i++) {
      data.append('file', f);
    }
    request.post(this.uploadUrl(id), data, cb);
  }
}
