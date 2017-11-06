import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {hashHistory} from 'react-router';
import * as userinfoActions from '../../actions/userinfo';
import Header from '../../components/header/index';
import AllCity from '../../components/city/allCity';
import localStore from '../../util/localStore';
import { CITYNAME } from '../../config/localStoreKey'

import './style.less'

class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.changeCity = this.changeCity.bind(this);
        this.clickHandle = this.clickHandle.bind(this);
    }
    render() {
        return (
            <div className="city-com">
                <Header title="选择城市" clickHandle={this.clickHandle} />
                <div className="current-city">
                    {this.props.userinfo.cityName}
                </div>
                <hr/>
                <AllCity changeCity={this.changeCity} />
            </div>
        )
    }
    changeCity(newCity){
        let userInfo  = this.props.userinfo;
        userInfo.cityName = newCity;
        this.props.chooseCityAction.update(userInfo);
        localStore.setItem(CITYNAME,newCity);
        hashHistory.push("/");
       // this.clickHandle();
    }
    clickHandle(){
        window.history.back();
    }
}

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        chooseCityAction : bindActionCreators(userinfoActions,dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(City)
