import React, {useState, useEffect} from "react";
import "antd/dist/antd.css";
import { Tabs } from "antd";
import "./dashboard.css";

const { TabPane } = Tabs;

const Layout = () => {
  const [isMobile, setIsMobile] = useState(false);

  //choose the screen size
  const handleResize = () => {
    if (window.innerWidth <= 425) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  // create an event listener
  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  return (
    <div className="container-fluid dashboard">
      <Tabs tabPosition={isMobile ? "top" : "left"}>
        <TabPane tab="Uploads" key="1">
          Content of Tab 1
        </TabPane>
        <TabPane tab="Design Requests" key="2">
          Content of Tab 2
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Layout;
