import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less';

class BuyAndStore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.storeHandler = this.storeHandler.bind(this);
        this.buyClickHandle = this.buyClickHandle.bind(this);
    }
    render() {
        return (
            <div className="buy-store-container clear-fix">
                <div className="item-container float-left">
                    {
                        this.props.isStore ?
                            <button className="selected" onClick={this.storeHandler}>已收藏</button> :
                            <button onClick={this.storeHandler}>收藏</button>
                    }
                </div>
                <div className="item-container float-right">
                    <button onClick={this.buyClickHandle}>购买</button>
                </div>
            </div>
        )
    }
    storeHandler(){
        this.props.storeHandler();
    }
    buyClickHandle(){
        this.props.buyHandler();
    }
}

export default BuyAndStore