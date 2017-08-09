require('./style/index.less');

var React = require('react');
var request = require('../../request');
var {Table} = require('client/uskin/index');
var __ = require('locale/client/dashboard.lang.json');

class ShowMembers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: true
    };
    ['onAction'].forEach(m => {
      this[m] = this[m].bind(this);
    });
  }

  componentWillMount() {
    request.getShared().then(_members => {
      request.getImageDetail(_members).then(images => {
        let members = _members.map((member, index) => ({
          id: member.image_id,
          member_id: member.member_id,
          name: images[index].name,
          owner: images[index].owner,
          status: member.status,
          operation: (<div className="operation">
            <span style={{display: member.status === 'pending' ? 'none' : 'inline-block'}} onClick={this.onAction.bind(this, index, 'pending')} className="pending">{__.pending}</span>
            <span style={{display: member.status === 'accepted' ? 'none' : 'inline-block'}} onClick={this.onAction.bind(this, index, 'accepted')} className="accept">{__.accept}</span>
            <span style={{display: member.status === 'rejected' ? 'none' : 'inline-block'}} onClick={this.onAction.bind(this, index, 'rejected')} className="reject">{__.reject}</span>
          </div>)
        }));
        this.setState({
          data: members,
          loading: false
        });
      });
    });
  }

  onAction(index, action) {
    let that = this, callback = this.props.callback,
      data = {
        status: action
      };
    this.setState({
      loading: true
    });
    request.updateMember(this.state.data[index], data).then(res => {
      that.state.data[index].status = action;
      that.state.data[index].operation = (<div className="operation">
        <span style={{display: action === 'pending' ? 'none' : 'inline-block'}} onClick={this.onAction.bind(this, index, 'pending')} className="pending">{__.pending}</span>
        <span style={{display: action === 'accepted' ? 'none' : 'inline-block'}} onClick={this.onAction.bind(this, index, 'accepted')} className="accept">{__.accept}</span>
        <span style={{display: action === 'rejected' ? 'none' : 'inline-block'}} onClick={this.onAction.bind(this, index, 'rejected')} className="reject">{__.reject}</span>
      </div>);
      callback && callback();
      this.setState({
        loading: false,
        data: that.state.data
      });
    });
  }

  render() {
    let loading = this.state.loading,
      data = this.state.data;
    let column = [{
      title: ['name'],
      dataIndex: 'name',
      key: 'name'
    }, {
      title: ['owner'],
      dataIndex: 'owner',
      key: 'owner'
    }, {
      title: ['status'],
      dataIndex: 'status',
      key: 'status'
    }, {
      title: ['operation'],
      dataIndex: 'operation',
      key: 'operation'
    }];
    return (
      <div className="halo-module-show-members">
        {loading ? <div className="loading glyphicon icon-loading"></div> : null}
        {data.length !== 0 && !loading ? <Table mini={true} dataKey="id" refs="table" column={column} data={data} /> : null}
        {data.length === 0 && !loading ? <div>{__.no_members}</div> : null}
      </div>
    );
  }
}

function popShow(config) {
  return <ShowMembers ref="showMembers" {...config} />;
}

module.exports = popShow;
