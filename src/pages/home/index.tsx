import { useInfoUser } from "hooks/user";
import React, { useEffect } from "react";
import { LayoutApp } from "templates/LayoutApp";
import { SidebarLeft } from "./components/SidebarLeft";
import { SidebarRight } from "./components/SidebarRight";

const Homepage = () => {
  const infoUser = useInfoUser();

  useEffect(() => {
    const token = localStorage.getItem("token");

    console.log(token);

    if (token) {
      infoUser.mutate(token);
    }
  }, []);

  useEffect(() => {
    if (infoUser.data) {
      console.log(infoUser.data);
    }

    if (infoUser.error) {
      console.log(infoUser.error);
    }
  }, [infoUser.data, infoUser.error]);

  return (
    // <>Homepage</>
    <LayoutApp
      sidebarLeft={<SidebarLeft />}
      sidebarRight={<SidebarRight />}
    ></LayoutApp>
  );
};
export default Homepage;
