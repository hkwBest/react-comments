import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { getOrderListData } from '../../../fetch/user/orderlist';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {hashHistory} from 'react-router';
import { postComment } from '../../../fetch/user/orderlist'

import OrderListCom from '../../../components/OrderList/index'
import './style.less'


class OrderList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.getOrderDate = this.getOrderDate.bind(this);
        this.submitComment = this.submitComment.bind(this);
        this.state = { data : [] }
    }
    render() {
        return (
            <div className="order-list-container">
                <h2>您的订单</h2>
                {
                    this.state.data.length ?
                        <OrderListCom submitComment={this.submitComment} data={this.state.data}/> :
                        <div></div>
                }
            </div>
        )
    }
    componentDidMount(){
        this.getOrderDate();
    }
    getOrderDate(){
        const result = getOrderListData();
        result.then((res) => {
            return res.json();
        }).then((json) => {
            this.setState({data : json})
        });
    }
    submitComment(id,values,callback){
        let result = postComment(id,values);
        result.then((res) => {
            return res.json();
        }).then((json) => {
            if(json.errno === 0){
                callback();
            }
        })
    }
}

function mapStateToProps(state){
    return {
        userinfo : state.userinfo
    }
}
function mapDispatchToProps(){
    return {}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderList)