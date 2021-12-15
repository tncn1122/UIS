import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Button, Input, Space, Table } from 'antd'
import { SearchOutlined } from '@ant-design/icons'
import Highlighter from 'react-highlight-words';

function CustomTable(props) {
  const { data, pagination, pageSize, size, loading, bordered, tableColumns,
    scroll, rowSelection, onSelectChange, onChange, customPagination } = props
  let { searchInput } = props
  const [columns, setcolumns] = useState(tableColumns || [])
  const [searchText, setsearchText] = useState('')
  const [searchedColumn, setsearchedColumn] = useState('')

  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => {
              handleSearch(selectedKeys, confirm, dataIndex)
            }}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => (
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : ''
    ),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: text => showHighlight({ text, dataIndex }),
  });

  const showHighlight = ({ text, dataIndex }) => (
    searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text ? text.toString() : ''}
      />
    ) : (
      text
    )
  );

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setsearchText(selectedKeys[0]);
    setsearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setsearchText('');
    setsearchedColumn('');
  };

  const handleColumn = cols => (
    cols.map(col => col.hasSearch ? ({
      ...getColumnSearchProps(col.dataIndex),
      ...col,
    }) : (
      { ...col }
    )
    )
  )

  useEffect(() => {
    setcolumns(handleColumn(tableColumns));
  }, [tableColumns, searchedColumn, searchText])

  const defaultPagination = {
    position: pagination,
    showQuickJumper: true,
    showSizeChanger: true,
    pageSizeOptions: [10, 20, 50, 100]
  }

  return (

    <Table
      dataSource={data}
      pagination={customPagination ? { ...defaultPagination, ...customPagination } : defaultPagination}
      size={size}
      loading={{ spinning: loading, tip: 'Loading data...' }}
      bordered={bordered}
      columns={columns}
      scroll={scroll}
      onChange={onChange}
      rowSelection={rowSelection ? { ...rowSelection, onChange: onSelectChange } : null}
    />
  )
}

CustomTable.propTypes = {
  data: PropTypes.array.isRequired,
  tableColumns: PropTypes.array.isRequired,
  pagination: PropTypes.string,
  pageSize: PropTypes.number,
  size: PropTypes.string, /* middle, small */
  loading: PropTypes.bool,
  bordered: PropTypes.bool,
  scroll: PropTypes.object, /* { x: 3000, y: 400 } */
  rowSelection: PropTypes.object,
  onSelectChange: PropTypes.func,
}

CustomTable.defaultProps = {
  pagination: 'bottomRight',
  pageSize: 10,
  size: 'default',
  loading: false,
  bordered: false,
  scroll: null,
  rowSelection: null,
  onSelectChange: (keys, dataRows) => console.log(`Keys: ${keys}\n DataRows: ${dataRows}`)
}

export default CustomTable
