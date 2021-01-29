import React, { useState } from "react";
import {
  Form,
  Input,
  Button,
  Row,
  Col,
  Typography,
  Alert,
  message,
  AutoComplete,
} from "antd";
import { EnvironmentOutlined } from "@ant-design/icons";
import { useDebounce } from "../../../utils/useDebounce";
import { forwardGeoSearch } from '../../../api/geocodeAPI'



export default function LocationForwardGeo() {
  const [searchValue, setSearchValue] = useState("");
  const [options, setOptions] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const debounceSearchQuery = useDebounce(searchValue, 300)
  
  const onSearch = async () => {
    if(debounceSearchQuery){
      let results = await forwardGeoSearch(debounceSearchQuery)
      setSuggestions(results)
    }
  };

  const onSelect = (data) => {
    console.log("onSelect", data);
  };

  const onChange = (data) => {
    setSearchValue(data);
  };
  //options for autocomplete dropdown
  const { Option } = AutoComplete;
  return (
    <>
      <Form
        onFinish={(values) => console.log(values)}
        initialValues={{ remember: true }}
      >
        <Form.Item
          label="Location"
          name="forwardLocation"
          rules={[{ required: true, message: "Please select a location" }]}

          /// add rule to validate less than 256 characters and no semicolons

          aria-label="Location address search"
        >
          <AutoComplete
            style={{
              width: 200,
            }}
            onSelect={onSelect}
            onSearch={onSearch}
            placeholder="Location or Address"
          >
            {suggestions.map((sug, i) => (
              <Option key={i} value={sug}>
                {sug}
              </Option>
            ))}
          </AutoComplete>
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
      </Form>
    </>
  );
}
