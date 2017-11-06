import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class LoadMore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.loadMoreHandle = this.loadMoreHandle.bind(this);
    }
    render() {
        return (
            <div className="load-more" ref="wrapper">
                {
                    this.props.isLoadingMore ?
                        <span>加载中...</span> :
                        <span onClick={this.loadMoreHandle}>加载更多</span>
                }
            </div>
        )
    }
    loadMoreHandle() {
        // 执行传输过来的
        this.props.loadMoreFn();
    }
    componentDidMount() {
        // 使用滚动时自动加载更多
        let timeOutId;
        const wrapper = this.refs.wrapper;
        const loadMoreFn = this.props.loadMoreFn;
        function callback(){
            let top = wrapper.getBoundingClientRect().top;
            let windowHeight = window.screen.height;
            if(top && top < windowHeight){
                loadMoreFn();
            }
        }
        window.addEventListener("scroll",()=>{
            if(this.props.isLoadingMore){
                return;
            }
            if(timeOutId){
                clearTimeout(timeOutId);
            }
            timeOutId = setTimeout(callback,50);
        },false);
    }
}

export default LoadMore