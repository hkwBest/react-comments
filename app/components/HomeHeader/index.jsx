import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link} from 'react-router';
import { hashHistory } from 'react-router';

import './style.less'

class HomeHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.changeHandle = this.changeHandle.bind(this);
        this.keyUpHandle = this.keyUpHandle.bind(this);
        this.state = {kwd : ''};
    }
    render() {
        return (
            <div id="home-header" className="clear-fix">
                <div className="home-header-left float-left">
                    <Link to="/city">
                        <span>{this.props.cityName}</span>
                        &nbsp;
                        <i className="icon-angle-down"></i>
                    </Link>
                </div>
                <div className="home-header-right float-right">
                    <Link to='/Login'>
                        <i className="icon-user"></i>
                    </Link>
                </div>
                <div className="home-header-middle">
                    <div className="search-container">
                        <i className="icon-search"></i>
                        <input type="text" placeholder="请输入关键字" onChange={this.changeHandle} onKeyUp={this.keyUpHandle}/>
                    </div>
                </div>
            </div>
        )
    }
    changeHandle(e){
        let value = e.target.value || e.srcElement.value;
        this.setState({kwd : value});
    }
    keyUpHandle(e){
        if(e.keyCode === 13){
            hashHistory.push('/search/all/' + encodeURIComponent(this.state.kwd));
        }
    }
}

export default HomeHeader