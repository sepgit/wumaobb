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
import StrInput from '../component/StrInput.js';
import CheckBox from '../component/CheckBox.js';
import DetailList from './Advdetalist.js';
import AdServList from './AdServerList.js';
import DestPortsList from '../advancedcomponent/DestPortsList.js';
import AdservOptiList from './AdservOptiList.js';
import CarrPage from './CarrPage.js';
import ADDepaPortsList from './ADDepaPortsList.js';
import ADDestPortsList from './ADDestPortsList.js';
import ADPortsList from './ADPortsList.js';
// import EachCompany from './eachCompany.js';
// import BackTitle from '../component/BackTitle.js';
// import ChooseList from './choooseList.js';
import { getDataList, getCheckbind, Getwxtoken, getUserInfo, postProv, postData, postYJData, getDataDetail } from '../DataInterface.js';

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
        this.initState = this.initState.bind(this);
        this.backUserPriv = this.backUserPriv.bind(this);

        //起运地和目的地的页面
        this.OrdinaryOrginPage = this.OrdinaryOrginPage.bind(this);
        this.OrdinaryDestPage = this.OrdinaryDestPage.bind(this);

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
        //目的地
        this.GetDestPortID = this.GetDestPortID.bind(this);
        this.DestPortonClick = this.DestPortonClick.bind(this);
        this.renderDestPortSelect = this.renderDestPortSelect.bind(this);
        this.DestServonClick = this.DestServonClick.bind(this);

        //优势明细页面
        this.advantageDetaPage = this.advantageDetaPage.bind(this);
        this.backtoOrdinaryOrgin = this.backtoOrdinaryOrgin.bind(this);
        this.GetDetail = this.GetDetail.bind(this);
        this.advaDetailonClick = this.advaDetailonClick.bind(this);
        //新增优势
        this.postadvasDepa = this.postadvasDepa.bind(this);
        //标注
        this.GetlabeInside = this.GetlabeInside.bind(this);
        this.GetlabeOutside = this.GetlabeOutside.bind(this);
        //特种页面
        this.SpecialPage = this.SpecialPage.bind(this);
        this.SpecServonClick = this.SpecServonClick.bind(this);
        this.SpecialDepaClick = this.SpecialDepaClick.bind(this);
        //服务优势 页面
        this.ServicePage = this.ServicePage.bind(this);
        this.ServiceServonClick = this.ServiceServonClick.bind(this);
        //服务类型
        this.ServicerenderServSelect = this.ServicerenderServSelect.bind(this);
        this.renderServOptiSelect = this.renderServOptiSelect.bind(this);
        this.servOptionClick = this.servOptionClick.bind(this);
        this.GetservservOptiID = this.GetservservOptiID.bind(this);
        this.ServiceDepaPortonClick = this.ServiceDepaPortonClick.bind(this);
        this.testFunction = this.testFunction.bind(this);
        this.GetservssID = this.GetservssID.bind(this);
        this.GetPortID = this.GetPortID.bind(this);
        //接收人
        this.reList = this.reList.bind(this);
        this.chooseRe = this.chooseRe.bind(this);
        this.renderReList = this.renderReList.bind(this);
        this.getReid = this.getReid.bind(this);
        //msg
        this.postadvasDest = this.postadvasDest.bind(this);
        this.GetMsg = this.GetMsg.bind(this);
        this.callbackOrgin = this.callbackOrgin.bind(this);
        this.specialPost = this.specialPost.bind(this);
        this.postServerads = this.postServerads.bind(this);
        //口岸
        this.renderPortSelect = this.renderPortSelect.bind(this);
        //航线
        this.linesBack = this.linesBack.bind(this);
        this.chooseLines = this.chooseLines.bind(this);
        this.test = this.test.bind(this);
        this.state = {
            user: 0,
            comp: 0,
            BinduserName: '', //当前用户
            wxtoken: '',
            Pagestatus: 'lines',//AllAdvantage 首页   Ordinary 普通运价   Special 特殊   Service 服务优势   OrdinaryOrgin 起运地   OrdinaryDest 目的地   advantageDeta 优势明显
            backto: '', 
            adva: 0,
            cont: 0,
            serv: 0,
            serverTypes:1,
            servName: '',//服务类型
            carr: 0,
            carrName: '',//承运商
            depa: 0,
            depaName: '',
            dest: 0,
            destName: '',
            labeInside: '',
            labeOutside: '',
            recipientOne: '',
            rearr: [],
            reshowORhide: false,
            reuser: '',
            ServerPageServ: 0,
            ServerPageName: '',
            port: 0,
            portName: '',
            // 优势明显 是否被选中
            booking: 0,
            freight: 0,
            qing: 0,
            shipSpace: 0,
            advadetail: '',
            servOpti: 0,
            servOptiName: '',
            Msg: '',
            MsgType: 0,
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
    initState() {
        this.setState({
            servName: '',//服务类型
            carr: 0,
            carrName: '',//承运商
            depa: 0,
            depaName: '',
            dest: 0,
            destName: '',
            labeInside: '',
            labeOutside: '',
            recipientOne: '',
            rearr: [],
            reshowORhide: false,
            reuser: '',
            ServerPageServ: 0,
            ServerPageName: '',
            port: 0,
            portName: '',
            // 优势明显 是否被选中
            booking: 0,
            freight: 0,
            qing: 0,
            shipSpace: 0,
            advadetail: '',
            servOpti: 0,
            servOptiName: '',
        })
    }
    getBuserName(value) {
        console.log(value);
        if (!value.err) {
            let userJson = value.user;
            this.setState({
                BinduserName: userJson.userAcco,
                user: userJson.user,
                comp: userJson.comp,
            });
        }
        let BinduserName = this.state.BinduserName;
        let wxtoken = this.state.wxtoken;
        let user = this.state.user;
        let url = 'api/users/' + user + '/?userName=' + BinduserName + '&wxtoken=' + wxtoken + '&priv=true';
        getDataDetail(url, this.backUserPriv)
    }
   
    backUserPriv(value) {
        console.log(value);
        let priv = value.priv;
        this.setState({
            cont :priv.cont,
            adva :priv.adva,
        })
    }
     //跳转 普通运价 页面
    toOrdinary() {
        if (this.state.adva == 1) {
            this.setState({
                Pagestatus: 'Ordinary'
            })
            this.initState()
        }else {
            this.GetMsg(2, '您没有权限，请通知管理员添加', 'AllAdvantage');
        }
        
    }
    //返回 首页 页面
    backtoAll() {
        
        this.setState({
            Pagestatus: 'AllAdvantage'
        })

    }
    //跳转 特殊运价 页面
    toSpecial() {

        if (this.state.adva == 1) {
            this.setState({
                Pagestatus: 'Special'
            })
            this.initState()
        }else {
            this.GetMsg(2, '您没有权限，请通知管理员添加', 'AllAdvantage');
        }
        
    }
    //跳转 服务优势 页面
    toService() {
        if (this.state.cont == 1) {
            this.setState({
                Pagestatus: 'Service'
            })
            this.initState()
        }else {
            this.GetMsg(2, '您没有权限，请通知管理员添加', 'AllAdvantage');
        }

    }
    //跳转 普通运价起运地 页面
    OrdinaryOrgin() {
        this.setState({
            Pagestatus: 'OrdinaryOrgin'
        })
        this.initState()
    }
    //跳转 普通运价目的地 页面
    toOrdinaryDestination() {
        this.setState({
            Pagestatus: 'OrdinaryDest'
        })
        this.initState()
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
                Pagestatus: this.state.backto,
                serv: a,
                servName: b
            });
        }
    }
    GetservssID(a, b) {
        if (a > 0) {
            this.setState({
                Pagestatus: this.state.backto,
                ServerPageServ: a,
                ServerPageName: b
            });
        }
    }

    ServonClick() {
        this.setState({
            backto: 'OrdinaryOrgin',
            Pagestatus: 'Serv',
            serverTypes:3
        });
    }
    renderServSelect() {
        return <div>
            <BackT tit='服务类型' backonClick={this.back}></BackT>
            <div className="chooseServerType">请选择服务类型 ：</div>
            <div className="weui-cells">
                <AdServList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} servType={this.state.serverTypes} GetSelectID={this.GetservID} />
            </div>
        </div>
    }
    ServicerenderServSelect() {
        return <div>
            <BackT tit='服务类型' backonClick={this.back}></BackT>
            <div className="chooseServerType">请选择服务类型 ：</div>
            <div className="weui-cells">
                <AdServList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} servType='2' GetSelectID={this.GetservssID} />
            </div>
        </div>
    }
    //承运商
    GetCarrID(a, b) {
        if (a > -1) {
            this.setState({
                Pagestatus: this.state.backto,
                carr: a,
                carrName: b
            });
        }
    }
    CarronClick() {
        //backto  等于当前的 Pagestatus
        if (this.state.serv > 0) {
            this.setState({
                backto: this.state.Pagestatus,
                Pagestatus: 'Carr'
            });
        }
    }
    renderCarrSelect() {
        return <div>
            <BackT tit="承运商" backonClick={this.back} ></BackT>
            <div className="weui-cells">
                <CarrPage BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} serv={this.state.serv} GetSelectID={this.GetCarrID} />
            </div>
        </div>
    }
    //起运地
    GetDepaPortID(a, b) {
        if (a > 0) {
            this.setState({
                Pagestatus: this.state.backto,
                depa: a,
                depaName: b
            });
        }
    }
    DepaPortonClick() {
        if (this.state.serv > 0) {
            this.setState({
                backto: this.state.Pagestatus,
                Pagestatus: 'Depa'
            });
        }
    }
    DestServonClick() {
        this.setState({
            backto: 'OrdinaryDest',
            Pagestatus: 'Serv',
            serverTypes:3,
        });
    }
    renderDepaPortSelect() {
        return <div>
            <BackT tit="起运地航线" backonClick={this.back} ></BackT>
            <div className="weui-cells">
                <ADDepaPortsList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} serv={this.state.serv} GetSelectID={this.GetDepaPortID} backprop={this.back} />
            </div>
        </div>
    }
    //目的地
    GetDestPortID(a, b) {
        if (a > 0) {
            this.setState({
                Pagestatus: this.state.backto,
                dest: a,
                destName: b
            });
        }
    }
    DestPortonClick() {
        if (this.state.serv > 0) {
            this.setState({
                backto: this.state.Pagestatus,
                Pagestatus: 'Dest'
            });
        }
    }
    renderDestPortSelect() {
        return <div>
            <BackT tit="目的地" backonClick={this.back}></BackT>
            <div className="weui-cells">
                <ADDestPortsList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} serv={this.state.serv} GetSelectID={this.GetDestPortID} backprop={this.back} />
            </div>
        </div>
    }
    //优势明细跳转

    advaDetailonClick() {
        this.setState({
            backto: this.state.Pagestatus,
            Pagestatus: 'advantageDeta'
        });
    }
    GetDetail(a, b, c, d) {
        let v = '';
        if (a == 1) {
            v = v + '直接订舱；';
        }
        if (b == 1) {
            v = v + '运价；';
        }
        if (c == 1) {
            v = v + 'DDP/DDU；';
        }
        if (d == 1) {
            v = v + '舱位；';
        }
        this.setState({
            Pagestatus: this.state.backto,
            booking: a,
            freight: b,
            qing: c,
            shipSpace: d,
            advadetail: v
        });
    }
    advantageDetaPage() {
        return <div>
            <BackT tit='优势明细' backonClick={this.backtoOrdinaryOrgin}></BackT>
            <div className="">
                <DetailList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} GetChecked={this.GetDetail} backprop={this.back} />
            </div>
        </div>
    }
    //标注
    GetlabeInside(event) {
        this.setState({
            labeInside: event.target.value,
        })
        console.log(this.state.labeInside);
    }
    GetlabeOutside(event) {
        this.setState({
            labeOutside: event.target.value,
        })
    }
    // 到起运地多选页面
    backtoOrdinaryOrgin() {
        this.setState({
            Pagestatus: 'OrdinaryOrgin'
        })
    }
    //特种页面-服务类型
    SpecServonClick() {
        this.setState({
            backto: 'Special',
            Pagestatus: 'Serv',
            serverTypes:4,
        });
    }
    SpecialDepaClick() {
        if (this.state.serv > 0) {
            this.setState({
                backto: 'Special',
                Pagestatus: 'Depa'
            });
        }
    }
    //服务优势-服务类型
    ServiceServonClick() {
        this.setState({
            backto: 'Service',
            Pagestatus: 'ServiceServ',
         
        });
    }
    GetPortID(a, b) {
        if (a > 0) {
            this.setState({
                Pagestatus: 'Service',
                port: a,
                portName: b
            });
        }
    }
    //具体服务
    GetservservOptiID(a, b) {
        if (a > 0) {
            this.setState({
                Pagestatus: 'Service',
                servOpti: a,
                servOptiName: b
            });
        }
    }
    servOptionClick() {
        let b = this.state.Pagestatus;
        this.setState({
            backto: b,
            Pagestatus: 'ServOpti'
        });
    }
    renderServOptiSelect() {
        return <div>
            <BackT tit='服务类型' backonClick={this.back}></BackT>
            <div className="chooseServerType">请选择服务类型 ：</div>
            <div className="weui-cells">
                <AdservOptiList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} serv={this.state.ServerPageServ} GetSelectID={this.GetservservOptiID} backprop={this.back} />
            </div>
        </div>
    }
    ServiceDepaPortonClick() {
        if (this.state.ServerPageServ > 0) {
            this.setState({
                backto: 'Service',
                Pagestatus: 'Port'
            });
        }
    }
    //口岸
    renderPortSelect() {
        return <div>
            <BackT tit="口岸"></BackT>
            <div className="weui-cells">
                <ADPortsList BinduserName={this.state.BinduserName} wxtoken={this.state.wxtoken} serv={this.state.ServerPageServ} GetSelectID={this.GetPortID} backprop={this.back} />
            </div>
        </div>
    }
    //接收人
    chooseRe() {
        if (this.state.reshowORhide) {
            this.setState({
                reshowORhide: false,
            })
        } else {
            this.setState({
                reshowORhide: true,
            })
        }
        let BinduserName = this.state.BinduserName;
        let wxtoken = this.state.wxtoken;
        let comp = this.state.comp;
        let url = 'api/users/?userName=' + BinduserName + '&wxtoken=' + wxtoken + '&comp=' + comp + '&freiMngr=0&rowCount=0'
        getDataList(url, [], this.reList)
    }
    reList(value) {
        this.setState({
            rearr: value,
        })
    }
    renderReList() {
        let value = this.state.rearr;
        return value.map(s => {
            return <div key={s.user} >

                <div className="hidere">{s.user}</div>
                <div className="relists" onClick={this.getReid}>{s.name}</div>
            </div>
        });
    }
    getReid(event) {
        let user = event.target.previousSibling.innerHTML;
        let name = event.target.innerHTML;
        this.setState({
            reshowORhide: false,
            reuser: user,
            recipientOne: name
        })

    }
    //航线选择
    chooseLines() {
        this.setState({
            Pagestatus:'lines'
        })
        let BinduserName = this.state.BinduserName;
        let wxtoken = this.state.wxtoken;
        let url = 'api/lines/7/?userName=' + BinduserName + '&wxtoken=' + wxtoken ;
        getDataDetail(url,this.test)
    }
    linesBack() {
        return <div>
            <BackT tit='航线选择' backonClick={this.OrdinaryOrgin}></BackT>
            <div></div>
        </div>
    }
    test (value) {
        console.log(value);
    }
    //返回列表返回的页面
    back() {
        this.setState({
            Pagestatus: this.state.backto
        });
    }
    //起运地新增优势
    postadvasDepa() {
        let depaarr = [];
        depaarr.push(this.state.depa)
        let BinduserName = this.state.BinduserName;
        let wxtoken = this.state.wxtoken;
        let serv = this.state.serv;
        let carr = this.state.carr;
        let depaPort = depaarr;
        let destPort = this.state.dest;
        let user = this.state.user;
        let labe = this.state.labeOutside;
        let inLabe = this.state.labeInside;
        let booking = this.state.booking;
        let freight = this.state.freight;
        let qing = this.state.qing;
        let shipSpace = this.state.shipSpace;
        let url = 'api/advas/?userName=' + BinduserName + '&wxtoken=' + wxtoken + '&serv=' + serv + '&carr=' + carr
            + '&depaPort=[' + depaPort + ']&destPort=' + destPort + '&user=' + user + '&labe=' + labe + '&inLabe=' + inLabe + '&booking=' + booking + '&freight=' + freight
            + '&qing=' + qing + '&shipSpace=' + shipSpace + '&isDepa=true';

        if (serv == 0) {
            this.GetMsg(2, '服务类型不能为空', 'OrdinaryOrgin');  //提示类型错误,返回界面0
        } else if (carr == 0) {
            this.GetMsg(2, '承运商不能为空', 'OrdinaryOrgin');
        } else if (depaPort == 0) {
            this.GetMsg(2, '起运地不能为空', 'OrdinaryOrgin');  //提示类型错误,返回界面0
        } else if (destPort == 0) {
            this.GetMsg(2, '目的地不能为空', 'OrdinaryOrgin');  //提示类型错误,返回界面0
        } else {
            postYJData(url, [], this.callbackOrgin)
        }

    }
    //目的地新增优势
    postadvasDest() {
        let depaarr = [];
        depaarr.push(this.state.depa)
        let BinduserName = this.state.BinduserName;
        let wxtoken = this.state.wxtoken;
        let serv = this.state.serv;
        let carr = this.state.carr;
        let depaPort = depaarr;
        let destPort = this.state.dest;
        let user = this.state.user;
        let labe = this.state.labeOutside;
        let inLabe = this.state.labeInside;
        let booking = this.state.booking;
        let freight = this.state.freight;
        let qing = this.state.qing;
        let shipSpace = this.state.shipSpace;
        let url = 'api/advas/?userName=' + BinduserName + '&wxtoken=' + wxtoken + '&serv=' + serv + '&carr=' + carr
            + '&depaPort=' + depaPort + '&destPort=[' + destPort + ']&user=' + user + '&labe=' + labe + '&inLabe=' + inLabe + '&booking=' + booking + '&freight=' + freight
            + '&qing=' + qing + '&shipSpace=' + shipSpace + '&isDest=true';

        if (serv == 0) {
            this.GetMsg(2, '服务类型不能为空', 'OrdinaryDest');  //提示类型错误,返回界面0
        } else if (carr == 0) {
            this.GetMsg(2, '承运商不能为空', 'OrdinaryDest');
        } else if (destPort == 0) {
            this.GetMsg(2, '目的地不能为空', 'OrdinaryDest');  //提示类型错误,返回界面0
        } else if (depaPort == 0) {
            this.GetMsg(2, '起运地不能为空', 'OrdinaryDest');  //提示类型错误,返回界面0
        } else {
            postYJData(url, [], this.callbackOrgin)
        }
    }
    //特种
    specialPost() {
        let depaarr = [];
        depaarr.push(this.state.depa)
        let BinduserName = this.state.BinduserName;
        let wxtoken = this.state.wxtoken;
        let serv = this.state.serv;

        let depaPort = this.state.depaPort;

        let user = this.state.reuser;
        let labe = this.state.labeOutside;
        let inLabe = this.state.labeInside;

        let url = 'api/advas/?userName=' + BinduserName + '&wxtoken=' + wxtoken + '&serv=' + serv +
            '&depaPort=' + depaPort + '&user=' + user + '&labe=' + labe + '&inLabe=' + inLabe + '&isSpec=true';
        if (serv == 0) {
            this.GetMsg(2, '服务类型不能为空', 'OrdinaryDest');  //提示类型错误,返回界面0
        } else if (depaPort == 0) {
            this.GetMsg(2, '口岸不能为空', 'OrdinaryDest');  //提示类型错误,返回界面0
        } else {
            postYJData(url, [], this.callbackOrgin)
        }
    }
    //服务页面
    postServerads() {
        let BinduserName = this.state.BinduserName;
        let wxtoken = this.state.wxtoken;
        let serv = this.state.ServerPageServ;
        let servOpti = this.state.servOpti;
        let port = this.state.port;
        let user = this.state.reuser;
        let labe = this.state.labeOutside;
        let inLabe = this.state.labeInside;

        let url = 'api/conts/?userName=' + BinduserName + '&wxtoken=' + wxtoken + '&serv=' + serv + '&servOpti=' + servOpti +
            '&port=' + port + '&user=' + user + '&labe=' + labe + '&inLabe=' + inLabe;
        if (serv == 0) {
            this.GetMsg(2, '服务类型不能为空', 'OrdinaryDest');  //提示类型错误,返回界面0
        } else if (servOpti == 0) {
            this.GetMsg(2, '具体服务类型不能为空', 'OrdinaryDest');  //提示类型错误,返回界面0
        } else if (user == 0) {
            this.GetMsg(2, '接收人不能为空', 'OrdinaryDest');  //提示类型错误,返回界面0
        } else {
            console.log(url);
            postYJData(url, [], this.callbackOrgin)
        }
        // console.log(url);
        // postYJData(url, [], this.callbackOrgin)
    }
    callbackOrgin(value) {
        console.log(value);
        this.setState({
            backto: this.state.Pagestatus
        })
        if (value.err) {
            this.GetMsg(2, '该条件无法添加', this.state.backto);
        } else {
            this.GetMsg(1, '添加完成 请去网站（http://www.wumaobang.com） 查看详情', this.state.backto);
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
            <BackT backonClick={this.back} ></BackT>
            <Msg Text={this.state.Msg} Typeprop={this.state.MsgType} Btnprop={this.back} Btntextprop={'返回'} />
        </div>
    }
    //test
    testFunction(val) {
        console.log(val);
    }
    // 起运地多选页面
    OrdinaryOrginPage() {
        return <div className="ordinary_orgin">
            <BackT tit='普通运价优势-' tit2='起运地按航线选择' backonClick={this.backtoOrdinary}></BackT>
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
                <div className="labelChoose">
                    <span className="red"> * </span>
                    <div className="recipient">接收人</div>
                    {
                        this.state.recipientOne == '' ?
                            <div className="chooseRecipt" onClick={this.chooseRe}>请选择接受人</div> :
                            <div className="chooseRecipt" onClick={this.chooseRe}>{this.state.recipientOne}</div>
                    }

                </div>
            </div>
            {
                this.state.reshowORhide == true ?
                    this.renderReList() : undefined
            }
            <div className="thestep">第四步 : </div>
            <div className="ord_label">
                {
                    this.state.depaName == '' ?
                        <div className="labelChoose">
                            {/* <span className="red"> * </span><SkipLabel caption={'起运地航线'} text={'请选择起运地'} SelfonClick={this.DepaPortonClick} /> */}
                            <span className="red"> * </span><SkipLabel caption={'起运地'} text={'请选择目的地'} SelfonClick={this.chooseLines} />
                        </div> :
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'起运地航线'} text={this.state.depaName} SelfonClick={this.DepaPortonClick} />
                        </div>
                }
            </div>
            
            <div className="ord_label">
                {
                    this.state.destName == '' ?
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'目的地'} text={'请选择目的地'} SelfonClick={this.DestPortonClick} />
                        </div> :
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'目的地'} text={this.state.destName} SelfonClick={this.DestPortonClick} />
                        </div>
                }
            </div>
            <div className="thestep">其他 : </div>
            <ul className="otherRemarks">
                <li className="ord_label clearfix">
                    {
                        this.state.advadetail == '' ?
                            <SkipLabel caption={'优势细化'} text={'[非必选]'} SelfonClick={this.advaDetailonClick} /> :
                            <SkipLabel caption={'优势细化'} text={this.state.advadetail} SelfonClick={this.advaDetailonClick} />
                    }
                </li>
                <li className="ord_label markers"><StrInput caption={'内标注'} promptProp={'请输入备注信息'} updateStateProp={this.GetlabeInside} />

                </li>
                <li><div className="label_tip">内标注：内容为公司内用户所见</div></li>
                <li className="ord_label markers"><StrInput caption={'外标注'} promptProp={'请输入备注信息'} updateStateProp={this.GetlabeOutside} />

                </li>
                <li><div className="label_tip">外标注：内容为公司外其他用户所见</div></li>
            </ul>
            <div className=" bottom_btn">
                <a href="javascript:void(0)" className="weui-btn weui-btn_primary" onClick={this.postadvasDepa}>完成</a>
            </div>
        </div>
    }
    //目的地
    OrdinaryDestPage() {
        return <div className="ordinary_orgin">
            <BackT tit='普通运价优势-目的地多选' backonClick={this.backtoOrdinary}></BackT>
            <div>
                <div className="ord_prompt">标记 <span> * </span> 为必填</div>
            </div>

            <div className="thestep">第一步 : </div>
            <div className="ord_label">
                {
                    this.state.servName == '' ?
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'服务类型'} text={'请选择类型'} SelfonClick={this.DestServonClick} />
                        </div> :
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'服务类型'} text={this.state.servName} SelfonClick={this.DestServonClick} />
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
                <div className="labelChoose">
                    <span className="red"> * </span>
                    <div className="recipient">接收人</div>
                    {
                        this.state.recipientOne == '' ?
                            <div className="chooseRecipt" onClick={this.chooseRe}>请选择接受人</div> :
                            <div className="chooseRecipt" onClick={this.chooseRe}>{this.state.recipientOne}</div>
                    }

                </div>
            </div>
            {
                this.state.reshowORhide == true ?
                    this.renderReList() : undefined
            }
            <div className="thestep">第四步 : </div>
            <div className="ord_label">
                {
                    this.state.depaName == '' ?
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'起运地'} text={'请选择目的地'} SelfonClick={this.DepaPortonClick} />
                            
                        </div> :
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'起运地'} text={this.state.depaName} SelfonClick={this.DepaPortonClick} />
                        </div>
                }
            </div>
            <div className="ord_label">
                {
                    this.state.destName == '' ?
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'目的地航线'} text={'请选择起运地'} SelfonClick={this.DestPortonClick} />
                        </div> :
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'目的地航线'} text={this.state.destName} SelfonClick={this.DestPortonClick} />
                        </div>
                }
            </div>
            
            <div className="thestep">其他 : </div>
            <ul className="otherRemarks">
                <li className="ord_label clearfix">
                    {
                        this.state.advadetail == '' ?
                            <SkipLabel caption={'优势明细'} text={'[非必选]'} SelfonClick={this.advaDetailonClick} /> :
                            <SkipLabel caption={'优势明细'} text={this.state.advadetail} SelfonClick={this.advaDetailonClick} />
                    }
                </li>
                <li className="ord_label markers"><StrInput caption={'内标注'} promptProp={'请输入备注信息'} updateStateProp={this.Getlabe} />

                </li>
                <li><div className="label_tip">内标注：内容为公司内用户所见</div></li>
                <li className="ord_label markers"><StrInput caption={'外标注'} promptProp={'请输入备注信息'} updateStateProp={this.Getlabe} />


                </li>
                <li><div className="label_tip">外标注：内容为公司外其他用户所见</div></li>
            </ul>
            <div className=" bottom_btn">
                <a href="javascript:void(0)" className="weui-btn weui-btn_primary" onClick={this.postadvasDest}>完成</a>
            </div>
        </div>
    }
    //特种
    SpecialPage() {
        return <div className="sperial_page">
            <BackT tit="新增特种货运价优势" backonClick={this.backtoAll}></BackT>
            <div>
                <div className="ord_prompt">标记 <span className="red"> * </span> 为必填</div>
            </div>

            <div className="thestep">第一步 : </div>
            <div className="ord_label">
                {
                    this.state.servName == '' ?
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'服务类型'} text={'请选择服务类型'} SelfonClick={this.SpecServonClick} />
                        </div> :
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'服务类型'} text={this.state.servName} SelfonClick={this.SpecServonClick} />
                        </div>
                }
            </div>
            <div className="thestep">第二步 : </div>
            <div className="ord_label">
                <div className="labelChoose">
                    <span className="red"> * </span>
                    <div className="recipient">接收人</div>
                    {
                        this.state.recipientOne == '' ?
                            <div className="chooseRecipt" onClick={this.chooseRe}>请选择接受人</div> :
                            <div className="chooseRecipt" onClick={this.chooseRe}>{this.state.recipientOne}</div>
                    }

                </div>
            </div>
            {
                this.state.reshowORhide == true ?
                    this.renderReList() : undefined
            }
            <div className="thestep">第三步 : </div>
            <div className="ord_label">
                {
                    this.state.depaName == '' ?
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'口岸'} text={'请选择起口岸'} SelfonClick={this.SpecialDepaClick} />
                        </div> :
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'口岸'} text={this.state.depaName} SelfonClick={this.SpecialDepaClick} />
                        </div>
                }
            </div>
            <div className="thestep">其他 : </div>
            <ul className="otherRemarks">
                <li className="ord_label markers"><StrInput caption={'内标注'} promptProp={'请输入备注信息'} updateStateProp={this.GetlabeInside} />

                </li>
                <li><div className="label_tip">内标注：内容为公司内用户所见</div>
                </li>
                <li className="ord_label markers"><StrInput caption={'外标注'} promptProp={'请输入备注信息'} updateStateProp={this.GetlabeOutside} />

                </li>
                <li> <div className="label_tip">外标注：内容为公司外其他用户所见</div></li>
            </ul>
            <div className=" bottom_btn">
                <a href="javascript:void(0)" className="weui-btn weui-btn_primary" onClick={this.specialPost}>完成</a>
            </div>
        </div>
    }
    //服务优势页面
    ServicePage() {
        return <div className="ServicePage">
            <BackT tit='新增服务优势' backonClick={this.backtoAll}></BackT>
            <div>
                <div className="ord_prompt">标记 <span> * </span> 为必填</div>
            </div>
            <div className="thestep">第一步 : </div>
            <div className="ord_label">
                {
                    this.state.ServerPageName == '' ?
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'服务类型'} text={'请选择类型'} SelfonClick={this.ServiceServonClick} />
                        </div> :
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'服务类型'} text={this.state.ServerPageName} SelfonClick={this.ServiceServonClick} />
                        </div>
                }
            </div>
            <div className="thestep">第二步 : </div>
            <div className="ord_label">
                {
                    this.state.servOptiName == '' ?
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'具体服务类型'} text={'请选择具体服务类型'} SelfonClick={this.servOptionClick} />
                        </div> :
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'具体服务类型'} text={this.state.servOptiName} SelfonClick={this.servOptionClick} />
                        </div>
                }
            </div>
            <div className="thestep">第三步 : </div>
            <div className="ord_label">
                <div className="labelChoose">
                    <span className="red"> * </span>
                    <div className="recipient">接收人</div>
                    {
                        this.state.recipientOne == '' ?
                            <div className="chooseRecipt" onClick={this.chooseRe}>请选择接受人</div> :
                            <div className="chooseRecipt" onClick={this.chooseRe}>{this.state.recipientOne}</div>
                    }

                </div>
            </div>
            {
                this.state.reshowORhide == true ?
                    this.renderReList() : undefined
            }
            <div className="thestep">第四步 : </div>
            <div className="ord_label">
                {
                    this.state.portName == '' ?
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'口岸'} text={'请选择起运地'} SelfonClick={this.ServiceDepaPortonClick} />
                        </div> :
                        <div className="labelChoose">
                            <span className="red"> * </span><SkipLabel caption={'口岸'} text={this.state.portName} SelfonClick={this.ServiceDepaPortonClick} />
                        </div>
                }
            </div>
            <div className="thestep">其他 : </div>
            <ul className="otherRemarks">
                <li className="ord_label markers"><StrInput caption={'内标注'} promptProp={'请输入备注信息'} updateStateProp={this.GetlabeInside} />

                </li>
                <li> <div className="label_tip">内标注：内容为公司内用户所见</div></li>
                <li className="ord_label markers"><StrInput caption={'外标注'} promptProp={'请输入备注信息'} updateStateProp={this.GetlabeOutside} />

                </li>
                <li> <div className="label_tip">外标注：内容为公司外其他用户所见</div></li>
            </ul>
            <div className=" bottom_btn">
                <a href="javascript:void(0)" className="weui-btn weui-btn_primary" onClick={this.postServerads}>完成</a>
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
                            <div className="Alltit">新增优势 </div>
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
                            <BackT tit='请选择添加优势的类型' backonClick={this.backtoAll}></BackT>
                            <ul>
                                <li className="ordinary_page_orgin" onClick={this.OrdinaryOrgin}><a href="javascript:void(0)">起运地-<span>按航线选择</span></a></li>
                                <li className="ordinary_page_destination" onClick={this.toOrdinaryDestination}><a href="javascript:void(0)">目的地-<span>按航线选择</span></a></li>
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
                        this.OrdinaryDestPage() : undefined
                }
                {/* 特种运价 */}
                {
                    this.state.Pagestatus == 'Special' ?
                        this.SpecialPage() : undefined
                }
                {/* 服务优势 */}
                {
                    this.state.Pagestatus == 'Service' ?
                        this.ServicePage() : undefined
                }
                {
                    this.state.Pagestatus == 'advantageDeta' ?
                        this.advantageDetaPage() : undefined
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
                {
                    this.state.Pagestatus == 'Dest' ?
                        this.renderDestPortSelect() : undefined
                }
                {
                    this.state.Pagestatus == 'Port' ?
                        this.renderPortSelect() : undefined
                }
                {
                    this.state.Pagestatus == 'ServiceServ' ?
                        this.ServicerenderServSelect() : undefined
                }

                {
                    this.state.Pagestatus == 'ServOpti' ?
                        this.renderServOptiSelect() : undefined
                }
                {
                    this.state.Pagestatus == 'Msg' ?
                        this.renderMsg() : undefined
                }
                
                {
                    this.state.Pagestatus == 'lines'?
                    this.linesBack() :undefined
                }
            </div>

        )
    }
}

export default AdvantageNew;

