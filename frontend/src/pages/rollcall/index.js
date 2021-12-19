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
  Descriptions,
  Image,
  Statistic,
} from "antd";

import { ExclamationCircleOutlined, ToTopOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import { useEffect, useState } from "react";
import { HttpUtils, URLUtils } from "../../utils";
import ErrorHandler from "../../utils/Error";
import UI from "../../utils/UI";
import { STATUS } from "../../value/model";
import CustomTable from "../../components/table/CustomTable";
import { DATE_FORMAT } from "../../value/time";
import moment from 'moment'
import { ROLLCALL_STATUS } from "../../value/model";



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





function RollCallPage(props) {
  const [dataTable, setDataTable] = useState([])
  const [rollCallModalVisible, setRollCallModalVisible] = useState(false)
  const [rollCallModalType, setRollCallModalVisibleType] = useState(false)
  const [subjectInfo, setSubjectInfo] = useState({})
  const [reportInfo, setReportInfo] = useState({})
  const [isFetchingData, setIsFetchingData] = useState(false)
  const [stringDate, setStringDate] = useState(moment().format(DATE_FORMAT))
  const [filterCount, setFilterCount] = useState(0)
  const [currentFilter, setCurrentFilter] = useState({})

  const [countData, setCountData] = useState([0, 0, 0])

  const subjectId = props.match.params.id
  const semester = props.match.params.semester


  const onFilterChange = (pagination, filters, sorter, filteredData) => {
    console.log(filters);
    setCurrentFilter(filters)
    setFilterCount(filteredData?.currentDataSource?.length || 0)
  }

  const tableColume = [
    {
      title: "MÃ SINH VIÊN",
      dataIndex: "studentId",
      key: "studentId",
      width: "12%",
      hasSearch: true,
    },
    {
      title: "HỌ",
      dataIndex: "studentLastName",
      key: "studentLastName",
      hasSearch: true,
    },
    {
      title: "TÊN",
      dataIndex: "studentFirstName",
      key: "studentFirstName",
    },
    {
      title: "TRẠNG THÁI",
      key: "rollcallStatus",
      dataIndex: "rollcallStatus",
      filters: [
        {
          text: ROLLCALL_STATUS.MAP[ROLLCALL_STATUS.ONTIME],
          value: ROLLCALL_STATUS.ONTIME,
        },
        {
          text: ROLLCALL_STATUS.MAP[ROLLCALL_STATUS.ABSENT],
          value: ROLLCALL_STATUS.ABSENT,
        },
        {
          text: ROLLCALL_STATUS.MAP[ROLLCALL_STATUS.LATE],
          value: ROLLCALL_STATUS.LATE,
        },
      ],
      render: status => UI.renderStatusTag(status, ROLLCALL_STATUS.MAP[status]),
      onFilter: (value, record) => record.rollcallStatus.indexOf(value) === 0
    },
  ];

  useEffect(() => {
    fetchData()
  }, [])



  const fetchData = () => {
    setIsFetchingData(true)
    HttpUtils.get(URLUtils.buildBeURL(`/reports/${subjectId}/${semester}/${stringDate}/status`))
      .then(resp => {
        const { data } = resp
        if (data && data.length > 0) {
          const { content, subjectId } = data[0]
          setSubjectInfo(subjectId)
          setReportInfo(data[0])
          const res = preProcressingData(content)
          setDataTable(res)
          setFilterCount(UI.filterData(res, currentFilter).length)
        }
        setIsFetchingData(false)
      })
      .catch(err => {
        ErrorHandler.handle(err)
        setIsFetchingData(false)
      })
  }

  const preProcressingData = (data) => {
    return data.map(item => {
      const { studentId } = item
      return {
        ...item,
        studentId: studentId.userId,
        studentLastName: studentId.lastName,
        studentFirstName: studentId.firstName,
      }
    })
  }

  const onCancelRollCallModal = () => {
    setRollCallModalVisibleType(null)
    setRollCallModalVisible(false)
  }

  const onClickCreateButton = () => {
    setRollCallModalVisibleType('create')
    setRollCallModalVisible(true)
  }


  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]}>
          <Col span={16} xs={16} className="mb-24">
            <Card
              className="header-solid h-full ant-card-p-0"
              title={
                <>
                  <Row
                    gutter={[24, 0]}
                    className="ant-row-flex ant-row-flex-middle"
                  >
                    <Col xs={24} md={12}>
                      <h6 className="font-semibold m-0">{subjectInfo.name}</h6>
                    </Col>
                    
                  </Row>
                </>
              }
            >
              <Row gutter={[24, 0]} style={{ padding: '0 20px' }}>
                <Col span={3}>
                  <Card>
                    <Statistic
                      title="Đúng giờ"
                      value={1}
                      valueStyle={{ color: '#3f8600' }}
                    />
                  </Card>
                </Col>
                <Col span={3}>
                  <Card>
                    <Statistic
                      title="Trễ"
                      value={2}
                      valueStyle={{ color: '#3f8600' }}
                    />
                  </Card>
                </Col>
                <Col span={3}>
                  <Card>
                    <Statistic
                      title="Vắng"
                      value={3}
                      valueStyle={{ color: '#3f8600' }}
                    />
                  </Card>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={8} xs={8} className="mb-24">
            <Card
              className="header-solid h-full ant-card-p-0"
              title={
                <>
                  <Row
                    gutter={[24, 0]}
                    className="ant-row-flex ant-row-flex-middle"
                  >
                    <Col xs={24} md={12}>
                      <h6 className="font-semibold m-0">Quét Mã Để Điểm Danh</h6>
                    </Col>
                  </Row>
                </>
              }
            >
              <Image
                width={200}
                src={reportInfo.qrUrl}
                style={{
                  textAlign: 'center'
                }}
              />
            </Card>
          </Col>
          <Col xs="24" xl={24}>
            <Card
              bordered={false}
              className="criclebox tablespace mb-24"
              title={`Danh Sách Điểm Danh - ${filterCount}`}
              extra={
                <Space>
                  <Button onClick={fetchData}>
                    Làm Mới
                  </Button>
                  <Button type="primary" href={URLUtils.buildBeURL(`/reports/${reportInfo.rollcallReportId}/download`)} style={{lineHeight: '40px'}}>Xuất danh sách</Button>
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
                    showPagination={false}
                  />
                </div>
              </Spin>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default RollCallPage;
