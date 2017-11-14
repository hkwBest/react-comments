import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Header from '../header/index'

import './style.less'

class LoginCom extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.state = {
            userName: ''
        }
    }

    render() {
        return (
            <div id="login-container">
                <div className="input-container phone-container">
                    <i className="icon-tablet"></i>
                    <input
                        ref="userName"
                        type="text"
                        placeholder="输入用户名"
                        onChange={this.changeHandler}
                        value={this.state.userName}
                    />
                </div>
                <button className="btn-login" onClick={this.clickHandler}>登录</button>
            </div>
        )
    }

    clickHandler() {
        let userName = this.refs.userName.value;
        this.props.loginHandle(userName);
    }

    changeHandler(e) {
        let userName = e.target.value || e.srcElement.value;
        this.setState({
            userName: userName
        })
    }
}

export default LoginCom