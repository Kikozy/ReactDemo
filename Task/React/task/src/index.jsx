import React from 'react';
import ReactDOM from 'react-dom';
import { Menu , Row, Col ,ConfigProvider} from 'antd';
import { BrowserRouter as Router, Route, Link , Switch} from 'react-router-dom'
import {OrderedListOutlined , ClockCircleOutlined ,EditOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import zhCN from 'antd/es/locale/zh_CN';
import Home from "./page/Home"
import TasksList from "./page/TasksList"
//import './css/index.css'

function Index(){
  return(
    <Router>
      <header>
        <Row gutter={0}>
          <Col xs={0} sm={0} md={0} lg={2} xl={2}>留白</Col>
          <Col xs={24} sm={24} md={24} lg={20} xl={20}>
            <Menu className="index-header-nav" mode="horizontal">
              <Menu.Item className="index-nav-item" key="index" icon={<OrderedListOutlined />}><Link to="/">主页</Link></Menu.Item>
              <Menu.Item className="index-nav-item" key="task-list" icon={<OrderedListOutlined />}><Link to="/TasksList">任务列表</Link></Menu.Item>
              <Menu.Item className="index-nav-item" key="time-log" icon={<ClockCircleOutlined />}><Link to="/TimeLog">时长统计</Link></Menu.Item>
              <Menu.Item className="index-nav-item" key="edit-task" icon={<EditOutlined />}><Link to="/EditTasks">编辑任务</Link></Menu.Item>
            </Menu>
          </Col>
          <Col xs={0} sm={0} md={0} lg={2} xl={2}>留白</Col>
        </Row>
      </header>
      <main>
          <Row gutter={0}>
            <Col xs={0} sm={0} md={0} lg={2} xl={2}></Col>
            <Col xs={24} sm={24} md={24} lg={20} xl={20}>
              <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/TasksList" component={TasksList}></Route>
              </Switch>
            </Col>
            <Col xs={0} sm={0} md={0} lg={2} xl={2}></Col>
          </Row>
      </main>
    </Router>
  )
}

ReactDOM.render(

  <ConfigProvider locale={zhCN}>
    <Index />
  </ConfigProvider>,
  document.getElementById('root')
);