import { redirect } from "react-router-dom";

export const tokenFunction = () => {
  const data = localStorage.getItem("token");

  if (!data) {
    return null;
  }
  const time = durationTime();
  if (time < 0) {
    return "Expired";
  }
  return data;
};
export const durationTime = () => {
  const tokenTimeLogin = localStorage.getItem("time");
  const durationToken = new Date(tokenTimeLogin);
  // const tokenTime = durationToken.setTime();
  const nowTime = new Date();
  // const now = nowTime.setTime();
  // const duration = tokenTime - now;
  const duration = durationToken.getTime() - nowTime.getTime();
  return duration;
};
export const stateToken = () => {
  return tokenFunction();
};
export const CheckAuth = () => {
  const token = tokenFunction();
  if (!token) {
    return redirect("/auth");
  }
  // return null;
};
