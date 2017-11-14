import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class Item extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.showComment = this.showComment.bind(this);
        this.cancelComment = this.cancelComment.bind(this);
        this.submitComment = this.submitComment.bind(this);
        this.commentOk = this.commentOk.bind(this);
        this.state = {commentState : 2}   /*0--未评价  1--评价中   2--已评价*/
    }
    render() {
        const data = this.props.data;
        return (
            <div className="clear-fix order-item-container">
                <div className="order-item-img float-left">
                    <img src={data.img}/>
                </div>
                <div className="order-item-comment float-right">
                    {
                        this.state.commentState === 0 ?
                        <button className="btn" onClick={this.showComment}>评价</button> :
                            this.state.commentState === 2 ?
                                <button className="btn unseleted-btn">已评价</button> :
                                ""
                    }
                </div>
                <div className="order-item-content">
                    <span>商户：{data.title}</span>
                    <span>数量：{data.count}</span>
                    <span>价格：￥{data.price}</span>
                </div>
                {
                    this.state.commentState === 1 ?
                        <div className="comment-text-container">
                            <textarea className="comment-text" ref="commentText"></textarea>
                            <button className="btn" onClick={this.submitComment}>提交</button>
                            <button className="btn unseleted-btn" onClick={this.cancelComment}>取消</button>
                        </div> :
                        ''
                }
            </div>
        )
    }
    componentDidMount(){
        this.setState({commentState:this.props.data.commentState})
    }
    showComment(){
        this.setState({commentState : 1})
    }
    cancelComment(){
        this.setState({commentState : 0})
    }
    submitComment(){
        let id = this.props.data.id;
        let values = this.refs.commentText.value.trim();
        this.props.submitComment(id,values,this.commentOk);
    }
    commentOk(){
        this.setState({commentState : 2});
    }
}

export default Item