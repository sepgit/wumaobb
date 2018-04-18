import React, { Component } from 'react';
import '../css/weui.css';
import '../css/page.css';
import Msg from '../component/Msg.js';
import Rpath from '../Rpath.js';
import HTTPED from '../address';
import '../css/addsuppliers.css';
import Title from '../component/Title.js';
import InputName from './addsup.js';
import EachCompany from './eachCompany.js';
import BackTitle from '../component/BackTitle.js';
import ChooseList from './choooseList.js';
import { getDataList, getCheckbind, Getwxtoken, getUserInfo, postProv } from '../DataInterface.js';
//详细页面需要的
import SkipLabel from '../component/SkipLabel.js';
import StrInput from '../component/StrInput.js';
import ServList from '../advancedcomponent/ServList.js';
import PortsList from '../advancedcomponent/PortsList.js';


class Addsuppliers extends Component {

    constructor(props) {
        super(props);
        this.getCompsList = this.getCompsList.bind(this);
        this.callBackDataMsg = this.callBackDataMsg.bind(this);
        this.getBuserName = this.getBuserName.bind(this);
        this.changeInputVal = this.changeInputVal.bind(this);
        //this.myDataProp = this.myDataProp.bind(this)
        this.testFunction = this.testFunction.bind(this); //测试
        this.emptyClick = this.emptyClick.bind(this); //清空输入框的 函数
        this.toDetalied = this.toDetalied.bind(this);

        //第二个选择页面
        this.ServonClick = this.ServonClick.bind(this);
        this.renderServSelect = this.renderServSelect.bind(this);

        this.GetservID = this.GetservID.bind(this);
        this.back = this.back.bind(this);
        this.PortonClick = this.PortonClick.bind(this);
        this.GetPortID = this.GetPortID.bind(this);
        this.detailedFun = this.detailedFun.bind(this);
        this.detaToadd = this.detaToadd.bind(this);
        this.addProvs = this.addProvs.bind(this);
        this.addProvsCallMsg = this.addProvsCallMsg.bind(this);
        this.arrowClick = this.arrowClick.bind(this); //同一公司，箭头点击加载
        this.renderCompList = this.renderCompList.bind(this);//加载公司
        this.chooseChild = this.chooseChild.bind(this);
        this.chooseChildMsg = this.chooseChildMsg.bind(this);
        this.renderMsg = this.renderMsg.bind(this);
        this.GetMsg = this.GetMsg.bind(this);
        this.backMain = this.backMain.bind(this);
        this.shouIDf = this.shouIDf.bind(this);
        this.showClickDOM = this.showClickDOM.bind(this);
        this.chooseAgainFun = this.chooseAgainFun.bind(this);
        this.Getlabe = this.Getlabe.bind(this);
        this.testFunctionBack = this.testFunctionBack.bind(this);
        
        this.state = {
            user: 0,
            BinduserName: '', //当前用户
            wxtoken: '',
            value: '',
            valList: [],
            Pagestatus: 'add',
            Msg: '',
            MsgType: 1,
            //第二个 选择页面
            serv: 0,
            port: 0,
            servName: '',
            backto: '',
            portName: '',
            detaAcco: '',
            // detaPage = dp
            dpuserAcco: '',
            dpName: '',
            dpcompName: '',
            dpinduName: '',
            dpmobi: '',
            //分组
            userArr: [],
            compArr: [],
            userlist: '',
            showID: '',
            chooseAgain:'',
            labe:'',
        }
    }
    //
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
    //InputName 点击触发的 搜索的函数 搜索到的数据

