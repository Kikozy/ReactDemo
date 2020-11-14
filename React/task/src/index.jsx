import React from 'react';
import ReactDOM from 'react-dom';
import Home from "./page/Home"
import { Layout , Menu } from 'antd';
import {OrderedListOutlined , CheckCircleOutlined , ClockCircleOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './css/index.css'
const { Header, Footer, Content} = Layout;



function Index(){
  return(
    <Layout>
      <Header className="index-header">
        <Menu className="index-header-nav"  mode="horizontal">
          <div className="logo" style={{float:"left"}}>StudyLog</div>
          <Menu.Item className="index-nav-item" key="task-list" icon={<OrderedListOutlined />}>目标列表</Menu.Item>
          <Menu.Item className="index-nav-item" key="wc-list" icon={<CheckCircleOutlined />}>完成目标</Menu.Item>
          <Menu.Item className="index-nav-item" key="time-log" icon={<ClockCircleOutlined />}>时长统计</Menu.Item>
        </Menu>
      </Header>
      <Content className="index-conten">
        <Home></Home>
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  )
}

ReactDOM.render(
    <Index />,
  document.getElementById('root')
);