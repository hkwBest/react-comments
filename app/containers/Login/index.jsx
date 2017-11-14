import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {hashHistory} from 'react-router';
import * as userinfoActions from '../../actions/userinfo';
import LoginCom from '../../components/Login/index';
import Header from'../../components/header/index'


class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {isLogin : false};
        this.checkLogin = this.checkLogin.bind(this);
        this.goUserPage = this.goUserPage.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    render() {
        return (
            <div>
                <Header title="用户登录"/>
                {
                    !this.state.isLogin ?
                        <LoginCom loginHandle={this.handleLogin}/> :
                        ''
                }
            </div>
        )
    }
    componentDidMount() {
        this.checkLogin();
    }
    checkLogin(){
        let userinfo = this.props.userinfo;
        if(userinfo.userName){
           // this.setState({isLogin : true});
            this.goUserPage();
        }else {
            this.setState({isLogin : false})
        }
    }
    handleLogin(userName){
        //保存用户信息
        let userinfo = this.props.userinfo;
        userinfo.userName = userName;
        this.props.userinfoActions.update(userinfo);
        //跳转到其他页面
        let params = this.props.params;
        let router = params.router;
        if(router){
            hashHistory.push(router);
        }else{
            this.goUserPage();
        }
    }
    goUserPage(){
        hashHistory.push('/User');
    }
}

function mapStateToProps(state){
    return {
        userinfo : state.userinfo
    }
}
function mapDispatchToProps(dispatch){
    return {
        userinfoActions : bindActionCreators(userinfoActions,dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login)