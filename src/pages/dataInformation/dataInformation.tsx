import {
  Button,
  Container,
  Typography
} from "@mui/material";
import { TableComponent } from "../../component/table/table";
import { AUTH_SERVICES } from "../../services/auth/authServices";

const data = [
  {
    email: "john.doe@example.com",
    name: "John Doe",
    address: "123 Elm Street",
  },
  {
    email: "jane.smith@example.com",
    name: "Jane Smith",
    address: "456 Oak Avenue",
  },
  {
    email: "mike.jones@example.com",
    name: "Mike Jones",
    address: "789 Pine Road",
  },
];
const logout = ()=>{
  const onSuccess = (res:any)=>{
    console.log("data",res)
  }
  const onError  =(err:any)=>{
    console.log("errr",err)
  }
  AUTH_SERVICES.logoutService(onSuccess,onError)
}
const InformationPage = () => {
  const columnData = {
    email: "Email",
    name: "Name",
    address: "Address",
  };
  return (
    <Container>
      <Typography variant="h4" gutterBottom align="center" color="primary">
        Bill expenses
      </Typography>
      <Button style={{
        marginBottom: "15px",
        float:"right",
        background:"red"
      }} variant="contained" disableElevation
      onClick={()=>logout()}
      >
        Logout
      </Button>
      <TableComponent column={columnData} tableData={data} />
    </Container>
  );
};

export default InformationPage;
