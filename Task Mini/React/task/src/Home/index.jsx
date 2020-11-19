
import React,{Component,Fragment} from "react"
import {Row ,Col ,Card} from "antd"
import 'antd/dist/antd.css'
import './main.css'
import { CheckOutlined ,EditOutlined ,DeleteOutlined  } from '@ant-design/icons';
class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            taskList: [
                {name: "233",content: "可以"},
                {name: "真不错",content: "nice"},
                {name: "好不错",content: "nice"},
                {name: "嗯不错",content: "nice"}
            ]
        }
    }
    
    render(){
        return(
            <Row className="task-list-box" gutter={[0,0]}>
                {this.state.taskList.map((value,index)=>{
                    return(
                        <Col xs={24} sm={12} md={8} lg={8} xl={8} key={value+index}>
                            <Card
                            title={value.name}
                            className="task-card-item"
                            bordered={true}
                            actions={[
                                <CheckOutlined  key="ok" />,
                                <EditOutlined  key="edit" />,
                                <DeleteOutlined  key="del" />,
                            ]}
                            >
                                <p>{value.content}</p>
                                <p>{value.content}</p>
                                <p>{value.content}</p>
                            </Card>
                        </Col>
                    )
                })}
            </Row>
        )
    }
}
export default Home