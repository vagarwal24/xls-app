import axios from "axios";
import {
  API_GET_AGENT_PRODUCTIVITY_REPORT,
  API_GET_DDR_EMAIL_INVOICE_DATA,
  API_GET_USER_REPORT_INFO,
} from ".";

export const getAgentProductivityReport = (data, func) => {
  axios.post(API_GET_AGENT_PRODUCTIVITY_REPORT, data, func).then((res) => {
    console.log(res);
    func(res.data.data);
  });
};

export const getDdrEmailInvoiceData = (data, func) => {
  axios.post(API_GET_DDR_EMAIL_INVOICE_DATA, data, func).then((res) => {
    console.log(res);
    func(res.data.data);
  });
};

export const getUserReportInfo = (data, func) => {
  axios.get(API_GET_USER_REPORT_INFO, data, func).then((res) => {
    // console.log(res);
    func(res.data.data);
  });
};
