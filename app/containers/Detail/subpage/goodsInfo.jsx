import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';
import {getInfoData} from '../../../fetch/detail/detai';
import GoodsInfoCom from '../../../components/DetailInfo/index';

class GoodsInfo extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {data : {}}
    }
    render() {
        return (
            <div>
                {
                    this.state.data ?
                        <GoodsInfoCom data={this.state.data}/> :
                        ''
                }
            </div>
        )
    }
    componentDidMount(){
        this.getGoodsInfo();
    }
    getGoodsInfo(){
        let result = getInfoData(this.props.id);
        result.then((res) => {
            return res.json();
        }).then((json)=> {
            this.setState({data : json});
        })
    }
}

export default GoodsInfo