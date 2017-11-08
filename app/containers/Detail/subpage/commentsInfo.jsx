import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { getCommentData } from '../../../fetch/detail/detai';
import CommentsList from '../../../components/CommentList/index';
import LoadMore from '../../../components/LoadMore/index'

class CommentsInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.loadFirstPage = this.loadFirstPage.bind(this);
        this.loadMoreData = this.loadMoreData.bind(this);
        this.handleResult = this.handleResult.bind(this);
        this.state = {
            data : [],
            page : 1,
            hasMore : false,
            isLoadingMore : false
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.data.length ?
                        <CommentsList data={this.state.data}/>:
                        ""
                }
                {
                    this.state.hasMore ?
                        <LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData} /> :
                        ""
                }
            </div>
        )
    }
    componentDidMount(){
        this.loadFirstPage();
    }
    loadFirstPage(){
        let result = getCommentData(0,this.props.id);
        this.handleResult(result);
    }
    loadMoreData(){
        this.setState({isLoadingMore : true});
        let result = getCommentData(this.state.page,this.props.id);
        this.handleResult(result);
        this.setState((prevState) => ({
            page : prevState.page + 1,
            isLoadingMore : false
        }));
    }
    handleResult(result){
        result.then((res) => {
            return res.json();
        }).then((json) => {
            this.setState((prevState)=>({
                data : prevState.data.concat(json.data),
                hasMore : json.hasMore
            }))
        })
    }
}

export default CommentsInfo