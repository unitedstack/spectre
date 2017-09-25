const React = require('react');
const utilData = require('./util_data');
const __ = require('locale/client/dashboard.lang.json');
const Input = require('client/components/modal_common/subs/input/index');
const Select = require('client/components/modal_common/subs/select/index');
const Checkbox = require('client/components/modal_common/subs/checkbox/index');

const formatData = utilData.getFormatData(),
  protectedData = utilData.getProtectedData(),
  architectureData = utilData.getArchitectureData();

class ImageInfo extends React.Component {
  constructor(props) {
    super(props);

    if (props.item) {
      this.state = this.getItemState(props.item);
    } else {
      this.state = this.getInitialState();
    }

    ['onChangeName', 'onCheckbox'].forEach((func) => {
      this[func] = this[func].bind(this);
    });

  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      key: nextProps.displayKey
    });
  }

  onChangeName() {
    let name = this.refs.name.state.value,
      state = this.state, item;
    if (state.resourceType === 'file') {
      item = this.refs.file.files[0];
      this.setState({
        fileValue: item
      });
    }
    this.props.onChangeName && this.props.onChangeName(name, item, state.resourceType);
  }

  onCheckbox(e) {
    this.setState({
      checked: !this.state.checked
    });
  }

  onChangeFormat() {}

  getInitialState() {
    let state = {
      name: '',
      min_ram: '',
      min_disk: '',
      fileValue: '',
      checked: false,
      disabled: false,
      resourceType: 'file',
      description: '',
      key: this.props.displayKey,
      disk_format: formatData[0].id,
      protected: protectedData[0].id,
      architecture: architectureData[0].id
    };

    return state;
  }

  getItemState(item) {

    let state = {
      checked: true,
      fileValue: '',
      disabled: true,
      name: item.name,
      key: this.props.displayKey,
      disk_format: item.disk_format,
      description: item.description,
      architecture: item.architecture,
      min_ram: item.min_ram.toString(),
      min_disk: item.min_disk.toString(),
      protected: item.protected.toString()
    };

    return state;
  }

  render() {
    let state = this.state,
      className = 'modal-row input-row label-row';

    return (<div className={'image-info' + (state.key === '0' ? '' : ' hide')}>
      <Input ref="name"
        value={state.name}
        label={__.name}
        onAction={this.onChangeName}
        required={true} />
      <Input ref="describe"
        value={state.description}
        label={__.description}
        onAction={this.onChangeName} />
      <div id="uploadProgress" style={{display: 'none'}} className={className}>
        <div>{__.upload_progress}</div>
        <div>
          <progress id="progressBar" value="0" max="100" style={{width: '100%'}}></progress>
          <span id="percentage"></span><span id="time"></span>
        </div>
      </div>
      <div className={className + (state.resourceType ? '' : ' hide')}>
        <div>
          <strong>*</strong>{__.file}
        </div>
        <div>
          <input ref="file" type="file" onChange={this.onChangeName}/>
        </div>
      </div>
      <Select ref="format"
        value={state.disk_format}
        label={__.format}
        data={formatData}
        disabled={state.disabled}
        onAction={this.onChangeFormat.bind(this)} />
      <div className="modal-row label-row">
        <div>{__.visibility}</div>&nbsp;{__[this.props.changeType(this.props.type)]}
      </div>
      <div className="checkbox-wrapper">
        <Checkbox ref="more"
          checked={state.checked}
          onAction={this.onCheckbox.bind(this)}/>&nbsp;{__.more}
      </div>
      <div className={state.checked ? '' : 'hide'}>
        <Select ref="architecture"
          value={state.architecture}
          label={__.architecture}
          data={architectureData}
          disabled={state.disabled}
          onAction={this.onChangeFormat.bind(this)} />
        <Input ref="min_disk"
          value={state.min_disk}
          label={__.min_disk}
          onAction={this.onChangeName} />
        <Input ref="min_ram"
          value={state.min_ram}
          label={__.min_ram}
          onAction={this.onChangeName} />
        <Select ref="protected"
          value={state.protected}
          label={__.protected}
          data={protectedData}
          onAction={this.onChangeFormat.bind(this)} />
      </div>
    </div>);
  }
}

module.exports = ImageInfo;
