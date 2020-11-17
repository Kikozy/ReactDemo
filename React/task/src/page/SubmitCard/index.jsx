import React,{Component,Fragment} from "react"
import { Row, Col ,Descriptions ,Badge} from 'antd';
class SubmitCard extends Component{
    render(){
        return(
            <Fragment>
                <Row style={{position: "fixed",zIndex: 999,width: "100%"}}>
                    <Col xs={22} sm={18} md={10} lg={10} xl={10} style={{background: "white",height:"300px",transform: "translate(-50%,0%)",left: "50%",top: "50%"}}>

                    </Col>
                </Row>
            </Fragment>
        )
    }
}
export default SubmitCard