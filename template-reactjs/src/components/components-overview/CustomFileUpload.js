import React from "react";

const CustomFileUpload = () => (
  <div>
    <div className="custom-file mb-3">
      <input type="file" className="custom-file-input" id="customFile1" />
      <label className="custom-file-label" htmlFor="customFile1">
        Choose file...
      </label>
    </div>
    <div className="custom-file mb-3">
      <input type="file" className="custom-file-input" id="customFile2" />
      <label className="custom-file-label-1" htmlFor="customFile2">
        Choose file...
      </label>
    </div>  
  </div>
);

export default CustomFileUpload;
