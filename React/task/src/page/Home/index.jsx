import React,{Component,Fragment} from "react"
import axios from "axios"
import { Card, Col, Row , Switch ,Progress, Statistic ,Button,Badge} from 'antd';
import {DeleteFilled} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './main.css'
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK
class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            tasksList: []
        }
        this.taskSate = this.taskSate.bind(this)
    }
    
    componentDidMount(){
        axios.post("http://localhost:8848/api/tasksList")
        .then((res)=>{
            this.setState({
                tasksList: res.data
            },()=>{
                console.log("数据更新完毕")
            }) 
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    taskSate(index){
        //任务状态
        let now = this.state.tasksList[index].tasks_stop
        now===1?now=0:now=1
        let newState = this.state.tasksList
        newState[index].tasks_stop = now
        this.setState({
            taskSate: newState
        },()=>{
            console.log("数据已经发生更改")
        })
        console.log(this.state.tasksList[index].tasks_stop)
    }
    render(){
        return(
            <Fragment>
                {/* 图表展示区域*/}
                <div className="charts-area">
                </div>
                {/* 最近的任务 最多显示 6条*/}
                <div className="index-near-task">
                    <Row gutter={[5,5]}>
                        {console.log(this.state.tasksList)}
                        {this.state.tasksList.map((value,index)=>{
                            return(
                                //是暂停任务
                                value.tasks_stop === 0?<Col span={8} key={index+value}>
                                    <Card title={ <Badge status="error"
                                    text={value.tasks_name} />}
                                    bordered={false}
                                    extra={<Switch checkedChildren="开始" unCheckedChildren="暂停" onChange={()=>{this.taskSate(index)}}></Switch>}>
                                            <Row gutter={[0,5]}>
                                                <Col span={5}><Progress type="circle" percent={93} width={70} /> </Col>
                                                <Col span={5}><Statistic title="打卡次数" value={93} suffix="/ 100" /></Col>
                                                <Col span={14}><Countdown title="截止时间" value={value.tasks_run_end_time} format="D 天 H 时 m 分 s 秒"/></Col>
                                        </Row> 
                                    </Card>
                                </Col>:
                                //不是暂停任务
                                <Col span={8} key={index+value}>
                                <Card title={ <Badge status="processing"
                                text={value.tasks_name} />}
                                bordered={false}
                                extra={<Switch checkedChildren="开始" unCheckedChildren="暂停" defaultChecked onChange={()=>{this.taskSate(index)}}></Switch>}>
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