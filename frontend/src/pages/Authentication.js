import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";
function AuthenticationPage() {
  return <AuthForm />;
}
export default AuthenticationPage;
export const auth = async ({ request }) => {
  const authSearch = new URL(request.url).searchParams;
  const mode = authSearch.get("mode");
  if (mode !== "Login" && mode !== "SignUp") {
    throw json({ message: "go to the reate page " }, { status: 422 });
  }
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };
  const response = await fetch("http://localhost:8080/" + mode, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });
  if (response.status === 422 || response.status === 401) {
    // throw json({ message: "error" }, { status: 422 });
    return response; //useActionData to get this data
  }
  if (!response.ok) {
    throw json({ message: "there error" }, { status: 500 });
  }
  const resdata = await response.json();
  const token = resdata.token;
  localStorage.setItem("token", token);
  const expiretTime = new Date();
  expiretTime.setHours(expiretTime.getHours() + 1);
  localStorage.setItem("time", expiretTime.toISOString());
  return redirect("/");
};
