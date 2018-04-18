import React, { Component } from 'react';
import '../css/weui.css';

class Title extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="Head_Panel">
                <p className="CenterText_title">{this.props.Titletext}</p>
            </div>
        )
    }
}

export default Title;