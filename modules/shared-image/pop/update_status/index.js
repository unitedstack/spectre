var commonModal = require('client/components/modal_common/index');
var config = require('./config.json');
//var request = require('../../request');
// var getErrorMessage = require('client/applications/dashboard/utils/error_message');
var __ = require('locale/client/dashboard.lang.json');
var showMembers = require('./show_members');

function pop(obj, parent, callback) {
  //config.fields[0].text = obj.name;
  var props = {
    __: __,
    parent: parent,
    config: config,
    onInitialize: function(refs) {
      refs.members.setState({
        renderer: showMembers,
        callback: callback
      });
    },
    onConfirm: function(refs, cb) {
      cb(true);
    },
    onAction: function(field, status, refs) {}
  };

  commonModal(props);
}

module.exports = pop;
