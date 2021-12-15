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
} from "antd";

import { ExclamationCircleOutlined, ToTopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { HttpUtils, URLUtils } from "../../utils";
import ErrorHandler from "../../utils/Error";
import UI from "../../utils/UI";
import { STATUS } from "../../value/model";
import TeacherModal from "./TeacherModal";
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





function TeacherPage() {
  const [dataTable, setDataTable] = useState([])
  const [teacherModalVisible, setTeacherModalVisible] = useState(false)
  const [teacherModalType, setTeacherModalVisibleType] = useState(false)
  const [currentData, setCurrentData] = useState({})
  const [isFetchingData, setIsFetchingData] = useState(false)
  const [listDepartment, setListDepartment] = useState([])


  const tableColume = [
    {
      title: "MÃ GIẢNG VIÊN",
      dataIndex: "userId",
      key: "teacherId",
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
      filters: listDepartment.map(item => ({
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
      width: "10%",
      render: (value, record) => (
        <>
          <Space>
            <Button disabled={record.status === STATUS.DELETED} onClick={(e) => { onClickEditButton(record) }}>Sửa</Button>
            <Button disabled={record.status === STATUS.DELETED || record.majorsCount > 0} onClick={(e) => { showConfirm(record) }}>Xóa</Button>
          </Space>
        </>
      )
    }
  ];

  useEffect(() => {
    fetchData()
  }, [])

  const showConfirm = (value) => {
    confirm({
      title: 'Xác nhận xóa giảng viên này?',
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
    HttpUtils.get(URLUtils.buildBeURL('/teachers'))
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
  }

  const fetchDepartments = () => {
    HttpUtils.get(URLUtils.buildBeURL('/departments'))
      .then(resp => {
        const { data } = resp
        if (data && data.length > 0) {
          setListDepartment(data.filter(item => (item.status !== STATUS.DELETED)))
        }
      })
      .catch(err => {
        ErrorHandler.handle(err)
      })
  }

  const preProcessingData = (data) => {
    return data.map(item => {
      const {majorId: {departmentId}} = item
      return ({
        ...item,
        departmentName: departmentId?.name || '-',
        departmentId: departmentId?.departmentId || '-'
      })
    })
  }

  const onCancelTeacherModal = () => {
    setTeacherModalVisibleType(null)
    setTeacherModalVisible(false)
  }

  const onClickCreateButton = () => {
    setTeacherModalVisibleType('create')
    setTeacherModalVisible(true)
  }

  const onClickEditButton = (data) => {
    console.log(data);
    setTeacherModalVisibleType('edit')
    setCurrentData(data)
    setTeacherModalVisible(true)
  }


  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Danh Sách Giảng Viên"
              extra={
                <Space>
                  <Button onClick={fetchData}>
                    Làm Mới
                  </Button>
                  <Button onClick={onClickCreateButton}>
                    Tạo Giảng Viên Mới
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
      <TeacherModal
        visible={teacherModalVisible}
        onCancel={onCancelTeacherModal}
        modalType={teacherModalType}
        teacherId={currentData.teacherId}
        name={currentData.name}
        fetchData={fetchData}
      />
      <Modal

      />
    </>
  );
}

export default TeacherPage;
