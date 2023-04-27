import { useState } from "react";
import {
  Form,
  Link,
  useActionData,
  useNavigate,
  useNavigation,
  useSearchParams,
} from "react-router-dom";
import classes from "./AuthForm.module.css";
function AuthForm() {
  // const [isLogin, setIsLogin] = useState(true);
  // function switchAuthHandler() {
  //   setIsLogin((isCurrentlyLogin) => !isCurrentlyLogin);
  // }
  const navigate = useNavigation();
  const data = useActionData();
  const [searchparam] = useSearchParams();
  const isLogin = searchparam.get("mode") === "Login";
  const isSubmit = navigate.state === "submitting";
  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        <p>
          {data && data.errors && (
            <ul>
              {Object.values(data.errors).map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )}
          {data && data.message && <ul>{data.message}</ul>}
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "SignUp" : "Login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button disabled={isSubmit}>
            {isSubmit ? "Submiting..." : "Save"}
          </button>
        </div>
      </Form>
    </>
  );
}
export default AuthForm;