    getCompsList() {
        if (this.state.value == "") {
            alert('请输入正确的名称')
            return;
        }
        let BinduserName = this.state.BinduserName;
        let wxtoken = this.state.wxtoken;
        let compAlia = this.state.value;
        let url = 'api/comps/?userName=' + BinduserName + '&wxtoken=' + wxtoken + '&isAlia=true&compAlia=' + compAlia;
        getDataList(url, [], this.callBackDataMsg);
    }
    emptyClick() {
        this.setState({
            value: ''
        })
    }
    //输入框的值
    changeInputVal(event) {
        this.setState({
            value: event.target.value,
            userlist: '1'
        });
    }
    // 获得列表过来的值
    callBackDataMsg(val) {
        console.log(val);
        //公司的数组，  用户数组
        let theCompArr = [], theUserArr = []
        console.log(val);
        for (let i = 0; i < val.length; i++) {
            let datas = val[i]
            if (datas.user == 0) {
                theCompArr.push(datas)
            }
            if (datas.comp == 0) {
                theUserArr.push(datas)
            }
        }
        console.log(theCompArr);
        console.log(theUserArr);
        this.setState({
            userArr: theUserArr,
            compArr: theCompArr
        })
    }
    //点击选择之后跳转到第二个页面
    toDetalied(event) {
        let id = event.target.previousSibling.previousSibling.previousSibling.previousSibling.innerHTML;
        let BinduserName = this.state.BinduserName;
        let wxtoken = this.state.wxtoken;
        let s = ''
        let url = 'api/users/' + id + '/?userName=' + BinduserName + '&wxtoken=' + wxtoken;
        console.log(url);
        getUserInfo(id, BinduserName, wxtoken, this.detailedFun);
        this.setState({
            Pagestatus: 'Main',
            chooseAgain:id
        })
    }
    chooseAgainFun() {
        let id = this.state.chooseAgain
        let BinduserName = this.state.BinduserName;
        let wxtoken = this.state.wxtoken;
        let s = ''
        let url = 'api/users/' + id + '/?userName=' + BinduserName + '&wxtoken=' + wxtoken;
        console.log(url);
        getUserInfo(id, BinduserName, wxtoken, this.detailedFun);
        this.setState({
            Pagestatus: 'Main',
        })
    }
    renderEach() {
        return this.state.userArr.map(value => {
            return <EachCompany key={value.length} ipgp={value.compAlia} name={value.name} userAcco={value.userAcco} chooseClick={this.toDetalied} user={value.user}></EachCompany>
        })
    }

