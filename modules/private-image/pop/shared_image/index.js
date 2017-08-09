var commonModal = require('client/components/modal_common/index');
var config = require('./config.json');
var request = require('../../request');
// var getErrorMessage = require('client/applications/dashboard/utils/error_message');
var __ = require('locale/client/dashboard.lang.json');

function pop(obj, parent, callback) {
  config.fields[0].text = obj.name;
  var props = {
    __: __,
    parent: parent,
    config: config,
    onInitialize: function(refs) {
    },
    onConfirm: function(refs, cb) {
      let projectId = refs.project_id.state.value;
      request.createMember(obj.id, projectId).then(res => {
        cb(true);
        callback && callback();
      });
    },
    onAction: function(field, status, refs) {
      switch (field) {
        case 'project_id':
          refs.btn.setState({
            disabled: !refs.project_id.state.value
          });
          break;
        default:
          break;
      }
    }
  };

  commonModal(props);
}

module.exports = pop;
