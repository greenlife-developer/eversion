import React, { useState, useEffect } from 'react';
import "antd/dist/antd.min.css";
import { DownOutlined } from '@ant-design/icons';
import {Space, Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Age',
    dataIndex: 'age',
    sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'Address',
    dataIndex: 'address',
    filters: [
      {
        text: 'London',
        value: 'London',
      },
      {
        text: 'New York',
        value: 'New York',
      },
    ],
    onFilter: (value, record) => record.address.indexOf(value) === 0,
  },
  {
    title: 'Action',
    key: 'action',
    sorter: true,
    render: () => (
      <Space size="middle">
        <a href='/'>Delete</a>
        <a href='/'>
          <Space>
            More actions
            <DownOutlined />
          </Space>
        </a>
      </Space>
    ),
  },
];
const data = [];

for (let i = 1; i <= 10; i++) {
  data.push({
    key: i,
    name: 'John Brown',
    age: Number(`${i}2`),
    address: `New York No. ${i} Lake Park`,
    description: `My name is John Brown, I am ${i}2 years old, living in New York No. ${i} Lake Park.`,
  });
}

const defaultExpandable = {
  expandedRowRender: (record) => <p>{record.description}</p>,
};

const defaultTitle = () => 'Here is title';

const defaultFooter = () => 'Here is footer';

const BookedItems = () => {
  const [bordered, setBordered] = useState(true);
  const [size, setSize] = useState('large');
  const [expandable, setExpandable] = useState(defaultExpandable);
  const [showTitle, setShowTitle] = useState(true);
  const [showHeader, setShowHeader] = useState(true);
  const [showfooter, setShowFooter] = useState(true);
  const [tableLayout, setTableLayout] = useState(undefined);
  const [top, setTop] = useState('none');
  const [bottom, setBottom] = useState('bottomRight');
  const [ellipsis, setEllipsis] = useState(false);
  const [yScroll, setYScroll] = useState(false);
  const [xScroll, setXScroll] = useState(true);

  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetch("/book")
    .then((res) => res.json())
    .then((data) => {
      if (data !== undefined) {
        setIsLogin(true);
        console.log(data)
        setUser(data);
      }
    });
  }, [])

  const scroll = {};

  if (yScroll) {
    scroll.y = 240;
  }

  if (xScroll) {
    scroll.x = '100vw';
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