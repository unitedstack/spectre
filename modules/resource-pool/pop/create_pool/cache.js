var fetch = require('client/applications/dashboard/cores/fetch');

module.exports = {
  getListenerList: function() {
    return fetch.get({
      url: '/proxy/neutron/v2.0/lbaas/listeners?tenant_id=' + HALO.user.projectId
    }).then(function(data) {
      return data.listeners;
    });
  }
};
