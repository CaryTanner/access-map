import React, { useEffect } from "react";
import styles from "./MapLanding.module.css";
import ReportMap from "../ReportMap/ReportMap";
import ReportList from "../ReportList/ReportList";
import ReportFilter from "../ReportFilter/ReportFilter";
import { Col, Row, Grid, Typography } from "antd";
import { useDispatch } from "react-redux";
import { fetchAllReports } from "../../redux/slices/reportSlice";
import circle2 from "../../images/circle2.png";
import roadblock2 from "../../images/roadblock2.png";
import triangle2 from "../../images/triangle2.png";
import square2 from "../../images/square2.png";
import { useRouter } from "../../utils/useRouter";
import MakeReport from '../MakeReport/MakeReport'

export default function MapLanding() {
  const router = useRouter();
  const showMakeReport = router.match.path === "/map/makereport"
  const showReportList = router.match.path === "/map/reports"

  const { Text } = Typography;
  const { useBreakpoint } = Grid;
  const { xs, sm } = useBreakpoint();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllReports());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const legend = () => {
    return (
      <div className={styles.legend}>
        <div>
          <img src={roadblock2} alt="red roadblock symbol"></img>
          <Text>&nbsp;Reported</Text>
        </div>
        <div>
          <img src={square2} alt="yellow square"></img>
          <Text>&nbsp;Scheduled</Text>
        </div>
        <div>
          <img src={circle2} alt="green circle"></img>
          <Text>&nbsp;Fixed</Text>
        </div>
        <div>
          <img src={triangle2} alt="blue triangle"></img>
          <Text>&nbsp;Unresolved</Text>
        </div>
      </div>
    );
  };

  return (
    <Row justify="space-between" gutter={16}>
      <Col md={10} sm={24}>
        <a href="#map" className={styles.skipToMap}>
          Skip to Map
        </a>
        {showMakeReport && <MakeReport />}
        {showReportList && 
        <>
        <ReportFilter />
        <ReportList />
        </>}
      </Col>
      <Col md={14} sm={24}>
        {legend()}
        <ReportMap />
      </Col>
    </Row>
  );
}
