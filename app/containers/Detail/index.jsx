import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../components/header/index';
import GoodsInfo from './subpage/goodsInfo';
import CommentsList from './subpage/commentsInfo';
import Buy from './subpage/buy'


class Detail extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            goodsInfo: {},
            commentsInfo: [],
            page : 1,
            hasMore : false,
            isLoadingMore : false
        }

    }
    render() {
        let params = this.props.params;
        return (
            <div>
                <Header title="商品详情" clickHandle={this.clickHandle}/>
                <GoodsInfo id={params.id}/>
                <Buy id={params.id}/>
                <CommentsList id={params.id}/>
            </div>
        )
    }
}

export default Detail