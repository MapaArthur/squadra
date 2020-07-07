import React from "react";
import Select from 'react-select';
import SelectStyles from "../../assets/shards-dashboard/styles/SelectStyles";

const MultiSelect = () => (
  <div>
    <Select
      isMulti
      required              
      classNamePrefix="select"                                
      placeholder="Choose multi..."          
      styles={SelectStyles}
      options={[ {value: "Blue", label: "Blue"}, {value: "Red", label: "Red"}, {value: "Yellow", label: "Yellow"} ]}
    />
  </div>
);

export default MultiSelect;
