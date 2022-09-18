import React, { useState, useEffect } from "react";
import "antd/dist/antd.min.css";
import { DownOutlined } from "@ant-design/icons";
import { Space, Table } from "antd";
import styles from "../../styles";

console.log("styles", styles);

const columns = [
  {
    title: "Name",
    dataIndex: "name",
  },
  {
    title: "Photo",
    dataIndex: "photo",
  },
  {
    title: "WhatsApp no.",
    dataIndex: "number",
  },
  {
    title: "Has fabric?",
    dataIndex: "fabric",
  },
  {
    title: "Status",
    dataIndex: "status",
  },
];

const defaultExpandable = {
  expandedRowRender: (record) => <p>{record.description}</p>,
};

const defaultTitle = () => "Here is title";

const defaultFooter = () => "Here is footer";

const BookedItems = () => {
  const [bordered, setBordered] = useState(true);
  const [size, setSize] = useState("large");
  const [expandable, setExpandable] = useState(defaultExpandable);
  const [showTitle, setShowTitle] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [showfooter, setShowFooter] = useState(true);
  const [tableLayout, setTableLayout] = useState(undefined);
  const [top, setTop] = useState("none");
  const [bottom, setBottom] = useState("bottomRight");
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState(true);

  const [isLogin, setIsLogin] = useState(false);
  const [booked, setBooked] = useState(null);

  useEffect(() => {
    fetch("/book")
      .then((res) => res.json())
      .then((data) => {
        if (data !== undefined) {
          setIsLogin(true);
          console.log(data.booked);
          setBooked(data.booked);
        }
      });
  }, []);

  const data = [];

  console.log("This is the ahboard", booked);

  if (booked) {
    booked.map((book, index) => {
      const result = styles.filter((std) => {
        return std.name === book.sew;
      });

      return data.push({
        key: index,
        name: book.user.firstName + " " + book.user.lastName,
        photo: <img src="3a324ca81ed316d7422dccc7daeebe7c" width="200px" alt="selected style" />,
        number: book.number,
        status: "progress",
        fabric: book.fabric ? book.fabric.toUpperCase() : "NO",
        description: (
          <div className="description">
            <div className="img">
              <img
                height="250px"
                style={{ objectFit: "cover" }}
                width="260px"
                src={result && result.length === 1 ? result[0].img : null}
                alt="selected style"
              />
            </div>
            <div>
              <h2>{book.sew + ", " + book.styles}</h2>
              <h6><b>Measurement:</b> <span>{book.measurement}</span></h6>
              <h6><b>Address:</b> <span>{book.address}</span></h6>
              <h6><b>City:</b> <span>{book.city[0].name}</span></h6>
              <h6><b>State:</b> <span>{book.state[0].name}</span></h6>
              {
                book.nostyle !== null ? <h6> <input type="select" /> <span>I did not find the style I want</span></h6> : null
              }
            </div>
          </div>
        ),
      });
    });
  }

  const scroll = {};

  if (yScroll) {
    scroll.y = 240;
  }

  if (xScroll) {
    scroll.x = "100vw";
  }

  const tableColumns = columns.map((item) => ({ ...item, ellipsis }));

  const tableProps = {
    bordered,
    size,
    expandable,
    title: showTitle ? defaultTitle : undefined,
    showHeader,
    footer: showfooter ? defaultFooter : undefined,
    scroll,
    tableLayout,
  };
  return (
    <>
      <Table
        {...tableProps}
        pagination={{
          position: [top, bottom],
        }}
        columns={tableColumns}
        dataSource={data}
        scroll={scroll}
      />
    </>
  );
};

export default BookedItems;
