import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { getListData } from '../../../fetch/home/home';
import ListComponent from '../../../components/List/index';
import ListLoadMore from '../../../components/LoadMore/index';


import './style.less';

class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data : [],
            hasMore : false,
            isLoadingMore : false,
            nextPage : 1
        };
        this.loadFirstPageData = this.loadFirstPageData.bind(this);
        this.loadMoreData = this.loadMoreData.bind(this);
    }
    render() {
        return (
            <div>
                <h2 className="home-list-title">猜你喜欢</h2>
                {
                    this.state.data.length ?
                    <ListComponent data={this.state.data} /> :
                    "加载中..."
                }
                {
                    this.state.hasMore ?
                        <ListLoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData}  /> :
                        ""
                }
            </div>
        )
    }
    componentDidMount(){
        this.loadFirstPageData();
    };
    loadFirstPageData(){
        const result =  getListData(this.props.cityName,0);
        this.resultHandle(result);
    };
    loadMoreData(){
        this.setState({
            isLoadingMore : true
        });
        const result = getListData(this.props.cityName,this.state.nextPage);
        this.resultHandle(result);
        this.setState((preState) => {
            console.log(preState);
           return {
                isLoadingMore : false,
                nextPage : preState.nextPage + 1
            }
        });
    };
    resultHandle(result){
        result.then((res)=>{
            return res.json();
        }).then((json)=>{
            const data = json.data;
            const hasMore = json.hasMore;
            this.setState((preState)=>{
                return {
                    hasMore : hasMore,
                    data : preState.data.concat(data)
                }
            })
        })
    };
}

export default List;