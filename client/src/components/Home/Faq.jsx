import React from "react";
import "antd/dist/antd.css";
import { Collapse } from "antd";

const { Panel } = Collapse;

const Faq = () => {
  return (
    <>
      <Collapse defaultActiveKey={["1"]} expandIconPosition="end">
        <Panel header="Question 1" key="1">
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
              similique tempora deleniti ad voluptatum modi iure cumque nisi
              perspiciatis doloribus sapiente natus, doloremque, nam cupiditate
              mollitia eius id molestiae rem.
            </p>
          </div>
        </Panel>
        <Panel header="Question 2" key="2">
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
              similique tempora deleniti ad voluptatum modi iure cumque nisi
              perspiciatis doloribus sapiente natus, doloremque, nam cupiditate
              mollitia eius id molestiae rem.
            </p>
          </div>
        </Panel>
        <Panel header="Question 3" key="3">
          <div>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
              similique tempora deleniti ad voluptatum modi iure cumque nisi
              perspiciatis doloribus sapiente natus, doloremque, nam cupiditate
              mollitia eius id molestiae rem.
            </p>
          </div>
        </Panel>
      </Collapse>
    </>
  );
};

export default Faq;
