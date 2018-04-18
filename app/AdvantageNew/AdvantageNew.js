import React, { Component } from 'react';
import '../css/weui.css';
import '../css/advantageNew.css';
import Msg from '../component/Msg.js';
import Rpath from '../Rpath.js';
import HTTPED from '../address';

// import Title from '../component/Title.js';
// import InputName from './addsup.js';
// import EachCompany from './eachCompany.js';
// import BackTitle from '../component/BackTitle.js';
// import ChooseList from './choooseList.js';
import { getDataList, getCheckbind, Getwxtoken, getUserInfo, postProv } from '../DataInterface.js';

class AdvantageNew extends Component{
    constructor (props){
        super(props);
        this.state={

        }
    }

    render() {
        return (
            <div className="">
                <ul className="threeBTN">
                    <li className="ordinary"><a href="javascript:void(0)">普通运价优势</a></li>
                    <li className="special"><a href="javascript:void(0)">特种货运价优势</a></li>
                    <li className="service"><a href="javascript:void(0)">服务优势</a></li>
                </ul>
            </div>
        )
    }
}

export default AdvantageNew;