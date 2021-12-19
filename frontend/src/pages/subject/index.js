import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
  Space,
  Modal,
  notification,
  Spin,
  Dropdown,
  Menu,
} from "antd";

import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, SettingOutlined, ToTopOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { HttpUtils, URLUtils } from "../../utils";
import ErrorHandler from "../../utils/Error";
import UI from "../../utils/UI";
import { STATUS } from "../../value/model";
import SubjectModal from "./SubjectModal";
import CustomTable from "../../components/table/CustomTable";


const { Title } = Typography;
const { confirm } = Modal

const formProps = {
  name: "file",
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  headers: {
    authorization: "authorization-text",
  },
  onChange(info) {
    if (info.file.status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === "done") {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};





function SubjectPage() {
  const [dataTable, setDataTable] = useState([])
  const [subjectModalVisible, setSubjectModalVisible] = useState(false)
  const [subjectModalType, setSubjectModalVisibleType] = useState(false)
  const [currentData, setCurrentData] = useState({})
  const [isFetchingData, setIsFetchingData] = useState(false)
  const [listRooms, setListRooms] = useState([])
  const [listTeachers, setListTeachers] = useState([])
  const [listStudents, setListStudents] = useState([])
  const [filterCount, setFilterCount] = useState(0)
  const [currentFilter, setCurrentFilter] = useState({ status: [STATUS.ACTIVE] })

  const onFilterChange = (pagination, filters, sorter, filteredData) => {
    console.log('here');
    setCurrentFilter(filters)
    setFilterCount(filteredData?.currentDataSource?.length || 0)
  }
  let history = useHistory()


  const tableColume = [
    {
      title: "MÃ MÔN HỌC",
      dataIndex: "subjectId",
      key: "subjectId",
      width: "12%",
      hasSearch: true
    },
    {
      title: "TÊN MÔN",
      dataIndex: "name",
      key: "lastName",
      hasSearch: true
    },
    {
      title: "SỐ TÍN CHỈ",
      dataIndex: "credits",
      key: "credits",
      hasSearch: true
    },
    {
      title: "PHÒNG",
      dataIndex: "roomId",
      key: "roomId",
    },
    {
      title: "GIẢNG VIÊN",
      dataIndex: "teacherName",
      key: "teacherName",
    },
    {
      title: "SỐ LƯỢNG SINH VIÊN",
      dataIndex: "studentCount",
      key: "studentCount",
    },
    {
      title: "NGÀY TẠO",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value => (
        UI.formatDate(value)
      ))
    },
    // {
    //   title: "LỊCH HỌC",
    //   key: "schedule",
    //   dataIndex: "schedule",
    // },
    {
      title: "TRẠNG THÁI",
      key: "status",
      dataIndex: "status",
      defaultFilteredValue: [STATUS.ACTIVE],
      filters: [
        {
          text: 'ACTIVE',
          value: STATUS.ACTIVE,
        },
        {
          text: 'DELETED',
          value: STATUS.DELETED,
        },
      ],
      render: status => UI.renderStatusTag(status),
      onFilter: (value, record) => record.status.indexOf(value) === 0
    },
    {
      title: 'HIỆU CHỈNH',
      key: 'action',
      width: "5%",
      render: (value, record) => (
        <>
          {
            <Dropdown overlay={() => (dropdownOptions(record))} placement="bottomRight" arrow>
              <Button icon={<SettingOutlined />}
                style={{
                  padding: '0px 0px',
                  fontSize: '20px',
                  boxShadow: 'none',
                  borderRadius: '6px',
                  width: '50px',
                  height: '42px'
                }}
              />
            </Dropdown>
          }
        </>
      )
    }
  ];

  const dropdownOptions = (record) => (
    <Menu disabled={record.status === STATUS.DELETED}>
      <Menu.Item key="detail" icon={<UserOutlined />} onClick={() => { history.push(`/subject/${record.subjectId}/${record.semester}`) }}>
        Chi Tiết
      </Menu.Item>
      <Menu.Item key="edit" icon={<EditOutlined />} onClick={(e) => { onClickEditButton(record) }}>
        {/* <Button type="text" disabled={record.status === STATUS.DELETED} onClick={(e) => { onClickEditButton(record) }} style={{boxShadow: 'none'}}>Sửa</Button> */}
        Sửa
      </Menu.Item>
      <Menu.Item key="delete" icon={<DeleteOutlined />} onClick={(e) => { showConfirm(record) }}>
        Xóa
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    fetchData()
    fetchStudents()
    fetchTeachers()
  }, [])

  const showConfirm = (value) => {
    confirm({
      title: 'Xác nhận xóa môn họcnày?',
      icon: <ExclamationCircleOutlined />,
      content: `${value.name}`,
      onOk() {
        HttpUtils.delete(URLUtils.buildBeURL(`/subjects/${value.subjectId}/${value.semester}`))
          .then(resp => {
            notification.success({
              message: 'Xóa thành công',
              placement: 'bottomRight'
            })
            fetchData()
          })
          .catch(err => {
            ErrorHandler.handle(err)
          })
      },
    });
  }

  const fetchData = () => {
    setIsFetchingData(true)
    HttpUtils.get(URLUtils.buildBeURL('/subjects'))
      .then(resp => {
        const { data } = resp
        if (data && data.length > 0) {
          setDataTable(preProcessingData(data))
          setFilterCount(UI.filterData(data, currentFilter).length)

        }
        setIsFetchingData(false)
      })
      .catch(err => {
        ErrorHandler.handle(err)
        setIsFetchingData(false)
      })
    fetchRooms()
  }

  const fetchRooms = () => {
    HttpUtils.get(URLUtils.buildBeURL('/rooms'))
      .then(resp => {
        const { data } = resp
        if (data && data.length > 0) {
          setListRooms(data.filter(item => (item.status !== STATUS.DELETED)))
        }
      })
      .catch(err => {
        ErrorHandler.handle(err)
      })
  }

  const fetchStudents = () => {
    HttpUtils.get(URLUtils.buildBeURL('/students'))
      .then(resp => {
        const { data } = resp
        if (data && data.length > 0) {
          setListStudents(data.filter(item => (item.status !== STATUS.DELETED)))
        }
      })
      .catch(err => {
        ErrorHandler.handle(err)
      })
  }
  const fetchTeachers = () => {
    HttpUtils.get(URLUtils.buildBeURL('/teachers'))
      .then(resp => {
        const { data } = resp
        if (data && data.length > 0) {
          setListTeachers(data.filter(item => (item.status !== STATUS.DELETED)))
        }
      })
      .catch(err => {
        ErrorHandler.handle(err)
      })
  }

  const preProcessingData = (data) => {
    return data.map(item => {
      const { roomId, teacher } = item
      return ({
        ...item,
        studentCount: `${item.students.length}/${roomId.slots}`,
        roomId: roomId.roomId || '-',
        teacherName: teacher ? `${teacher.lastName} ${teacher.firstName}` : '-'
      })
    })
  }

  const onCancelSubjectModal = () => {
    setSubjectModalVisibleType(null)
    setSubjectModalVisible(false)
  }

  const onClickCreateButton = () => {
    setSubjectModalVisibleType('create')
    setSubjectModalVisible(true)
  }

  const onClickEditButton = (data) => {
    console.log(data);
    setSubjectModalVisibleType('edit')
    setCurrentData(data)
    setSubjectModalVisible(true)
  }


  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title={`Danh Sách Môn Học - ${filterCount}`}
              extra={
                <Space>
                  <Button onClick={fetchData}>
                    Làm Mới
                  </Button>
                  <Button onClick={onClickCreateButton}>
                    Tạo Môn Học Mới
                  </Button>
                </Space>
              }
            >
              <Spin spinning={isFetchingData}>
                <div className="table-responsive">
                  <CustomTable
                    tableColumns={tableColume}
                    data={dataTable}
                    className="ant-border-space"
                    onChange={onFilterChange}

                  />
                </div>
                <div className="uploadfile pb-15 shadow-none">
                  <Upload {...formProps}>
                    <Button
                      type="dashed"
                      className="ant-full-box"
                      icon={<ToTopOutlined />}
                    >
                      Tải lên tập tin
                    </Button>
                  </Upload>
                </div>
              </Spin>
            </Card>
          </Col>
        </Row>
      </div>
      <SubjectModal
        visible={subjectModalVisible}
        onCancel={onCancelSubjectModal}
        modalType={subjectModalType}
        subjectInfo={currentData}
        fetchData={fetchData}
        listRooms={listRooms}
        listTeachers={listTeachers}
        listStudents={listStudents}
      />
    </>
  );
}

export default SubjectPage;
