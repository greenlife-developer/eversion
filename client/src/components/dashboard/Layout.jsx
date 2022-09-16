import React, {useState, useEffect} from "react";
import "antd/dist/antd.min.css";
import { Tabs } from "antd";
import "./dashboard.css";
import BookedItems from "./Table";

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

  const uploads = <h4 style={{color: "white", backgroundColor: "blue", padding: "5px", borderRadius: "5px"}} >Uploads</h4>

  return (
    <div className="container-fluid dashboard">
      <Tabs tabPosition={isMobile ? "top" : "left"}>
        <TabPane tab={uploads} key="1">
          Content of Tab 1
        </TabPane>
        <TabPane tab="Design Requests" key="2">
          <BookedItems />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Layout;