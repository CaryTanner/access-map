import React, { useEffect, useState } from "react";
import {
  Form,

  Button,
  
  AutoComplete,
} from "antd";
//import { EnvironmentOutlined } from "@ant-design/icons";
import { useDebounce } from "../../../utils/useDebounce";
import { forwardGeoSearch } from '../../../api/geocodeAPI'
import { useDispatch } from "react-redux";
import {setMarkerCoor} from '../../../redux/slices/mapSlice'

//options for autocomplete dropdown
const { Option } = AutoComplete;


export default function LocationForwardGeo() {
  const [searchValue, setSearchValue] = useState("");
  
  const [suggestions, setSuggestions] = useState('');
  const debounceSearchQuery = useDebounce(searchValue, 500)
  
  const onSearch = (term) => {
      setSearchValue(term)
    }
 
  useEffect(() => {
    let search = async () => {
      if(searchValue) {
      let results = await forwardGeoSearch(debounceSearchQuery)
      
      setSuggestions(results)
      }
    }
    search()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceSearchQuery])

  //set marker on map for selected location
const dispatch = useDispatch()

  const onSelect = (data) => {
    console.log("onSelect", data);
    dispatch(setMarkerCoor(data[1]))
  };

  
  
  
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

          /// add rule to validate less than 256 characters and no semicolons?

          aria-label="Location address search"
          
        >
          <AutoComplete
            // style={{
            //   width: 200,
            // }}
            onSelect={onSelect}
            onSearch={onSearch}
            placeholder="Location or Address"
          >
            {suggestions && suggestions.data.features.map((sug, i) => (
              <Option key={i} value={[sug.place_name, sug.geometry.coordinates ]}>
                {sug.place_name}
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
