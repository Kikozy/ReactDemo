import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router,Route,Link} from 'react-router-dom'
import Home from "./Component/Home"
import TaskList from "./Component/TaskList"
import logo from "./Img/logo.png"
import "./Css/index.css"
function Index(){
    return(
        <Router>
            <header className="index-header">
                <div className="core">
                    <ul>
                        <li>
                            <Link to={`/`}>
                                <div className="logo">
                                    <img src={logo} className="logo-img" alt="logo"/>
                                    <span className="logo-text">TaskList</span>
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link to={`/TaskList`}>
                                <span>列表</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={`/Other`}>
                                <span>历史</span>
                            </Link>
                        </li>
                        <li>
                            <Link to={`/Other`}>
                                <span>统计</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </header>
            <main className="index-contet">
                <div className="core" style={{paddingTop: '40px'}}>
                    <Route exact path="/" component={Home}></Route>
                    <Route path="/TaskList" component={TaskList}></Route>
                </div>
            </main>
            <footer className="index-footer core">页脚</footer>
        </Router>
    )
}

ReactDOM.render(
    <Index/>
    ,document.getElementById('root'))
