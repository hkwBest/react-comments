import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux';
import { hashHistory } from 'react-router';
import BuyAndStore from '../../../components/BuyAndStore/index';
import * as storeActionsFromFile from '../../../actions/store';

class Buy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isStore : false
        };
        this.buyHandler = this.buyHandler.bind(this);
        this.storeHandler = this.storeHandler.bind(this);
        this.checkLogin = this.checkLogin.bind(this);
        this.checkStoreState = this.checkStoreState.bind(this);
    }
    render() {
        return (
            <BuyAndStore isStore={this.state.isStore} buyHandler={this.buyHandler} storeHandler={this.storeHandler} />
        )
    }
    componentDidMount(){
        this.checkStoreState();
    }

    buyHandler(){
        let isLogin = this.checkLogin();
        if(!isLogin){
            return ;
        }
        //buy...

        //跳转到用户主页
        hashHistory.push('/User');
    }
    storeHandler(){
        let isLogin = this.checkLogin();
        if(!isLogin){
            return;
        }

        let id = this.props.id;
        let storeActions = this.props.userActions;
        if(this.state.isStore){
            storeActions.rm({id : id});
        }else {
            storeActions.add({id : id});
        }
        this.setState((prevState) => (
            {isStore : !prevState.isStore}
        ));
    }
    checkLogin(){
        let userinfo = this.props.userinfo;
        if(!userinfo.userName){
            let id = this.props.id;
            hashHistory.push('/Login/' + encodeURIComponent('/detail/' + id));
            return false;
        }
        return true;
    }
    checkStoreState(){
        let id = this.props.id;
        let store = this.props.store;
        store.some((item) => {
            if(item.id === id){
                this.setState({isStore : true});
                return true;
            }
        })
    }
}

function mapStateToProps(state){
    return {
        userinfo : state.userinfo,
        store : state.store
    }
}
function mapDispatchToProps(dispatch){
    return {
        userActions : bindActionCreators(storeActionsFromFile,dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy)