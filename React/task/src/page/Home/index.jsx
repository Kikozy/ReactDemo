import React,{Component,Fragment} from "react"
import axios from "axios"
import { Card, Col, Row , Switch ,Progress, Statistic ,Badge ,Collapse, Modal ,Descriptions} from 'antd';
import {DeleteFilled,EditFilled ,CheckSquareFilled} from '@ant-design/icons';
import 'antd/dist/antd.css';
import './main.css'
const { Panel } = Collapse;
const { Countdown } = Statistic;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK
class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            soonTasks: [],
            missTasks: [],
            submitTasksWindowInfo: {},
            submitWindowVisible: false,
            delTasksWindowInfo: {},
            delTasksWindowVisible: false,
            editTasksWindowInfo: {},
            editTasksWindowVisible: false
        }
        this.taskRunAndStop = this.taskRunAndStop.bind(this)
        this.showSubmitTasksWindow = this.showSubmitTasksWindow.bind(this)
        this.submitTasksWindowOk = this.submitTasksWindowOk.bind(this)
        this.submitTasksWindowCancel = this.submitTasksWindowCancel.bind(this)
        this.showDelWindow = this.showDelWindow.bind(this)
        this.delTasksWindowCancel = this.delTasksWindowCancel.bind(this)
        this.delTasksWindowOk = this.delTasksWindowOk.bind(this)
        this.editTasksWindowCancel = this.editTasksWindowCancel.bind(this)
        this.editTasksWindowOk = this.editTasksWindowOk.bind(this)
        this.editTasksWindowShow = this.editTasksWindowShow.bind(this)
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
    //打开提交窗口
    showSubmitTasksWindow(val){
        console.log("打开了提交窗口")
        this.setState({
            submitTasksWindowInfo: val,
            submitWindowVisible: true
        })
    }
    //提交窗口中确认提交
    submitTasksWindowOk(){
        console.log("我想提交了");
        this.setState({
            submitWindowVisible: false,
        });
      };
    //提交窗口中取消提交
    submitTasksWindowCancel(){
        console.log("我不提交了");
        this.setState({
            submitWindowVisible: false,
        });
      };
    //打开删除任务窗口
    showDelWindow(val){
        this.setState({
            delTasksWindowInfo: val,
            delTasksWindowVisible: true
        })
    }
    //取消删除任务窗口
    delTasksWindowCancel(){
        console.log("我不想删除了")
        this.setState({
            delTasksWindowVisible: false
        })
    }
    //确认删除任务窗口
    delTasksWindowOk(){
        console.log("我要删除任务"+this.state.delTasksWindowInfo.tasks_name)
        this.setState({
            delTasksWindowVisible: false
        })
    }
    //展示修改的窗口
    editTasksWindowShow(val){
        console.log("打开了修改窗口")
        this.setState({
            editTasksWindowInfo: val,
            editTasksWindowVisible: true
        })
    }
    //提交修改
    editTasksWindowOk(){
        console.log("提交修改")
        this.setState({
            editTasksWindowVisible: false
        })
    }
    //取消修改
    editTasksWindowCancel(){
        console.log("取消修改")
        this.setState({
            editTasksWindowVisible: false
        })
    }
    render(){
        return(
            <Fragment>
                <Row>
                    <Col span={24}>
                        <div className="charts-area" style={{background: "skyblue",height: "300px"}}></div>
                    </Col>
                </Row>
                <Row gutter={0}>
                    <Col span={24}>
                    <Modal
                    title={this.state.submitTasksWindowInfo.tasks_name}
                    visible={this.state.submitWindowVisible}
                    onOk={this.submitTasksWindowOk}
                    onCancel={this.submitTasksWindowCancel}
                    okText="提交"
                    cancelText="放弃"
                    >
                        <Descriptions title="" bordered column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 2 }}>
                            <Descriptions.Item label="任务名称">{this.state.submitTasksWindowInfo.tasks_name}</Descriptions.Item>
                            <Descriptions.Item label="任务类型">{this.state.submitTasksWindowInfo.tasks_type}</Descriptions.Item>
                            <Descriptions.Item label="上次签到">2018</Descriptions.Item>
                            <Descriptions.Item label="目标进度">{this.state.submitTasksWindowInfo.tasks_complete_tick}/{this.state.submitTasksWindowInfo.tasks_count}</Descriptions.Item>
                            <Descriptions.Item label="本次签到时间">2018-04-24 18:00:00</Descriptions.Item>
                        </Descriptions>
                    </Modal>
                    <Modal
                    title={this.state.delTasksWindowInfo.tasks_name}
                    visible={this.state.delTasksWindowVisible}
                    onOk={this.delTasksWindowOk}
                    onCancel={this.delTasksWindowCancel}
                    okText="删除"
                    cancelText="算了"
                    >
                        你确定要删除？
                    </Modal>
                    <Modal
                    title={this.state.editTasksWindowInfo.tasks_name}
                    visible={this.state.editTasksWindowVisible}
                    onOk={this.editTasksWindowOk}
                    onCancel={this.editTasksWindowCancel}
                    okText="保存"
                    cancelText="算了"
                    >
                        你确定要修改？
                    </Modal>
                        <Collapse defaultActiveKey={['1','2']}>
                            <Panel header="任务列表" key="1" >
                                <Row gutter={[5,0]}>
                                    <Col span={24}>
                                        <Row gutter={[{ xs: 0, sm: 5, md: 5, lg:10, xl: 10},{ xs: 5, sm: 5, md: 5, lg:10, xl: 10}]}>
                                            {this.state.soonTasks.map((value,index)=>{
                                                return(
                                                //是暂停任务
                                                    value.tasks_stop === 0?<Col xs={24} sm={12} md={12} lg={8} xl={8} key={index+value}>
                                                        <Card dis title={<Badge status="default" text={value.tasks_name} />}
                                                        bordered={true}
                                                        extra={<Switch checkedChildren="开始" unCheckedChildren="暂停" onChange={()=>{this.taskRunAndStop(index)}}></Switch>}
                                                        >
                                                            <Row gutter={[0,0]}>
                                                                <Col xs={18} sm={16} md={14} lg={14} xl={14}><Statistic title="任务打卡次数" value={93} suffix="/ 100" /></Col>
                                                                <Col xs={6} sm={8} md={10} lg={10} xl={10}><Progress type="circle" strokeColor={{from: '#ddd'}} percent={90} width={70}/></Col>
                                                                <Col span={24}><Countdown title="任务截止时间" value={deadline} format="D 天 H 时 m 分 s 秒" /></Col>
                                                            </Row>
                                                        </Card>
                                                    </Col>:
                                                    //不是暂停任务
                                                    <Col xs={24} sm={12} md={12} lg={8} xl={8} key={index+value}>
                                                        <Card title={ <Badge status="processing" text={value.tasks_name} />}
                                                        bordered={true}
                                                        extra={<Switch checkedChildren="开始" unCheckedChildren="暂停" defaultChecked onChange={()=>{this.taskRunAndStop(index)}}></Switch>}
                                                        actions={[
                                                            <CheckSquareFilled key="tasks-btn-ok" onClick={()=>{this.showSubmitTasksWindow(value)}} />,
                                                            <EditFilled key="tasks-btn-edit" onClick={()=>{this.editTasksWindowShow(value)}}/>,
                                                            <DeleteFilled key="tasks-btn-del" onClick={()=>{this.showDelWindow(value)}}/>
                                                        ]}
                                                        >
                                                            <Row gutter={[5,5]}>
                                                                <Col span={24}></Col>
                                                                <Col span={12}><Statistic title="打卡次数" value={93} suffix="/ 100" /></Col>
                                                                <Col span={12}><Countdown title="今日签到时间" value={deadline}/></Col>
                                                                <Col span={24}><Progress strokeColor={{from: '#108ee9',to: '#87d068'}} percent={10} status="active"/></Col>
                                                            </Row> 
                                                        </Card>
                                                    </Col>
                                                )
                                            })}
                                        </Row>
                                    </Col>

                                </Row>
                            </Panel>
                            <Panel header="已经过期的任务" key="2">
                                <p>{text}</p>
                            </Panel>
                        </Collapse>
                    </Col>
                </Row>
            </Fragment>
        )
    }
}
export default Home