    renderCompList() {
        return this.state.compArr.map(value => {
            let id = value.comp;
            let userID = "userID" + id;
            return <div>
                {/* <ChooseList compAlia={value.compAlia} compID={value.comp} arrowClick={this.arrowClick}></ChooseList> */}
                {/* <ChooseList compAlia={value.compAlia}  compID={value.comp}  arrowClick={this.shouIDf}  values={value} clickIDs = {this.state.showID}></ChooseList> */}
                <ChooseList compAlia={value.compAlia} compID={value.comp} values={value} clickIDs={this.state.showID} toDetalied={this.toDetalied}></ChooseList>
                {/* {
                    this.state.showID == userID ?
                        this.showClickDOM():undefined
                } */}
            </div>
        })
    }
    arrowClick(event) {

        let id = event.target.previousSibling.innerHTML;
        let BinduserName = this.state.BinduserName;
        let wxtoken = this.state.wxtoken;
        let url = 'api/users/?userName=' + BinduserName + '&wxtoken=' + wxtoken + '&comp=' + id + '&rowCount=0';
        getDataList(url, [], this.chooseChildMsg);

        let userID = "userID" + id;
        console.log(userID);

    }
    chooseChildMsg(val) {
        console.log(val);
        this.setState({
            userlist: val
        })

    }
    showClickDOM() {
        console.log();
        if (this.state.userlist != 1) {
            return this.state.userlist.map(value => {
                return <EachCompany key={value.user} ipgp={value.compAlia} name={value.name} userAcco={value.userAcco} chooseClick={this.toDetalied} user={value.user}></EachCompany>
            })
        }

    }
    chooseChild(id) {
        let ids = id;
        let BinduserName = this.state.BinduserName;
        let wxtoken = this.state.wxtoken;
        let url = 'api/users/?userName=' + BinduserName + '&wxtoken=' + wxtoken + '&comp=' + ids + '&rowCount=0';
        getDataList(url, [], this.chooseChildMsg)

        // return this.state.userlist.map(value =>{
        //     return <EachCompany key={value.user} ipgp={value.compAlia} name={value.name} userAcco={value.userAcco} chooseClick={this.toDetalied} user={value.user}></EachCompany>
        // })
    }
    shouIDf(event) {
        let clickID = event.target.previousSibling.innerHTML;
        console.log(clickID);
        this.setState({
            showID: clickID
        })
    }
    //第二个选择页面的 函数
    renderServSelect() {
        return <div>
            <div className="weui-cells">
                <ServList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} servType='6' GetSelectID={this.GetservID} backprop={this.back} />
            </div>
        </div>
    }
    //点击箭头

    renderPortSelect() {
        return <div>
            <div className="weui-cells">
                <PortsList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} serv={this.state.serv} GetSelectID={this.GetPortID} backprop={this.back} />
            </div>
        </div>
    }
    GetservID(a, b) {
        if (a > 0) {
            this.setState({
                Pagestatus: 'Main',
                serv: a,
                servName: b
            });
        }
    }
    back() {
        this.setState({
            Pagestatus: this.state.backto
        });
    }
    ServonClick() {
        this.setState({
            backto: 'Main',
            Pagestatus: 'Serv'
        });
    }
    //口岸
    PortonClick() {
        if (this.state.serv > 0) {
            let b = this.state.Pagestatus;
            this.setState({
                backto: b,
                Pagestatus: 'Port'
            });
        }
    }
    GetPortID(a, b) {
        if (a > 0) {
            this.setState({
                Pagestatus: 'Main',
                port: a,
                portName: b
            });
        }
    }
    detailedFun(val) {
        console.log(val);
        let msg = val.user;
        this.setState({
            dpuserAcco: msg.userAcco,
            dpName: msg.name,
            dpcompName: msg.compName,
            dpinduName: msg.induName,
            dpmobi: msg.mobi,
        });
    }
    detaToadd() {
        this.setState({
            Pagestatus: 'add',
        });
    }
    Getlabe(event) {
        this.setState({
            labe: event.target.value,
        });
    }
    addProvs() {
        let BinduserName = this.state.BinduserName;
        let wxtoken = this.state.wxtoken;
        let serv = this.state.serv;
        let port = this.state.port;
        let labe = this.state.labe;
        if (serv == 0) {
            this.GetMsg(2, '服务类型不能为空', 0);  //提示类型错误,返回界面0
        } else if (port == 0) {
            this.GetMsg(2, '口岸不能为空', 0);  //提示类型错误,返回界面0
        } else {
            postProv(BinduserName, wxtoken, serv, 0, port, 0, labe, this.addProvsCallMsg)
        }
    }
    addProvsCallMsg(value) {
        console.log(value);
        if (value.err == false) {
            this.setState({
                Pagestatus: 'Msg',
                MsgType: 1,
                Msg: '添加完成',
                backto: 'add'
            })
        } else {
            this.setState({
                MsgType: 2,      //错误标识
                Pagestatus: 'Msg',
                Msg:  value.errMsg,
                backto: 'Main'
            });
        }
    }
    GetMsg(MsgType, ErrMsg, backto) {
        this.setState({
            MsgType: MsgType,      //错误标识
            Pagestatus: 'Msg',
            Msg: ErrMsg,
            backto: backto
        });
    }
    renderMsg() {
        return <div>
            <Msg Text={this.state.Msg} Typeprop={this.state.MsgType} Btnprop={this.backMain} Btntextprop={'返回'} />
        </div>
    }
    backMain() {
        this.setState({
            Pagestatus: this.state.backto
        })
    }
    //测试函数
    testFunction() {
        let BinduserName = this.state.BinduserName;
        let wxtoken = this.state.wxtoken;
        let url = 'api/carrs/?userName=' + BinduserName + '&wxtoken=' + wxtoken +  '&rowCount=0';
        getDataList(url, [], this.testFunctionBack);
    }

    testFunctionBack(val){
        console.log(val);
    }
    
    render() {
        return (
            <div className="youshixinzeng">
                {
                    this.state.Pagestatus == 'add' ?
                        <div>
                            <div className="sup_tit">
                                <div className="sup_back" onClick={this.testFunction}></div>
                                新增供应商
                            </div>
                            <div onClick={this.testFunction}>列表</div>
                            <InputName SelfonClick={this.getCompsList} myDataProp={this.state.value} handleChange={this.changeInputVal} emptyClick={this.emptyClick}  />
                            {
                                this.renderEach()
                            }
                            {
                                this.renderCompList()
                            }
                        </div> : undefined
                }

                {
                    this.state.Pagestatus == 'Main' ?
                        <div>
                            <div className="detailed_tit">
                                <div className="detailed_back" onClick={this.detaToadd}></div>
                                新增供应商
                            </div>
                            <div className="detailed_main">
                                <div className="clearfix deta_header">
                                    <div className="found">
                                        已查找到该账号
                                        <span className="weui-icon-success weui-icon_msg"></span>
                                    </div>
                                    {/* <div className="chooseAgain"><a href="javascript:void(0)" onClick={this.chooseAgainFun}>再次查找</a></div> */}
                                </div>
                                <ul className="dateList clearfix">
                                    <li className="dateList_li clearfix">
                                        <div className="dateList_li_left">帐号</div>
                                        <div className="dateList_li_right">{this.state.dpuserAcco}</div>
                                    </li>
                                    <li className="dateList_li clearfix">
                                        <div className="dateList_li_left">姓名</div>
                                        <div className="dateList_li_right">{this.state.dpName}</div>
                                    </li>
                                    <li className="dateList_li clearfix">
                                        <div className="dateList_li_left">公司</div>
                                        <div className="dateList_li_right">{this.state.dpcompName}</div>
                                    </li>
                                    <li className="dateList_li clearfix">
                                        <div className="dateList_li_left">行业</div>
                                        <div className="dateList_li_right">{this.state.dpinduName}</div>
                                    </li>
                                    <li className="dateList_li clearfix">
                                        <div className="dateList_li_left">手机</div>
                                        <div className="dateList_li_right">{this.state.dpmobi}</div>
                                    </li>
                                </ul>
                                <div className="seeLOGO">
                                    <div className="seeLOGO_click"><a href="javascript:void(0)">查看LOGO / 名片</a></div>
                                    <ul className="seeLOGO_ul ">
                                        <li className="seeLOGO_li seeLOGO_li_1">已认证</li>
                                        <li className="seeLOGO_li seeLOGO_li_2" >已授信</li>
                                        <li className="seeLOGO_li seeLOGO_li_3">预警</li>
                                    </ul>
                                </div>

                                <div className="threeLabel">
                                    {
                                        this.state.servName == '' ?
                                            <SkipLabel caption={'服务类型'} text={'请选择类型'} SelfonClick={this.ServonClick} /> :
                                            <SkipLabel caption={'服务类型'} text={this.state.servName} SelfonClick={this.ServonClick} />
                                    }
                                </div>

                                <div className="threeLabel">
                                    {
                                        this.state.portName == '' ?
                                            <SkipLabel caption={'口岸'} text={'请选择口岸'} SelfonClick={this.PortonClick} /> :
                                            <SkipLabel caption={'口岸'} text={this.state.portName} SelfonClick={this.PortonClick} />
                                    }
                                </div>
                                <div className="threeLabel">
                                    <StrInput caption={'备注'} promptProp={'请输入备注信息'} updateStateProp={this.Getlabe} />
                                </div>

                                <div className="detailed_main_btn">
                                    <a href="javascript:void(0)" className="weui-btn weui-btn_mini weui-btn_primary" onClick={this.addProvs}>完成</a>
                                </div>
                            </div>
                        </div> : undefined
                }
                {
                    this.state.Pagestatus == 'Serv' ?
                        this.renderServSelect() : undefined
                }
                {
                    this.state.Pagestatus == 'Port' ?
                        this.renderPortSelect() : undefined
                }
                {
                    this.state.Pagestatus == 'Msg' ?
                        this.renderMsg() : undefined
                }

            </div>

        )
    }

}

export default Addsuppliers;