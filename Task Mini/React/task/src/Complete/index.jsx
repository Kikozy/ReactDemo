
import React,{Component,Fragment} from "react"
import {Row ,Col ,Card } from "antd"
import axios from "axios"
import 'antd/dist/antd.css'
class Home extends Component{
    constructor(props){
        super(props)
        this.state={
            completeTask: [],
        }
    }
    componentDidMount(){
        axios.post("http://localhost:8848/api/TaskList/Complete")
            .then((res)=>{
                this.setState({completeTask: res.data})
            })
            .catch((err)=>{
                console.log(err)
            })
    }
    render(){
        return(
            <Fragment>
                <Row className="task-list-box" gutter={[0,0]}>
                    {this.state.completeTask.map((value,index)=>{
                        return(
                            <Col xs={24} sm={12} md={8} lg={8} xl={8} key={value+index}>
                                <Card
                                title={value.name}
                                bordered={true}
                                >
                                    <p>{value.info}</p>
                                </Card>
                            </Col>
                        )
                    })}
                </Row>
            </Fragment>
        )
    }
}
export default Home