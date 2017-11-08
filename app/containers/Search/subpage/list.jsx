import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { connect } from 'react-redux';

import ListCom from '../../../components/List/index';
import LoadMore from '../../../components/LoadMore/index';
import {getSearchData} from '../../../fetch/search/search'

const initState = {
    hasMore : false,
    page : 1,
    isLoadingMore : false,
    data : []
};
class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.loadFirstPage = this.loadFirstPage.bind(this);
        this.loadMoreData = this.loadMoreData.bind(this);
        this.handleResult = this.handleResult.bind(this);
        this.state = initState;
    }
    render() {
        return (
            <div>
                <ListCom cityName={this.props.userinfo.cityName} data={this.state.data}/>
                <LoadMore loadMoreFn={this.loadMoreData} />
            </div>
        )
    }
    componentDidMount(){
        this.loadFirstPage();
    }
    componentDidUpdate(prevProps,prevState){
        let keyword = this.props.keyword;
        let category = this.props.category;
        if(keyword === prevProps.keyword && category === prevProps.category){
            return ;
        }
        this.setState(initState);
        this.loadFirstPage();
    }
    loadFirstPage(){
        let cityName = this.props.userinfo.cityName;
        //let page = this.state.page;
        let keyword = this.props.keyword;
        let category = this.props.category;
        let result = getSearchData(0,cityName,category,keyword);
        this.handleResult(result);
    }
    loadMoreData(){
        this.setState({isLoadingMore : true});
        let cityName = this.props.userinfo.cityName;
        let page = this.state.page;
        let keyword = this.props.keyword;
        let category = this.props.category;
        let result = getSearchData(page,cityName,category,keyword);
        this.handleResult(result);
        this.setState((prevState) => {
            return {page : prevState.page + 1,isLoadingMore : false}
        });
    }
    handleResult(result){
        result.then((res) =>{
            return res.json();
        }).then((json) => {
            let data = json.data;
            let hasMore = json.hasMore;
            this.setState((prevState) => {
                return {data : prevState.data.concat(data),hasMore : hasMore}
            })
        })
    }
}

function mapStateToProps(state){
    return {userinfo : state.userinfo}
}
function mapDispatchToProps(){
    return {}
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(List)