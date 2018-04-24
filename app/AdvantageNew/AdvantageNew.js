import React, { Component } from 'react';
import '../css/weui.css';
import '../css/advantageNew.css';
import Msg from '../component/Msg.js';
import Rpath from '../Rpath.js';
import HTTPED from '../address';
import BackT from './backT.js';//顶部返回tit
import SkipLabel from '../component/SkipLabel.js'
import ServList from '../advancedcomponent/ServList.js';
import CarrList from '../advancedcomponent/CarrList.js';
import DepaPortsList from '../advancedcomponent/DepaPortsList.js';
import StrInput from '../component/StrInput.js'
// import EachCompany from './eachCompany.js';
// import BackTitle from '../component/BackTitle.js';
// import ChooseList from './choooseList.js';
import { getDataList, getCheckbind, Getwxtoken, getUserInfo, postProv } from '../DataInterface.js';

class AdvantageNew extends Component {
    constructor(props) {
        super(props);
        this.getBuserName = this.getBuserName.bind(this);
        this.toOrdinary = this.toOrdinary.bind(this);
        this.toSpecial = this.toSpecial.bind(this);
        this.toService = this.toService.bind(this);
        this.OrdinaryOrgin = this.OrdinaryOrgin.bind(this);
        this.toOrdinaryDestination = this.toOrdinaryDestination.bind(this);
        this.backtoAll = this.backtoAll.bind(this);
        this.backtoOrdinary = this.backtoOrdinary.bind(this);
        this.back = this.back.bind(this);
        this.OrdinaryOrginPage = this.OrdinaryOrginPage.bind(this);
        this.toTheAdvantagedeta = this.toTheAdvantagedeta.bind(this);
        
        //服务类型页面
        this.ServonClick = this.ServonClick.bind(this);
        this.GetservID = this.GetservID.bind(this);
        this.renderServSelect = this.renderServSelect.bind(this);
        //承运商
        this.GetCarrID = this.GetCarrID.bind(this);
        this.CarronClick = this.CarronClick.bind(this);
        this.renderCarrSelect = this.renderCarrSelect.bind(this);
        //起运地
        this.GetDepaPortID = this.GetDepaPortID.bind(this);
        this.DepaPortonClick = this.DepaPortonClick.bind(this);
        this.renderDepaPortSelect = this.renderDepaPortSelect.bind(this);


        this.state = {
            user: 0,
            BinduserName: '', //当前用户
            wxtoken: '',
            Pagestatus: 'OrdinaryOrgin',//AllAdvantage 首页   Ordinary 普通运价   Special 特殊   Service 服务优势   OrdinaryOrgin 起运地   OrdinaryDest 目的地   advantageDeta 优势明显
            backto: '',
            serv: 0,
            servName: '',//服务类型
            carr: 0,
            carrName: '',//承运商
            depa: 0,
            depaName: '',
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
    toOrdinary() {
        this.setState({
            Pagestatus: 'Ordinary'
        })
    }
    //返回 首页 页面
    backtoAll() {
        this.setState({
            Pagestatus: 'AllAdvantage'
        })
    }
    //跳转 特殊运价 页面
    toSpecial() {
        this.setState({
            Pagestatus: 'Special'
        })
    }
    //跳转 服务优势 页面
    toService() {
        this.setState({
            Pagestatus: 'Service'
        })
    }
    //跳转 普通运价起运地 页面
    OrdinaryOrgin() {
        this.setState({
            Pagestatus: 'OrdinaryOrgin'
        })
    }
    //跳转 普通运价目的地 页面
    toOrdinaryDestination() {
        this.setState({
            Pagestatus: 'OrdinaryDest'
        })
    }
    //返回 普通运价 页面
    backtoOrdinary() {
        this.setState({
            Pagestatus: 'Ordinary'
        })
    }
    //服务类型的选择页面
    GetservID(a, b) {
        if (a > 0) {
            this.setState({
                Pagestatus: 'OrdinaryOrgin',
                serv: a,
                servName: b
            });
        }
    }
    ServonClick() {
        this.setState({
            backto: 'OrdinaryOrgin',
            Pagestatus: 'Serv'
        });
    }
    renderServSelect() {
        return <div>
            <div className="weui-cells">
                <ServList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} servType='3' GetSelectID={this.GetservID} backprop={this.back} />
            </div>
        </div>
    }


    //承运商
    GetCarrID(a, b) {
        if (a > -1) {
            this.setState({
                Pagestatus: 'OrdinaryOrgin',
                carr: a,
                carrName: b
            });
        }
    }
    CarronClick() {
        if (this.state.serv > 0) {
            this.setState({
                backto: 'OrdinaryOrgin',
                Pagestatus: 'Carr'
            });
        }
    }
    renderCarrSelect() {
        return <div>
            <div className="weui-cells">
                <CarrList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} serv={this.state.serv} GetSelectID={this.GetCarrID} backprop={this.back} />
            </div>
        </div>
    }
    //起运地
    GetDepaPortID(a, b) {
        if (a > 0) {
            this.setState({
                Pagestatus: 'OrdinaryOrgin',
                depa: a,
                depaName: b
            });
        }
    }
    DepaPortonClick() {
        if (this.state.serv > 0) {
            this.setState({
                backto: 'OrdinaryOrgin',
                Pagestatus: 'Depa'
            });
        }
    }
    renderDepaPortSelect() {
        return <div>
            <div className="weui-cells">
                <DepaPortsList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} serv={this.state.serv} GetSelectID={this.GetDepaPortID} backprop={this.back} />
            </div>
        </div>
    }
    //优势明细跳转
    toTheAdvantagedeta(){
        this.setState({
            Pagestatus:'advantageDeta'
        })
    }
    //返回列表返回的页面
    back() {
        this.setState({
            Pagestatus: this.state.backto
        });
    }
    // 起运地多选页面
    OrdinaryOrginPage() {
        return <div className="ordinary_orgin">
            <BackT tit='起运地多选' backonClick={this.backtoOrdinary}></BackT>
            <div>
                <div className="ord_prompt">标记 <span> * </span> 为必填</div>
            </div>

            <div className="thestep">第一步 : </div>
            <div className="ord_label">
                {
                    this.state.servName == '' ?
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'服务类型'} text={'请选择类型'} SelfonClick={this.ServonClick} />
                        </div> :
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'服务类型'} text={this.state.servName} SelfonClick={this.ServonClick} />
                        </div>
                }
            </div>

            <div className="thestep">第二步 : </div>
            <div className="ord_label">
                {
                    this.state.carrName == '' ?
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'承运商'} text={'请选择承运商'} SelfonClick={this.CarronClick} />
                        </div> :
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'承运商'} text={this.state.carrName} SelfonClick={this.CarronClick} />
                        </div>
                }
            </div>

            <div className="thestep">第三步 : </div>
            <div className="ord_label">
                {
                    this.state.depaName == '' ?
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'起运地'} text={'请选择起运地'} SelfonClick={this.DepaPortonClick} />
                        </div> :
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'起运地'} text={this.state.depaName} SelfonClick={this.DepaPortonClick} />
                        </div>
                }
            </div>
            <div className="ord_label">
                {
                    this.state.depaName == '' ?
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'目的地航线'} text={'请选择目的地'} SelfonClick={this.DepaPortonClick} />
                        </div> :
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'目的地航线'} text={this.state.depaName} SelfonClick={this.DepaPortonClick} />
                        </div>
                }
            </div>
            <div className="thestep">其他 : </div>
            <ul className="otherRemarks">
                <li className="ord_label clearfix" onClick={this.toTheAdvantagedeta}>
                    <div className="deta_ord_label">优势明细</div>
                </li>
                <li className="ord_label markers"><StrInput caption={'内标注'} promptProp={'请输入备注信息'} updateStateProp={this.Getlabe} /></li>
                <li className="ord_label markers"><StrInput caption={'外标注'} promptProp={'请输入备注信息'} updateStateProp={this.Getlabe} /></li>
            </ul>
            <div className=" bottom_btn">
                <a href="javascript:void(0)" className="weui-btn weui-btn_primary">完成</a>
            </div>
        </div>
    }
    render() {
        return (
            <div className="thetit">
                {/* 首页 */}
                {
                    this.state.Pagestatus == 'AllAdvantage' ?
                        <div className="">
                            {/* <BackT tit='优势新增'></BackT> */}
                            <ul className="threeBTN">
                                <li className="ordinary" onClick={this.toOrdinary}><a href="javascript:void(0)">普通运价优势</a></li>
                                <li className="special" onClick={this.toSpecial}><a href="javascript:void(0)">特种货运价优势</a></li>
                                <li className="service" onClick={this.toService}><a href="javascript:void(0)">服务优势</a></li>
                            </ul>
                        </div> : undefined
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
                        </div> : undefined
                }
                {/* 起运地多选 */}
                {
                    this.state.Pagestatus == 'OrdinaryOrgin' ?
                        this.OrdinaryOrginPage() : undefined
                }
                {/* 目的地多选 */}
                {
                    this.state.Pagestatus == 'OrdinaryDest' ?
                        <div className="ordinary_page">
                            <BackT tit='目的地多选' backonClick={this.backtoOrdinary}></BackT>
                            <div>目的地</div>

                        </div> : undefined
                }
                {/* 特种运价 */}
                {
                    this.state.Pagestatus == 'Special' ?
                        <div className="">
                            特种
                    </div> : undefined
                }
                {/* 服务优势 */}
                {
                    this.state.Pagestatus == 'Service' ?
                        <div className="">
                            服务
                    </div> : undefined
                }
                {
                    this.state.Pagestatus == 'advantageDeta' ? 
                    <div>
                        mingxi 
                    </div>:undefined
                }

                {
                    this.state.Pagestatus == 'Serv' ?
                        this.renderServSelect() : undefined
                }
                {
                    this.state.Pagestatus == 'Carr' ?
                        this.renderCarrSelect() : undefined
                }
                {
                    this.state.Pagestatus == 'Depa' ?
                        this.renderDepaPortSelect() : undefined
                }
            </div>

        )
    }
}

export default AdvantageNew;