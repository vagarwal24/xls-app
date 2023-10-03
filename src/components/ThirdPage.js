import { Button, TextField } from "@mui/material";
import "./../App.css";
import React, { useState } from "react";
import { getUserReportInfo } from "../api/datas";

const ThirdPage = () => {
  const [userName, setUserName] = useState("");
  const [format, setFormat] = useState("");
  const [data, setData] = useState([]);

  const handleSubmit = () => {
    getUserReportInfo(
      {
        user_id: userName,
        format: format,
      },
      setData
    );
    setUserName("");
    setFormat("");
  };
  console.log(data);

  return (
    <div className="th">
      <div className="th-main">
        <div className="th-sub">
          <div className="in-put">
            <TextField
              fullWidth
              label="User Name"
              name="text"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="in-put">
            <TextField
              fullWidth
              label="Format"
              name="text"
              type="text"
              value={format}
              onChange={(e) => setFormat(e.target.value)}
            />
          </div>
        </div>
        <div className="btn">
          <Button variant="contained" color="success" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ThirdPage;
