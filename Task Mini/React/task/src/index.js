import React, { Component } from "react"
import ReactDOM from "react-dom"
import {BrowserRouter as Router ,Route ,Link,Switch} from "react-router-dom"
import {Menu,Row ,Col ,Statistic ,Input ,Button} from "antd"
import Home from "./Home"
import Complete from "./Complete"
import axios from "axios"

import 'antd/dist/antd.css'
import { ArrowUpOutlined ,OrderedListOutlined  ,ClockCircleOutlined ,EditOutlined} from '@ant-design/icons'
import "./index.css"
const {TextArea} = Input
class Index extends Component{
  constructor(props){
    super(props)
    this.state={
      inpuNameValue: "",
      inputInfoValue: ""
    }
  }
  inputNameChange = (e)=>{
    this.setState({
      inpuNameValue: e.target.value
    })
  }
  inputInfoChange = (e)=>{
    this.setState({
      inputInfoValue: e.target.value
    })
  }
  addTask =()=>{
    let data = {
      name: this.state.inpuNameValue,
      info: this.state.inputInfoValue,
      complete: 0
    }
    axios.post("http://localhost:8848/api/AddTask",data)
      .then((data)=>{
        console.log("增加成功")
        this.render()
      })
      .catch(()=>{
        console.log("添加错误")
      })
  }
  render(){
    return(
      
      <Router>
        <header style={{background: "rgb(54,54,54)",height: "150px"}}></header>
        <main>
          <Row gutter={0}>
            <Col xs={0} sm={0} md={0} lg={2} xl={2}></Col>
            <Col xs={24} sm={24} md={24} lg={6} xl={6} xxl={6} style={{padding: "10px"}}>
              <Row gutter={[5,5]}>
                <Col xs={24} sm={8} md={6} lg={24} xl={24} xxl={24}>
                  <Menu className="index-header-nav" mode="vertical" defaultSelectedKeys="task-list">
                      <Menu.Item className="index-nav-item" key="task-list"  icon={<OrderedListOutlined />}><Link to="/">任务列表</Link></Menu.Item>
                      <Menu.Item className="index-nav-item" key="time-log" icon={<ClockCircleOutlined />}><Link to="/Complete">完成任务</Link></Menu.Item>
                  </Menu>
                </Col>
                <Col xs={24} sm={8} md={8} lg={24} xl={24} xxl={24}>
                  <Row>
                    <Col span={12}><Statistic title="今日任务" value={93} suffix="/ 100" /></Col>
                    <Col span={12}><Statistic title="比较昨日提升" value={11.28}precision={2}valueStyle={{ color: '#3f8600' }}prefix={<ArrowUpOutlined />}suffix="%"/></Col>
                  </Row>
                </Col>
                <Col className="add-task-area" xs={24} sm={8} md={10} lg={24} xl={24} xxl={24}>
                <header className="add-task-title">创建新的任务</header>
                  <Row gutter={[10,10]}>
                    <Col span={24}><Input placeholder="任务名称" value={this.state.inpuNameValue} onChange={this.inputNameChange}/></Col>
                    <Col span={24}><TextArea rows={4} value={this.state.inputInfoValue} onChange={this.inputInfoChange}/></Col>
                    <Col span={24}><Button type="primary" style={{width: "100%"}} onClick={this.addTask}>创建任务</Button></Col>
                  </Row>
                </Col>
              </Row>
            </Col>
            <Col xs={24} sm={24} md={24} lg={14} xl={14}>
              <Switch>
                <Route path="/" exact component={Home}></Route>
                <Route path="/Complete" component={Complete}></Route>
              </Switch>
            </Col>
            <Col xs={0} sm={0} md={0} lg={2} xl={2}></Col>
          </Row>
        </main>
      </Router>
    )
  }
}
ReactDOM.render(
  <Index/>
  ,document.getElementById('root'))