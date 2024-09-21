import { API_URL } from "../../shared/ApiUrl";
import { addBillDTO } from "../../shared/DTO/billExpensesDTO";
import { GetAPI, PostAPI } from "../globalMethodServices";

const addBill = (
  dto: addBillDTO,
  onSuccess: (res: any) => void = () => {},
  onError: (err: any) => void = () => {}
) => {
  PostAPI(API_URL.addBills, dto, {}, onSuccess, onError);
};
const getBills = (
  onSuccess: (res: any) => void = () => {},
  onError: (err: any) => void = () => {}
) => {
  GetAPI(API_URL.getBills, {}, onSuccess, onError);
};
export const BILL_EXPENSES = {
  addBill,
  getBills
};
