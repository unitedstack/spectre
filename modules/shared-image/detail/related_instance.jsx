require('./style/index.less');

var React = require('react');
var {Table, Pagination} = require('client/uskin/index');
var __ = require('locale/client/admin.lang.json');

class RelatedInstance extends React.Component {
  constructor(props) {
    super(props);
  }

  onClickPagination(page, e) {
    this.props.onDetailAction && this.props.onDetailAction('pagination', this.refs, { page: page});
  }

  render() {
    var table = this.props.tableConfig;
    var pagi = this.props.tableConfig.pagination;

    return (
      <div className="halo-module-related-instance" style={this.props.style}>
        <div className="detail-content">
          {
            table.data.length > 0 ?
              <Table refs="table" mini={true} {...table} />
            : <div className="table-with-no-data">
                <Table refs="table" mini={true} column={table.column} data={[]} />
                <p>
                  {__.no_instance}
                </p>
              </div>
          }
          {
            pagi.total_num > 0 ?
              <div className="pagination-box">
                <Pagination current={pagi.current} total={pagi.total} onClick={this.onClickPagination.bind(this)} />
              </div>
            : null
          }
        </div>
      </div>
    );
  }

}

module.exports = RelatedInstance;
