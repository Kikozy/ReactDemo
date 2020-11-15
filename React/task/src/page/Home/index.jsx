import React,{Component,Fragment} from "react"
import axios from "axios"
import { Card, Col, Row , Switch ,Progress, Statistic ,Button,Badge} from 'antd';
import {SettingOutlined,EditOutlined,EllipsisOutlined} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './main.css'
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK
class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            soonTasks: [],
            missTasks: []
        }
        this.taskRunAndStop = this.taskRunAndStop.bind(this)
    }
    
    componentDidMount(){
        axios.post("http://localhost:8848/api/tasksList/soon")
        .then((res)=>{
            this.setState({soonTasks: res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
        axios.post("http://localhost:8848/api/tasksList/miss")
        .then((res)=>{
            this.setState({missTasks: res.data},()=>{console.log(this.state)})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    //控制任务暂停还是运行
    taskRunAndStop(index){
        //任务状态
        let tasks_stop = this.state.soonTasks[index].tasks_stop
        tasks_stop===1?tasks_stop=0:tasks_stop=1
        let newState = this.state.soonTasks
        newState[index].tasks_stop = tasks_stop
        this.setState({
            soonTasks: newState,
        },()=>{
            console.log("数据已经发生更改")
        })
    }
    render(){
        return(
            <Fragment>
                {/* 图表展示区域*/}
                <div className="charts-area">
                </div>
                {/* 所有任务状态*/}
                <div className="index-near-task">
                    <Row gutter={[5,5]}>
                        {this.state.soonTasks.map((value,index)=>{
                            return(
                                //是暂停任务
                                value.tasks_stop === 0?<Col span={8} key={index+value}>
                                    <Card dis title={ <Badge status="default"
                                    text={value.tasks_name} />}
                                    bordered={false}
                                    extra={<Switch checkedChildren="开始" unCheckedChildren="暂停" onChange={()=>{this.taskRunAndStop(index)}}></Switch>}
                                    >
                                            <Row gutter={[0,0]}>
                                                <Col span={12}><Statistic title="打卡次数" value={93} suffix="/ 100" /></Col>
                                                <Col span={12}><Progress type="circle" percent={93} width={70} /> </Col>
                                            </Row>
                                    </Card>
                                </Col>:
                                //不是暂停任务
                                <Col span={8} key={index+value}>
                                <Card title={ <Badge status="processing"
                                text={value.tasks_name} />}
                                bordered={false}
                                extra={<Switch checkedChildren="开始" unCheckedChildren="暂停" defaultChecked onChange={()=>{this.taskRunAndStop(index)}}></Switch>}
                                actions={[
                                    <SettingOutlined key="setting" />,
                                    <EditOutlined key="edit" />,
                                    <EllipsisOutlined key="ellipsis" />
                                  ]}
                                >
                                        <Row gutter={[5,5]}>
                                            <Col span={8}><Progress type="circle" percent={93} width={70} /></Col>
                                            <Col span={8}><Statistic title="打卡次数" value={93} suffix="/ 100" /></Col>
                                            <Col span={8}><Countdown title="剩余时间" value={deadline}/></Col>
                                    </Row> 
                                </Card>
                            </Col>
                            )
                        })}
                    </Row>
                </div>
            </Fragment>
        )
    }
}
export default Home