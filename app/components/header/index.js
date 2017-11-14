import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { hashHistory } from 'react-router';

import './style.less'

import './style.less'

class Header extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.clickHandle = this.clickHandle.bind(this);
    }
    render() {
        return (
            <div className="city-header" onClick={this.clickHandle}>
                <i className="icon-chevron-left back-icon"></i>
                <h2 className="city-title">{this.props.title}</h2>
            </div>
        )
    }
    clickHandle(){
        if(this.props.backRouter){
            hashHistory.push(this.props.backRouter);
        }else {
            window.history.back();
        }
    }
}

export default Header;