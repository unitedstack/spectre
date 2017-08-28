var commonModal = require('client/components/modal_common/index');
var config = require('./config.json');
var __ = require('locale/client/dashboard.lang.json');
var request = require('../../request');

function pop(obj, parent, callback) {
  let bootable;
  if (obj.bootable === 'true') {
    config.fields[0].info = __.bootable_status.replace('{0}', obj.name);
    bootable = false;
  } else {
    config.fields[0].info = __.no_bootable_status.replace('{0}', obj.name);
    bootable = true;
  }

  var props = {
    __: __,
    parent: parent,
    config: config,
    onInitialize: function(refs) {
    },
    onConfirm: function(refs, cb) {
      request.updateBootable(obj.id, bootable).then((res) => {
        callback && callback(res);
        cb(true);
      });
    },
    onAction: function(field, status, refs){}
  };

  commonModal(props);
}

module.exports = pop;
