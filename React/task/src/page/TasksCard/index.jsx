import React,{Component,Fragment} from "react"
import { Col, Row , Statistic,Card, Switch, Progress, Badge, Modal , Descriptions, Select ,Input, DatePicker } from 'antd';
import {DeleteFilled,EditFilled ,CheckSquareFilled} from '@ant-design/icons';
const { TextArea } = Input;
const { Option } = Select;
const { Countdown } = Statistic;
const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30; // Moment is also OK
console.log(deadline)
class TasksCard extends Component{
    constructor(props){
        super(props)
        let DataModel = {
                //任务名
                tasks_name: props.tasksData.tasks_name,
                //任务类型
                tasks_type: props.tasksData.tasks_type,
                //完成的次数
                tasks_complete_tick: props.tasksData.tasks_complete_tick,
                //总次数
                tasks_count: props.tasksData.tasks_count,
                //任务的描述
                tasks_info: props.tasksData.tasks_info,
                //任务是否暂停
                tasks_stop: props.tasksData.tasks_stop,
                //每日签到截止时间
                tasks_day_tick_time: props.tasksData.tasks_day_tick_time,

        }
        this.state={
            submitTasksWindowInfo: DataModel,
            submitWindowVisible: false,
            delTasksWindowInfo: DataModel,
            delTasksWindowVisible: false,
            editTasksWindowInfo: DataModel,
            editTasksWindowVisible: false
        }
        console.log(this.props.tasksData.tasks_day_tick_time)
    }
    //打开提交窗口
    showSubmitTasksWindow=()=>{
        console.log("打开了提交窗口")
        this.setState({
            submitWindowVisible: true
        })
    }
    //提交窗口中确认提交
    submitTasksWindowOk=()=>{
        console.log("我想提交了");
        this.setState({
            submitWindowVisible: false,
        });
      };
    //提交窗口中取消提交
    submitTasksWindowCancel=()=>{
        console.log("我不提交了");
        this.setState({
            submitWindowVisible: false,
        });
      };
    //打开删除任务窗口
    showDelWindow=()=>{
        this.setState({
            delTasksWindowVisible: true
        })
    }
    //取消删除任务窗口
    delTasksWindowCancel=()=>{
        console.log("我不想删除了")
        this.setState({
            delTasksWindowVisible: false
        })
    }
    //确认删除任务窗口
    delTasksWindowOk=()=>{
        console.log("我要删除任务"+this.state.delTasksWindowInfo.tasks_name)
        this.setState({
            delTasksWindowVisible: false
        })
    }
    //展示修改的窗口
    editTasksWindowShow=()=>{
        console.log("打开了修改窗口")
        this.setState({
            editTasksWindowVisible: true
        },()=>{console.log("打开了修改窗口")})
    }
    //提交修改
    editTasksWindowOk=()=>{
        console.log("提交修改")
        this.setState({
            editTasksWindowVisible: false
        })
    }
    //取消修改
    editTasksWindowCancel=()=>{
        console.log("取消修改")
        this.setState({
            editTasksWindowVisible: false
        })
    }
    render(){
        return(
            <Fragment>
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
                    {(()=>{
                        switch(this.state.editTasksWindowInfo.tasks_type){
                            case "单次任务":
                                return(
                                    <Descriptions title="" bordered column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                                        <Descriptions.Item label="任务名称"><Input defaultValue={this.state.editTasksWindowInfo.tasks_name} /></Descriptions.Item>
                                        <Descriptions.Item label="任务类型">
                                            <Select defaultValue="单次任务" style={{width: "100%"}}>
                                                <Option value="单次任务">单次任务</Option>
                                                <Option value="循环计时任务">循环计时任务</Option>
                                            </Select>
                                        </Descriptions.Item>
                                        <Descriptions.Item label="任务描述"><TextArea placeholder="今天要背完500个单词"></TextArea></Descriptions.Item>
                                        <Descriptions.Item label="执行日期"><DatePicker/></Descriptions.Item>
                                    </Descriptions>
                                )
                            case "循环计时任务":
                                return(
                                    <Descriptions title="" bordered column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}>
                                        <Descriptions.Item label="任务名称">{this.state.editTasksWindowInfo.tasks_name}</Descriptions.Item>
                                        <Descriptions.Item label="任务类型">{this.state.editTasksWindowInfo.tasks_type}</Descriptions.Item>
                                        <Descriptions.Item label="上次签到">2018</Descriptions.Item>
                                        <Descriptions.Item label="目标进度">{this.state.editTasksWindowInfo.tasks_complete_tick}/{this.state.editTasksWindowInfo.tasks_count}</Descriptions.Item>
                                        <Descriptions.Item label="本次签到时间">2018-04-24 18:00:00</Descriptions.Item>
                                    </Descriptions>
                                )
                            default:
                                return(
                                    <h1>啥也没有啊</h1>
                                )
                        }
                    })()}
                </Modal>
                <Col xs={24} sm={12} md={12} lg={8} xl={8}>
                    {(()=>{
                        switch(this.props.tasksData.tasks_type){
                            case "单次任务":
                                return(
                                    <Card title={<Badge status="default" text={this.props.tasksData.tasks_name} />}
                                    bordered={true}
                                    actions={[
                                        <CheckSquareFilled key="tasks-btn-ok" onClick={this.showSubmitTasksWindow} />,
                                        <EditFilled key="tasks-btn-edit" onClick={this.editTasksWindowShow}/>,
                                        <DeleteFilled key="tasks-btn-del" onClick={this.showDelWindow}/>
                                    ]}
                                    >
                                        <Row gutter={[0,0]}>
                                            <Col span={24} style={{height: "50px"}}><span>{this.props.tasksData.tasks_info}</span></Col>
                                            <Col xs={8} sm={8} md={12} lg={12} xl={8}><Statistic title="任务打卡次数" value={93} suffix="/ 100" /></Col>
                                            <Col xs={8} sm={8} md={12} lg={12} xl={16}><Countdown title="任务截止时间" value={deadline} format="D 天 H 时 m 分"/></Col>
                                        </Row>
                                    </Card>
                                )
                            case "循环计时任务":
                                if(!this.props.tasksData.tasks_stop){
                                    return(
                                        <Card title={ <Badge status="processing" text={this.props.tasksData.tasks_name} />}
                                        bordered={true}
                                        extra={<Switch checkedChildren="开始" unCheckedChildren="暂停" defaultChecked onChange={()=>{this.props.taskRunAndStopFun({path:this.props.tasksIndex, name: this.props.tasksData.tasks_name, user: "DiaoCan",state: this.props.tasksData.tasks_stop})}}></Switch>}
                                        actions={[
                                            <CheckSquareFilled key="tasks-btn-ok" onClick={this.showSubmitTasksWindow} />,
                                            <EditFilled key="tasks-btn-edit" onClick={this.editTasksWindowShow}/>,
                                            <DeleteFilled key="tasks-btn-del" onClick={this.showDelWindow}/>
                                        ]}
                                        >
                                            <Row gutter={[5,5]}>
                                                <Col span={24}></Col>
                                                <Col span={12}><Statistic title="时间要求" value={this.props.tasksData.tasks_time_log} suffix={"/"+this.props.tasksData.tasks_tick_time+"小时"} /></Col>
                                                <Col span={12}><Countdown title="今日截止时间" value={deadline}/></Col>
                                                <Col span={24}><Progress strokeColor={{from: '#108ee9',to: '#87d068'}} percent={10} status="active"/></Col>
                                            </Row> 
                                        </Card>
                                    )
                                }else{
                                    return(
                                        <Card title={<Badge status="default" text={this.props.tasksData.tasks_name} />}
                                        bordered={true}
                                        extra={<Switch checkedChildren="开始" unCheckedChildren="暂停" onChange={()=>{this.props.taskRunAndStopFun({path:this.props.tasksIndex, name: this.props.tasksData.tasks_name, user: "DiaoCan",state: this.props.tasksData.tasks_stop})}}></Switch>}
                                        >
                                            <Row gutter={[5,5]}>
                                                <Col xs={18} sm={16} md={14} lg={14} xl={14}><Statistic title="任务打卡次数" value={this.props.tasksData.tasks_time_log} suffix={"/"+this.props.tasksData.tasks_time_count+"小时"}/></Col>
                                                <Col xs={6} sm={8} md={10} lg={10} xl={10}><Progress type="circle" percent={90} width={70}/></Col>
                                                <Col span={24}><Countdown title="任务截止时间" value={deadline} format="D 天 H 时 m 分 s 秒" /></Col>
                                            </Row>
                                        </Card>
                                    )
                                }
                            case "循环计次任务":
                                if(!this.props.tasksData.tasks_stop){
                                    return(
                                        <Card title={<Badge status="processing" text={this.props.tasksData.tasks_name} />}
                                        bordered={true}
                                        extra={<Switch checkedChildren="开始" defaultChecked unCheckedChildren="暂停" onChange={()=>{this.props.taskRunAndStopFun({path:this.props.tasksIndex, name: this.props.tasksData.tasks_name, user: "DiaoCan",state: this.props.tasksData.tasks_stop})}}></Switch>}
                                        actions={[
                                            <CheckSquareFilled key="tasks-btn-ok" onClick={this.showSubmitTasksWindow} />,
                                            <EditFilled key="tasks-btn-edit" onClick={this.editTasksWindowShow}/>,
                                            <DeleteFilled key="tasks-btn-del" onClick={this.showDelWindow}/>
                                        ]}
                                        >
                                            <Row gutter={[5,5]}>
                                            <Col span={24}></Col>
                                                <Col span={12}><Statistic title="打卡次数" value={93} suffix="/ 100" /></Col>
                                                <Col span={12}><Countdown title="今日签到时间" value={deadline}/></Col>
                                                <Col span={24}><Progress strokeColor={{from: '#108ee9',to: '#87d068'}} percent={10} status="active"/></Col>
                                            </Row>
                                        </Card>
                                    )
                                }else{
                                    return(
                                        <Card title={<Badge status="default" text={this.props.tasksData.tasks_name} />}
                                        bordered={true}
                                        extra={<Switch checkedChildren="开始" unCheckedChildren="暂停" onChange={()=>{this.props.taskRunAndStopFun({path:this.props.tasksIndex, name: this.props.tasksData.tasks_name, user: "DiaoCan",state: this.props.tasksData.tasks_stop})}}></Switch>}
                                        >
                                            <Row gutter={[5,5]}>
                                                <Col xs={18} sm={16} md={14} lg={14} xl={14}><Statistic title="任务打卡次数" value={93} suffix="/ 100" /></Col>
                                                <Col xs={6} sm={8} md={10} lg={10} xl={10}><Progress type="circle" percent={90} width={70}/></Col>
                                                <Col span={24}><Countdown title="任务截止时间" value={deadline} format="D 天 H 时 m 分 s 秒" /></Col>
                                            </Row>
                                        </Card>
                                    )
                                }

                            default:
                                return(
                                    <h1>啥也没有啊</h1>
                                )
                        }
                    })()}
                </Col>
            </Fragment>
        )
    }
}
export default TasksCard