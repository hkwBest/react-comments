import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import * as userActionsFromFile from '../../actions/userinfo';
import Header from '../../components/header/index';
import UserInfo from '../../components/UserInfo/index';
import OrderList from './subPages/orderList';

class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <Header title="用户中心" backRouter="/" />
                <UserInfo username={this.props.userinfo.userName} city={this.props.userinfo.cityName}/>
                <OrderList/>
            </div>
        )
    }
    componentDidMount(){
        if(!this.props.userinfo.userName){
            hashHistory.push('/Login');
        }
    }
}

function mapStateToprops(state){
    return {
        userinfo : state.userinfo
    }
}
function mapDispatchToProps(dispatch){
    return {
        userActions : bindActionCreators(userActionsFromFile,dispatch)
    }
}
export default connect(
    mapStateToprops,
    mapDispatchToProps
)(User)