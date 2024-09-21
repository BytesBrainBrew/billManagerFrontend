import { Button, Container, Typography } from "@mui/material";
import { TableComponent } from "../../component/table/table";
import { AUTH_SERVICES } from "../../services/auth/authServices";
import { MouseEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { frontendUrl } from "../../shared/frontendUrl";
import { BILL_EXPENSES } from "../../services/billexpense/billExpenseServide";
import { billExpenseSchema } from "../../shared/responseSchema/billExpenseSchema";
import { statusCodeValue } from "../../shared/statusCode";


const InformationPage = () => {
  const navigate = useNavigate();
  const columnData = {
    Email: "Email",
    BillTitle: "BillTitle",
    Amount: "Amount",
  };
  const [billData,setBillData] = useState<billExpenseSchema[]>([])
  const logout = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const onSuccess = (res: any) => {
      console.log("data", res);
      navigate(frontendUrl.login);
    };
    const onError = (err: any) => {
      console.log("errr", err);
    };
    AUTH_SERVICES.logoutService(onSuccess, onError);
  };

  // get the bills
  const getBills = ()=>{
    const onSuccess=(res:any)=>{
      console.log("res",res)
      if(res.status === statusCodeValue.statusOk){
        setBillData(res.data.data)
      }
    }
    const onError =(err:any)=>{
      console.log("err",err)
    }
    BILL_EXPENSES.getBills(onSuccess,onError)
  }

  useEffect(()=>{
    getBills()
  },[])
  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Bill expenses
      </Typography>
      <Button
        style={{
          marginBottom: "15px",
        }}
        variant="contained"
        disableElevation
        onClick={() => navigate(frontendUrl.addBill)}
      >
        Add Bill
      </Button>
      <Button
        style={{
          marginBottom: "15px",
          float: "right",
          background: "red",
        }}
        variant="contained"
        disableElevation
        onClick={(e) => logout(e)}
      >
        Logout
      </Button>
      <TableComponent column={columnData} tableData={billData} />
    </Container>
  );
};

export default InformationPage;
