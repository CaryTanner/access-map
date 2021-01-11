import React, { useEffect, useState } from "react";
import styles from "./ReportsList.module.css";
import { useSelector, useDispatch } from "react-redux";
import { Typography, Divider, Button, Skeleton } from "antd";
import QueueAnim from "rc-queue-anim";
import { handleEnterKey } from "../../../utils/utils";
import { useRouter } from "../../../utils/useRouter";
import { EnvironmentOutlined } from "@ant-design/icons";
import circle2 from '../../../images/circle2.png';
import roadblock2 from '../../../images/roadblock2.png'
import triangle2 from '../../../images/triangle2.png'
import square2 from '../../../images/square2.png'
//import {setPopupCoor} from '../../redux/slices/reportSlice'

export default function ReportList() {
    const dispatch = useDispatch()
  const { visibleReports, popupCoor } = useSelector((state) => state.reports);

  const [currentReports, setCurrentReports] = useState(null);

  const router = useRouter();

  useEffect(() => {
    
  }, );

  const item = (report) => {
    const { title, status, category, id, formattedAddress } = report.properties;
    const { coordinates } = report.geometry 

    //image next to status
    let imgSrc = {
      Reported: roadblock2,
      Scheduled: square2,
      Fixed: circle2,
      Unresolved: triangle2,
    };

    let dotStyle = {
      display: "inline-block",
      height: ".75rem",
      width: ".75rem",
        
    };

    const handleClick = () => {
      router.push(`/reports/${id}`);
    };

    // "hover" or focus sends coordinates to redux to send to map to show popup over report marker
    const sendCoor = (data) => {
        //dispatch(setPopupCoor(data))
    }

    return (
      <QueueAnim>
        <div
        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
        tabIndex={0}
          className={styles.listItem}
          id={`listItem-${id}`}
          key={`key-${id}`}
          onMouseEnter={()=> sendCoor({coordinates, title})}
          onFocus={()=> sendCoor({coordinates, title})}
          onMouseLeave={()=> sendCoor(null)}
          onBlur={() => sendCoor(null)}
        >
          <Divider orientation="left">{title}</Divider>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem"}}>
            <div>
              <img src={imgSrc[status]} alt="Colored symbol for status" style={dotStyle}></img>&nbsp;{status}
            </div>

            <div>Category: {category}</div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{maxWidth: "40%"}}>{formattedAddress}</div>
            <Button
              type="primary"
              onClick={handleClick}
              onKeyPress={() => handleEnterKey(handleClick())}
            >
              Full Details
            </Button>
          </div>
        </div>
      </QueueAnim>
    );
  };

  return (
    <>
      <div className={styles.listContainer}>
        {!currentReports ? (
          <>
            <Skeleton loading={!currentReports} active>
              <Skeleton.Button loading={!currentReports}></Skeleton.Button>
            </Skeleton>
            <Skeleton loading={!currentReports} active>
              <Skeleton.Button loading={!currentReports}></Skeleton.Button>
            </Skeleton>
            <Skeleton loading={!currentReports} active>
              <Skeleton.Button loading={!currentReports}></Skeleton.Button>
            </Skeleton>
            <Skeleton loading={!currentReports} active>
              <Skeleton.Button loading={!currentReports}></Skeleton.Button>
            </Skeleton>
          </>
        ) : null}

        {currentReports && currentReports.length === 0 ? (
          <div className={styles.moveToFind}>
            <EnvironmentOutlined />

            <Typography.Title level={5}>
              &nbsp;Move map to find reports
            </Typography.Title>
          </div>
        ) : null}
        {currentReports && currentReports.map((report) => item(report))}
      </div>
    </>
  );
}