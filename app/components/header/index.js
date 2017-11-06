import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

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
        this.props.clickHandle();
    }
}

export default Header;