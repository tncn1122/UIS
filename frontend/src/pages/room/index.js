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
import RoomModal from "./RoomModal";
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





function RoomPage() {
  const [dataTable, setDataTable] = useState([])
  const [roomModalVisible, setRoomModalVisible] = useState(false)
  const [roomModalType, setRoomModalVisibleType] = useState(false)
  const [currentData, setCurrentData] = useState({})
  const [isFetchingData, setIsFetchingData] = useState(false)


  const tableColume = [
    {
      title: "MÃ PHÒNG HỌC",
      dataIndex: "roomId",
      key: "roomId",
      width: "32%",
      hasSearch: true
    },
    {
      title: "SỐ CHỖ NGỒI",
      dataIndex: "slots",
      key: "slots",
      sorter: {
        compare: (a, b) => (a.slots-b.slots),
      },
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
      title: "NGÀY TẠO",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (value => (
        UI.formatDate(value)
      ))
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
      title: 'Xác nhận xóa phòng học này?',
      icon: <ExclamationCircleOutlined />,
      content: `${value.roomId}`,
      onOk() {
        HttpUtils.delete(URLUtils.buildBeURL(`/rooms/${value.roomId}`))
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
    HttpUtils.get(URLUtils.buildBeURL('/rooms'))
      .then(resp => {
        const { data } = resp
        if (data && data.length > 0) {
          setDataTable(data)
        }
        setIsFetchingData(false)
      })
      .catch(err => {
        ErrorHandler.handle(err)
        setIsFetchingData(false)
      })
  }

  const onCancelRoomModal = () => {
    setRoomModalVisibleType(null)
    setRoomModalVisible(false)
  }

  const onClickCreateButton = () => {
    setRoomModalVisibleType('create')
    setRoomModalVisible(true)
  }

  const onClickEditButton = (data) => {
    console.log(data);
    setRoomModalVisibleType('edit')
    setCurrentData(data)
    setRoomModalVisible(true)
  }


  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title="Danh Sách Phòng Học"
              extra={
                <Space>
                  <Button onClick={fetchData}>
                    Làm Mới
                  </Button>
                  <Button onClick={onClickCreateButton}>
                    Tạo Phòng Mới
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
      <RoomModal
        visible={roomModalVisible}
        onCancel={onCancelRoomModal}
        modalType={roomModalType}
        roomId={currentData.roomId}
        slots={currentData.slots}
        fetchData={fetchData}
      />
      <Modal

      />
    </>
  );
}

export default RoomPage;
