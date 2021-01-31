import React, { useEffect } from "react";
import styles from "./ReportFilter.module.css";
import { Typography, Radio } from "antd";
import { useDispatch } from "react-redux";
import { setReportsFilter } from "../../redux/slices/mapSlice";

export default function ReportFilter() {
  const dispatch = useDispatch();

  const dispatchFilter = (event) => {
    // send button value as an array redux state
    //written as "status2 + "-layer" for layer filter
    let filter = event.target.value.split(" ");

    dispatch(setReportsFilter(filter));
  };

  return (
    <>
      <Typography.Title level={3}>Accessibility Reports</Typography.Title>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          margin: "1.5rem 0 .5rem 0",
        }}
      >
        <Radio.Group
          tabIndex={0}
          size="small"
          onChange={dispatchFilter}
          defaultValue="Reported-layer Scheduled-layer Fixed-layer Unresolved-layer"
          buttonStyle="solid"
          ariaRole="radiogroup"
        >
          <Radio.Button value="Reported-layer Scheduled-layer Fixed-layer Unresolved-layer">
            Show all
          </Radio.Button>
          <Radio.Button value="Reported-layer">Reported</Radio.Button>
          <Radio.Button value="Scheduled-layer">Scheduled</Radio.Button>
          <Radio.Button value="Fixed-layer">Fixed</Radio.Button>
          <Radio.Button value="Unresolved-layer">Unresolved</Radio.Button>
        </Radio.Group>
      </div>
    </>
  );
}
