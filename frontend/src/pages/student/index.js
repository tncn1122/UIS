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
  Menu,
  Dropdown,
} from "antd";

import { DeleteOutlined, EditOutlined, ExclamationCircleOutlined, SettingOutlined, ToTopOutlined, UserOutlined } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { HttpUtils, URLUtils } from "../../utils";
import ErrorHandler from "../../utils/Error";
import UI from "../../utils/UI";
import { STATUS } from "../../value/model";
import StudentModal from "./StudentModal";
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





function StudentPage() {
  const [dataTable, setDataTable] = useState([])
  const [studentModalVisible, setStudentModalVisible] = useState(false)
  const [studentModalType, setStudentModalVisibleType] = useState(false)
  const [currentData, setCurrentData] = useState({})
  const [isFetchingData, setIsFetchingData] = useState(false)
  const [listDepartments, setListDepartments] = useState([])
  const [listMajors, setListMajors] = useState([])
  let history = useHistory()

  const tableColume = [
    {
      title: "MÃ SINH VIÊN",
      dataIndex: "userId",
      key: "studentId",
      width: "12%",
      hasSearch: true
    },
    {
      title: "HỌ",
      dataIndex: "lastName",
      key: "lastName",
      hasSearch: true
    },
    {
      title: "TÊN",
      dataIndex: "firstName",
      key: "firstName",
      hasSearch: true
    },
    {
      title: "KHOA ĐÀO TẠO",
      dataIndex: "departmentName",
      key: "departmentName",
      filters: listDepartments.map(item => ({
        text: item.name,
        value: item.departmentId
      })),
      onFilter: (value, record) => record.departmentId.indexOf(value) === 0
    },
    {
      title: "NGÀY TẠO",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value => (
        UI.formatDate(value)
      ))
    },
    {
      title: "TRẠNG THÁI",
      key: "status",
      dataIndex: "status",
      width: "10%",
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
      <Menu.Item key="1" icon={<UserOutlined />} onClick={() => {history.push(`/user/${record.userId}`)}}>
        Trang Cá Nhân
      </Menu.Item>
      <Menu.Item key="1" icon={<EditOutlined />}  onClick={(e) => { onClickEditButton(record) }}>
        {/* <Button type="text" disabled={record.status === STATUS.DELETED} onClick={(e) => { onClickEditButton(record) }} style={{boxShadow: 'none'}}>Sửa</Button> */}
        Sửa
      </Menu.Item>
      <Menu.Item key="2" icon={<DeleteOutlined />} onClick={(e) => { showConfirm(record) }}>
        Xóa
      </Menu.Item>
    </Menu>
  );
  
  useEffect(() => {
    fetchData()
  }, [])

  const showConfirm = (value) => {
    confirm({
      title: 'Xác nhận xóa sinh viên này?',
      icon: <ExclamationCircleOutlined />,
      content: `${value.lastName} ${value.firstName}`,
      onOk() {
        HttpUtils.delete(URLUtils.buildBeURL(`/users/${value.userId}`))
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
    HttpUtils.get(URLUtils.buildBeURL('/students'))
      .then(resp => {
        const { data } = resp
        if (data && data.length > 0) {
          setDataTable(preProcessingData(data))
        }
        setIsFetchingData(false)
      })
      .catch(err => {
        ErrorHandler.handle(err)
        setIsFetchingData(false)
      })
    fetchDepartments()
    fetchMajors()
  }

  const fetchDepartments = () => {
    HttpUtils.get(URLUtils.buildBeURL('/departments'))
      .then(resp => {
        const { data } = resp
        if (data && data.length > 0) {
          setListDepartments(data.filter(item => (item.status !== STATUS.DELETED)))
        }
      })
      .catch(err => {
        ErrorHandler.handle(err)
      })
  }

  const fetchMajors = () => {
    HttpUtils.get(URLUtils.buildBeURL('/majors'))
      .then(resp => {
        const { data } = resp
        if (data && data.length > 0) {
          setListMajors(data.filter(item => (item.status !== STATUS.DELETED)))
        }
      })
      .catch(err => {
        ErrorHandler.handle(err)
      })
  }

  const preProcessingData = (data) => {
    return data.map(item => {
      const { majorId: { departmentId } } = item
      return ({
        ...item,
        departmentName: departmentId?.name || '-'
      })
    })
  }

  const onCancelStudentModal = () => {
    setStudentModalVisibleType(null)
    setStudentModalVisible(false)
  }

  const onClickCreateButton = () => {
    setStudentModalVisibleType('create')
    setStudentModalVisible(true)
  }

  const onClickEditButton = (data) => {
    console.log(data);
    setStudentModalVisibleType('edit')
    setCurrentData(data)
    setStudentModalVisible(true)
  }


  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Danh Sách Sinh Viên"
              extra={
                <Space>
                  <Button onClick={fetchData}>
                    Làm Mới
                  </Button>
                  <Button onClick={onClickCreateButton}>
                    Tạo Sinh Viên Mới
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
      <StudentModal
        visible={studentModalVisible}
        onCancel={onCancelStudentModal}
        modalType={studentModalType}
        userInfo={currentData}
        fetchData={fetchData}
        listMajors={listMajors}
      />
      <Modal

      />
    </>
  );
}

export default StudentPage;
