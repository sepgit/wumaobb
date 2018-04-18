import React, { Component } from 'react';
import '../css/weui.css';
import '../css/advantageNew.css';
import Msg from '../component/Msg.js';
import Rpath from '../Rpath.js';
import HTTPED from '../address';
import BackT from './backT.js';//顶部返回tit
import SkipLabel from '../component/SkipLabel.js'
// import Title from '../component/Title.js';
// import InputName from './addsup.js';
// import EachCompany from './eachCompany.js';
// import BackTitle from '../component/BackTitle.js';
// import ChooseList from './choooseList.js';
import { getDataList, getCheckbind, Getwxtoken, getUserInfo, postProv } from '../DataInterface.js';

class AdvantageNew extends Component{
    constructor (props){
        super(props);
        this.getBuserName = this.getBuserName.bind(this);
        this.toOrdinary = this.toOrdinary.bind(this);
        this.toSpecial = this.toSpecial.bind(this);
        this.toService = this.toService.bind(this);
        this.OrdinaryOrgin = this.OrdinaryOrgin.bind(this);
        this.toOrdinaryDestination = this.toOrdinaryDestination.bind(this);
        this.backtoAll = this.backtoAll.bind(this);
        this.backtoOrdinary = this.backtoOrdinary.bind(this);
        
        this.state={
            user: 0,
            BinduserName: '', //当前用户
            wxtoken: '',
            Pagestatus: 'OrdinaryOrgin',//Ordinary 普通运价   Special 特殊   Service 服务优势   OrdinaryOrgin 起运地   OrdinaryDest 目的地
            servName:'',
        }
    }
    //时间周期
    componentWillMount() {
        let wxtoken = Getwxtoken();  //获取微信ID
        this.setState({
            wxtoken: wxtoken
        });
        getCheckbind(wxtoken, this.getBuserName);
    }
    getBuserName(value) {
        if (!value.err) {
            let userJson = value.user;
            this.setState({
                BinduserName: userJson.userAcco,
                user: userJson.user
            });
        }
    }
    //跳转 普通运价 页面
    toOrdinary(){
        this.setState({
            Pagestatus:'Ordinary'
        })
    }
    //返回 首页 页面
    backtoAll() {
        this.setState({
            Pagestatus:'AllAdvantage'
        })
    }
    //跳转 特殊运价 页面
    toSpecial(){
        this.setState({
            Pagestatus:'Special'
        })
    }
    //跳转 服务优势 页面
    toService(){
        this.setState({
            Pagestatus:'Service'
        })
    }
    //跳转 普通运价起运地 页面
    OrdinaryOrgin(){
        this.setState({
            Pagestatus:'OrdinaryOrgin'
        })
    }
    //跳转 普通运价目的地 页面
    toOrdinaryDestination(){
        this.setState({
            Pagestatus:'OrdinaryDest'
        })
    }
    //返回 普通运价 页面
    backtoOrdinary(){
        this.setState({
            Pagestatus:'Ordinary'
        })
    }
    render() {
        return (
            <div>
                {/* 首页 */}
                {
                    this.state.Pagestatus == 'AllAdvantage' ?
                    <div className="">
                        <BackT tit='优势新增'></BackT>
                        <ul className="threeBTN">
                            <li className="ordinary" onClick={this.toOrdinary}><a href="javascript:void(0)">普通运价优势</a></li>
                            <li className="special"  onClick={this.toSpecial}><a href="javascript:void(0)">特种货运价优势</a></li>
                            <li className="service"  onClick={this.toService}><a href="javascript:void(0)">服务优势</a></li>
                        </ul>
                    </div>:undefined
                }
                {/* 普通运价优势多选 */}
                {
                    this.state.Pagestatus == 'Ordinary' ?
                    <div className="ordinary_page">
                        <BackT tit='普通运价优势多选' backonClick={this.backtoAll}></BackT>
                        <ul>
                            <li className="ordinary_page_orgin" onClick={this.OrdinaryOrgin}><a href="javascript:void(0)">起运地多选</a></li>
                            <li className="ordinary_page_destination" onClick={this.toOrdinaryDestination}><a href="javascript:void(0)">目的地多选</a></li>
                        </ul>
                    </div>:undefined
                }
                {/* 起运地多选 */}
                {
                    this.state.Pagestatus == 'OrdinaryOrgin' ?
                    <div className="ordinary_orgin">
                        <BackT tit='起运地多选' backonClick={this.backtoOrdinary}></BackT>
                        <div>
                            <div className="ord_prompt">标记 <span> * </span> 为必填</div>
                        </div>
                        <div className="theFirst">第一步 : </div>
                        <div className="ord_label">
                            {
                                this.state.servName == '' ?
                                    <SkipLabel caption={'服务类型'} text={'请选择类型'} SelfonClick={this.ServonClick} /> :
                                    <SkipLabel caption={'服务类型'} text={this.state.servName} SelfonClick={this.ServonClick} />
                            }
                        </div>
                    </div>:undefined
                }
                {/* 目的地多选 */}
                {
                    this.state.Pagestatus == 'OrdinaryDest' ?
                    <div className="ordinary_page">
                        <BackT tit='目的地多选' backonClick={this.backtoOrdinary}></BackT>
                        <div>目的地</div>
                        
                    </div>:undefined
                }
                {/* 特种运价 */}
                {
                    this.state.Pagestatus == 'Special' ?
                    <div className="">
                        特种
                    </div>:undefined
                }
                {/* 服务优势 */}
                {
                    this.state.Pagestatus == 'Service' ?
                    <div className="">
                        服务
                    </div>:undefined
                }
            </div>
            
        )
    }
}

export default AdvantageNew;