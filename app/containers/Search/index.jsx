import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <h1>Search</h1>
            </div>
        )
    }
}

export default Search