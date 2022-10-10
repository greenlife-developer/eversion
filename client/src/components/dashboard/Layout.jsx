import React, { useState, useEffect } from "react";
import "antd/dist/antd.min.css";
import { Tabs } from "antd";
import "./dashboard.css";
import BookedItems from "./Table";
import UploadedItems from "./UploadedItems";

const { TabPane } = Tabs;

const Layout = () => {
  // const [isMobile, setIsMobile] = useState(false);

  // const handleResize = () => {
  //   if (window.innerWidth <= 425) {
  //     setIsMobile(true);
  //   } else {
  //     setIsMobile(false);
  //   }
  // }

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  // });

  return (
    <div className="container-fluid dashboard">
      <Tabs tabPosition={window.innerWidth <= 425 ? "top" : "left"}>
        <TabPane tab="Uploads" key="1">
          <UploadedItems />
        </TabPane>
        <TabPane tab="Design Requests" key="2">
          <BookedItems />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Layout;
