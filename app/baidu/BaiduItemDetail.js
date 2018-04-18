import React, { Component } from 'react';
import '../css/weui.css';
import UnEnableInput from '../component/UnEnableInput.js'
import Button from '../component/Button.js'
import BackTitle from '../component/BackTitle.js';
import TelLabel from '../component/TelLabel.js';
import {getDataDetail,postProv} from '../DataInterface.js';

class BaiduItemDetail extends Component {
  constructor(props) {
    super(props);
    this.getRDataDetail = this.getRDataDetail.bind(this);
    this.AddProvonClick = this.AddProvonClick.bind(this);
    this.GetscorsonClick = this.GetscorsonClick.bind(this);

    this.state = {
      wxtoken:'',
      BinduserName:'',
      Type:'',          //YJ,FW,TZ
      user:'',
      compAliaName:'',
      posi:'',
      induName:'',
      mobi:'',
      mail:'',
      addr:'',
      qq:'',

      cont:0,
      serv:0,
      port:0,
      compName:'',
      portName:'',

      booking:0,
      freight:0,
      qing:0,
      shipSpace:0,
      advDetail:'',
      scors:[]
    }
  }

  componentWillMount(){
    let url = '';
    let keyID = this.props.keyID;
    console.log("keyID="+this.props.keyID);
    let BinduserName = this.props.BinduserName;
    let wxtoken = this.props.wxtoken;
    this.setState({
      BinduserName:this.props.BinduserName,
      wxtoken:this.props.wxtoken,
      cont:this.props.cont,
      serv:this.props.serv,
      port:this.props.port,
      Type:this.props.Type
    });
    if (this.props.Type!='FW')
    {
      url = 'api/disps/'+keyID+'/?userName='+BinduserName+'&wxtoken='+wxtoken+'&isAdva=true';
    } else {
      url = 'api/disps/'+keyID+'/?userName='+BinduserName+'&wxtoken='+wxtoken+'&isCont=true';
    }
    getDataDetail(url,this.getRDataDetail);
    //getUserInfo(cont,BinduserName,wxtoken,this.getRUserInfo);
  }

  getRDataDetail(value){
    console.log(value);
    let dispsJson ='';
    if (!value.err) {
      if (this.props.Type!='FW')
      {
        dispsJson = value.adva;
      } else {
        dispsJson = value.cont;
      }

      let v ='';
      if (dispsJson.booking==1){
        v = v+'直接订舱；';
      }
      if (dispsJson.freight==1){
        v = v+'运价；';
      }
      if (dispsJson.qing==1){
        v = v+'DDP/DDU；';
      }
      if (dispsJson.shipSpace==1){
        v = v+'舱位；';
      }
      this.setState({
        user:dispsJson.user,
        compAliaName:dispsJson.compAliaName,
        posi:dispsJson.posi,
        induName:dispsJson.induName,
        mobi:dispsJson.mobi,
        mail:dispsJson.mail,
        addr:dispsJson.addr,
        qq:dispsJson.qq,
        portName:dispsJson.userPort,
        booking:dispsJson.booking,
        freight:dispsJson.freight,
        qing:dispsJson.qing,
        shipSpace:dispsJson.shipSpace,
        advDetail:v,
        scors:dispsJson.scors
      });

    }
  }

  AddProvonClick(){
    let a= this.state.user;
    this.props.AddpProp(a);
  }

  GetscorsonClick(){
    let a= this.state.scors;
    console.log(a);
  }

  render() {
    return (
      <div>
        <BackTitle backonClick={this.props.backprop}/>
        <div className="weui-cells weui-cells_form">
          <UnEnableInput captionProp={'公司名称'} promptProp={'-'} textProp={this.state.compAliaName}/>
          <UnEnableInput captionProp={'职位'} promptProp={'-'} textProp={this.state.posi}/>
          <UnEnableInput captionProp={'行业'} promptProp={'-'} textProp={this.state.induName}/>
          <UnEnableInput captionProp={'口岸'} promptProp={'-'} textProp={this.state.portName}/>
          <TelLabel captionProp={'手机'} promptProp={'尚未绑定手机号'} textProp={this.state.mobi}/>
          <UnEnableInput captionProp={'邮箱'} promptProp={'-'} textProp={this.state.mail}/>
          <UnEnableInput captionProp={'地址'} promptProp={'-'} textProp={this.state.addr}/>
          <UnEnableInput captionProp={'QQ'} promptProp={'-'} textProp={this.state.qq}/>
          {
            this.state.Type == 'YJ' ?
              <UnEnableInput captionProp={'优势明细'} promptProp={'-'} textProp={this.state.advDetail}/>: undefined
          }
        </div>
        <Button text={'查看评论'} buttonstyle="1" ClickProp={this.GetscorsonClick}/>
        <Button text={'添加供应商'} buttonstyle="1" ClickProp={this.AddProvonClick}/>
      </div>
    );
  }
}
export default BaiduItemDetail;