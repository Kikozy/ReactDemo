import React,{Component,Fragment} from "react"
import axios from "axios"
class TaskList extends Component{
    constructor(props){
        super(props)
        this.state= {
            user: "",
            pass: ""
        }
        this.loginSubmit = this.loginSubmit.bind(this)
        this.userChange = this.userChange.bind(this)
        this.passChange = this.passChange.bind(this)
    }
    loginSubmit(){
        let option = {
            'Content-Type': 'application/x-www-form-urlencoded',
            data: {
                user: this.state.user,
                pass: this.state.pass
            }
        }
        axios.post('http://localhost:8848/login',option)
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
        console.log("尝试登陆？")
    }
    //用户名更改
    userChange(e){
        let newUser = e.target.value
        this.setState({
            user: newUser
        },()=>{
            console.log("账号"+newUser)
        })
    }
    //密码更改
    passChange(e){
        let newPass = e.target.value
        this.setState({
            pass: newPass
        },()=>{
            console.log("密码"+newPass)
        })
    }
    render(){
        return(
            <Fragment>
                <input type="text" placeholder="user" value={this.state.user} onChange={this.userChange} /> <br/>
                <input type="password" placeholder="pwd" value={this.state.pass} onChange={this.passChange} /> <br/>
                <input type="submit" onClick={this.loginSubmit}/>
            </Fragment>
        )
    }
}
export default TaskList