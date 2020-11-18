import React,{Component,Fragment} from "react"
import axios from "axios"
import { Col, Row ,Collapse} from 'antd';
import 'antd/dist/antd.css';
import './main.css'
import ButtonCard from "../TasksCard";
const { Panel } = Collapse;


const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

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
            console.log(res.data)
        })
        .catch((err)=>{
            console.log(err)
        })
        axios.post("http://localhost:8848/api/tasksList/miss")
        .then((res)=>{
            this.setState({missTasks: res.data})
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    //控制任务暂停还是运行
    taskRunAndStop = info =>{
        let params={
            name: info.name,
            user: info.user,
            state: info.state
        }
        let newState = this.state.soonTasks
        axios.post("http://localhost:8848/api/tasksEdit/taskRunAndStopState",params)
        .then((res)=>{
            newState[info.path] = res.data[0]
            console.log(this.state.soonTasks)
            this.setState({
                soonTasks: [...newState]
            },()=>{console.log(this.state.soonTasks)})
        })
        .catch((err)=>{
            console.log("无法更改任务运行状态"+err)
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
                        <Collapse defaultActiveKey={['1','2']}>
                            <Panel header="任务列表" key="1" >
                                <Row gutter={[5,0]}>
                                    <Col span={24}>
                                        <Row gutter={[{ xs: 0, sm: 5, md: 5, lg:10, xl: 10},{ xs: 5, sm: 5, md: 5, lg:10, xl: 10}]}>
                                            {this.state.soonTasks.map((value,index)=>{
                                                return(
                                                    <ButtonCard tasksData={value} tasksIndex={index} taskRunAndStopFun={this.taskRunAndStop} key={value.tasks_name+index}></ButtonCard>
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