import { useEffect } from "react";
import {
  Outlet,
  useLoaderData,
  useNavigation,
  useSubmit,
} from "react-router-dom";

import MainNavigation from "../components/MainNavigation";
import { durationTime } from "../util/authtoken";

function RootLayout() {
  // const navigation = useNavigation();
  const token = useLoaderData();
  const time = durationTime();
  const Submit = useSubmit();
  useEffect(() => {
    if (token === "Expired") {
      Submit(null, { action: "/logout", method: "post" });
      return;
    }
    if (!token) {
      return;
    }
    setTimeout(() => {
      Submit(null, { action: "/logout", method: "post" });
    }, time); //logout after 1 hour
  }, [token, Submit]);
  return (
    <>
      <MainNavigation />
      <main>
        {/* {navigation.state === 'loading' && <p>Loading...</p>} */}
        <Outlet />
      </main>
    </>
  );
}

export default RootLayout;
