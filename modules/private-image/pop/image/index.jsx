require('./style/index.less');

let React = require('react');
let ReactDOM = require('react-dom');
let Base = require('./base');

function modal(obj, parent, callback) {
  let container = null;

  (function() {
    let mask = null,
      doc = document,
      root = doc.getElementById('modal-container');

    if (!root) {
      root = doc.createElement('div');
      root.id = 'modal-container';

      mask = doc.createElement('div');
      mask.classList.add('modal-mask');
      root.appendChild(mask);

      doc.body.appendChild(root);
    }
    container = doc.createElement('div');
    root.appendChild(container);
  })();

  function destory() {
    ReactDOM.unmountComponentAtNode(container);
    container.parentNode.removeChild(container);
  }

  function onAfterClose() {
    destory();
  }

  let _props = {
    onAfterClose: onAfterClose,
    parent: parent,
    obj: obj,
    callback: callback
  };

  return ReactDOM.render(<Base {..._props}/>, container);
}

module.exports = modal;
