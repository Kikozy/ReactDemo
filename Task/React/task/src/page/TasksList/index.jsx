import React,{Component , Fragment} from "react"
import {Button, Row, Col , Card ,Statistic ,Progress ,Badge } from "antd"
import echarts from 'echarts/lib/echarts';

import  'echarts/lib/chart/bar';
import {PlusSquareFilled} from '@ant-design/icons'
import "./main.css"

class TasksList extends Component{
    constructor(props){
        super(props)
        this.state = {
        }
        this.showAddTasks = this.showAddTasks.bind(this)
    }
    showAddTasks(){
        console.log("展示任务增加")
    }
    render(){
        return(
            <Fragment>
                <Row>
                    <Col span={24}>
                        <Row style={{background: "#ddd",height: "150px"}}>
                            <Button
                            type="primary"
                            style={{top: "50%",left: "50%",transform: "translate(-50%,-50%)"}}
                            size={"large"}
                            onClick={()=>{this.showAddTasks()}}
                            >
                                <PlusSquareFilled />新建任务
                            </Button>
                        </Row>
                    </Col>
                </Row>
                <Row gutter={[10,5]} style={{boxSizing: "border-box",padding: "5px"}}>
                    <Col xs={12} sm={8} md={8} lg={8} xl={8}>
                    <Badge.Ribbon text="Pushes open the window">
                        <Card title="Card title" bordered={true}>
                                <Row>
                                    <Col span={24}>
                                        <Statistic title="Unmerged" value={93} suffix="/ 100" />
                                    </Col>
                                    <Col>
                                        <Progress percent={99} steps={5} size="large" strokeColor="#52c41a" />
                                    </Col>
                                </Row>
                            </Card>
                    </Badge.Ribbon>
                    </Col>
                    <Col xs={12} sm={8} md={8} lg={8} xl={8}>
                    <Badge.Ribbon text="Pushes open the window">
                        <Card title="Card title" bordered={true}>
                                <Row>
                                    <Col span={24}>
                                        <Statistic title="Unmerged" value={93} suffix="/ 100" />
                                    </Col>
                                    <Col>
                                        <Progress percent={99} steps={5} size="large" strokeColor="#52c41a" />
                                    </Col>
                                </Row>
                            </Card>
                    </Badge.Ribbon>
                    </Col>
                    
                </Row>
            </Fragment>
        )
    }
}
export default TasksList