
import React,{Component,Fragment} from "react"
import {Row ,Col ,Card ,Modal ,Descriptions ,Input} from "antd"
import axios from "axios"
import 'antd/dist/antd.css'
import './main.css'
import { CheckOutlined ,EditOutlined ,DeleteOutlined  } from '@ant-design/icons'
const {TextArea} = Input
class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            taskList: [],
            subWinShow: false,
            delWinShow: false,
            editWinShow: false,
            windowValue: {},
            editName: "",
            editInfo: ""
        }

    }
    componentDidMount(){
        axios.post("http://localhost:8848/api/TaskList")
            .then((res)=>{
                this.setState({taskList: res.data})
            })
            .catch((err)=>{
                console.log(err)
            })
        // axios.post("http://localhost:8848/api/TaskList/complete")
        //     .then((res)=>{
        //         this.setState({completeTask: res.data})
        //     })
        //     .catch((err)=>{
        //         console.log(err)
        //     })
    }
    ShowSubmitWindow = (value)=>{
        console.log("打开提交窗口")
        this.setState({
            subWinShow: true,
            windowValue: Object.assign({},value)
        })
    }
    CancelSubmitWindow = ()=>{
        console.log("关闭提交窗口")
        this.setState({
            subWinShow: false,
            windowValue: {}
        })
    }
    OkSubmitWindow=()=>{
        console.log("确认提交"+this.state.windowValue.name)
        this.setState({
            subWinShow: false,
        })
        let data = {
            name: this.state.windowValue.name,
            info: this.state.windowValue.info
        }
        axios.post("http://localhost:8848/api/Complete",data)
        .then((data)=>{
            console.log("提交成功")
            this.UpdateData()
        })
        .catch((err)=>{
            console.log("提交失败")
        })
    }
    ShowDelmitWindow=(value)=>{
        console.log("打开删除窗口")
        this.setState({
            delWinShow: true,
            windowValue: Object.assign({},value)
        })
    }
    CancelDelWindow=()=>{
        console.log("关闭删除窗口")
        this.setState({
            delWinShow: false,
            windowValue: {}
        })
    }
    OkDelWindow=()=>{
        console.log("确认删除"+this.state.windowValue.name)
        this.setState({
            delWinShow: false,
        })
        let data = {
            name: this.state.windowValue.name,
            info: this.state.windowValue.info
        }
        axios.post("http://localhost:8848/api/DelTask",data)
            .then((data)=>{
                console.log("删除成功")
                this.UpdateData()
            })
            .catch((err)=>{
                console.log("删除失败")
            })
    }
    ShowEditmitWindow=(value)=>{
        console.log("打开修改窗口")
        this.setState({
            editWinShow: true,
            windowValue: Object.assign({},value)
        })
    }
    CancelEditWindow=()=>{
        console.log("关闭修改窗口")
        this.setState({
            editWinShow: false,
            windowValue: {}
        })
    }
    OkEditWindow=()=>{
        console.log("确认修改"+this.state.windowValue.name)
        this.setState({
            editWinShow: false,
        })
        let data = {
            name: this.state.editName,
            info: this.state.editInfo,
            oldData: Object.assign({},this.state.windowValue) 
        }
        axios.post("http://localhost:8848/api/EditTask",data)
        .then((data)=>{
            console.log("修改成功")
            this.UpdateData()
        })
        .catch((err)=>{
            console.log("修改失败")
        })
    }
    editInfoChange=(e)=>{
        this.setState({
            editInfo: e.target.value
        })
    }
    editNameChange=(e)=>{
        this.setState({
            editName: e.target.value
        })
    }
    UpdateData=()=>{
        axios.post("http://localhost:8848/api/TaskList")
            .then((res)=>{
                this.setState({taskList: res.data})
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    render(){
        return(
            <Fragment>
                <Row className="task-list-box" gutter={[0,0]}>
                    {this.state.taskList.map((value,index)=>{
                        return(
                            <Col xs={24} sm={12} md={8} lg={8} xl={8} key={value+index}>
                                <Card
                                title={value.name}
                                className="task-card-item"
                                bordered={true}
                                actions={[
                                    <CheckOutlined  key="ok" onClick={()=>{this.ShowSubmitWindow(value)}}/>,
                                    <EditOutlined  key="edit" onClick={()=>{this.ShowEditmitWindow(value)}}/>,
                                    <DeleteOutlined  key="del" onClick={()=>{this.ShowDelmitWindow(value)}}/>,
                                ]}
                                >
                                    <p>{value.info}</p>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>

                <Modal
                title={this.state.windowValue.name}
                visible={this.state.subWinShow}
                onOk={this.OkSubmitWindow}
                onCancel={this.CancelSubmitWindow}
                okText="签到"
                cancelText="放弃"
                >
                    确定要提交吗
                </Modal>
                <Modal
                title={this.state.windowValue.name}
                visible={this.state.delWinShow}
                onOk={this.OkDelWindow}
                onCancel={this.CancelDelWindow}
                okText="签到"
                cancelText="放弃"
                >
                    确定要删除吗
                </Modal>
                <Modal
                title={this.state.windowValue.name}
                visible={this.state.editWinShow}
                onOk={this.OkEditWindow}
                onCancel={this.CancelEditWindow}
                okText="签到"
                cancelText="放弃"
                >
                    <Descriptions
                    title=""
                    bordered
                    column={{ xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1 }}
                    >
                        <Descriptions.Item label="任务名称"><Input placeholder="任务名称" value={this.state.editName} onChange={this.editNameChange}/></Descriptions.Item>
                        <Descriptions.Item label="任务描述"><TextArea rows={4} value={this.state.editInfo} onChange={this.editInfoChange}/></Descriptions.Item>
                    </Descriptions>
                </Modal>
            </Fragment>
        )
    }
}
export default Home