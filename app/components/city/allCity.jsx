import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin';

import './index.less'

class AllCity extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.changeCity = this.changeCity.bind(this);
    }
    render() {
        let cityArray = ['北京','深圳','杭州','南京','广州','上海','福建','厦门','大连'];
        return (
            <div>
                <ul className="city-list">
                    {
                        cityArray.map((item,index) => {
                            return <li key={index} onClick={this.changeCity}><span>{item}</span></li>
                        })
                    }
                </ul>
            </div>
        )
    }
    changeCity(e){
        let currentCity = e.currentTarget || e.srcElement;
        this.props.changeCity(currentCity.innerHTML);
    }
}

export default AllCity;