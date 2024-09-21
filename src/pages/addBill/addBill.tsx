import { Button, Grid, Paper, Typography } from "@mui/material";
import { TextFieldComponent } from "../../component/fieldType/TextField";
import { ChangeEvent, useState } from "react";
import { addBillType } from "../../shared/types/billType";
import { BILL_EXPENSES } from "../../services/billexpense/billExpenseServide";
import { addBillDTO } from "../../shared/DTO/billExpensesDTO";
import { statusCodeValue } from "../../shared/statusCode";
import { useNavigate } from "react-router-dom";
import { frontendUrl } from "../../shared/frontendUrl";
import { toast } from "react-toastify";

export function AddBill() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formDataValue, setFormDataValue] = useState<addBillType>({
    billTitle: {
      value: "",
      warning: false,
    },
    amount: {
      value: 0,
      warning: false,
    },
  });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormDataValue((prev) => ({
      ...prev,
      [name]: {
        value: value.trimStart(),
        warning: value === "",
      },
    }));
  };

  const validateData = () => {
    let data: addBillType = { ...formDataValue };
    data = {
      ...data,
      billTitle: {
        ...data.billTitle,
        warning: data.billTitle.value === "",
      },
      amount: {
        ...data.amount,
        warning: data.amount.value === 0,
      },
    };
    setFormDataValue({ ...data });
    if (!data.billTitle.warning && !data.amount.warning) {
      billAddService();
    }
  };

  const billAddService = () => {
    setLoading(true);
    const onSuccess = (res: any) => {
      setLoading(false);
      if (res.status === statusCodeValue.created) {
        navigate(frontendUrl.dataInfoPage);
      }
      console.log("res", res);
    };
    const onError = (err: any) => {
      setLoading(false);
      toast.error(err.response.data.message)
      console.log("err", err);
    };
    const body: addBillDTO = {
      billTitle: String(formDataValue.billTitle.value),
      amount: Number(formDataValue.amount.value),
    };
    BILL_EXPENSES.addBill(body, onSuccess, onError);
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Paper
        elevation={3}
        style={{
          padding: 30,
          maxWidth: 400,
          width: "100%",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Add Bill
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextFieldComponent
              label="Bill Title"
              error={formDataValue.billTitle.warning}
              onChange={onChange}
              errorMessage="enter title of the bill"
              value={formDataValue.billTitle.value}
              name={"billTitle"}
              type="text"
              placeholder="enter bill title"
            />
          </Grid>
          <Grid item xs={12}>
            <TextFieldComponent
              label="amount"
              error={formDataValue.amount.warning}
              onChange={onChange}
              errorMessage="enter amount"
              value={formDataValue.amount.value}
              name={"amount"}
              type="number"
              placeholder="enter your amount"
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              onClick={validateData}
            >
              Add Bill
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
