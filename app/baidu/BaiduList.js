import React, { Component } from 'react';
import '../css/weui.css';
import BaiduItem from './BaiduItem.js';
import BackTitle from '../component/BackTitle.js';
import SkipLabel from  '../component/SkipLabel';
import UnEnableInput from  '../component/UnEnableInput';
import HTTPED from '../address';

class BaiduList extends Component {
  constructor(props) {
    super(props);
    this.AddProv = this.AddProv.bind(this);
    this.Detail = this.Detail.bind(this);
    this.AddProv = this.AddProv.bind(this);
    this.showonClick = this.showonClick.bind(this);

    this.state={
      BinduserName:'',
      wxtoken:'',
      dataList:[],
      SelectID:0,
      vippic:'',
      platpic:'',
      showcondition:0
    }
  }

  componentWillMount() {
    this.setState({
      BinduserName:this.props.BinduserName,
      wxtoken:this.props.wxtoken,
      serv:this.props.serv,
      port:this.props.port,
      vippic: HTTPED+ "images/nvip.png",
      platpic:HTTPED+ "images/plat.png",
    });
  }

  AddProv(a){
    let u = a;
    this.props.AddProv(u);
  }

  Detail(a){
    this.setState({
      SelectID:a
    });
    this.props.GetDetail(a);
  }

  showonClick(){
    let a = this.state.showcondition;
    this.setState({
      showcondition:1-a
    });
  }

  render() {
    return (
      <div>
        <BackTitle backonClick={this.props.backprop}/>
        <SkipLabel caption={'您当前的搜索条件'}  SelfonClick={this.showonClick}/>
        {
          this.state.showcondition==1?
            <div className="weui-cells">
              {this.props.SearchCondition.map(s =>
                <UnEnableInput captionProp={s.name} textProp={s.value} />
              )}
            </div>:undefined
        }
        <div className="weui-flex">
          <div className="weui-flex__item"><div className="divLabel">　　<img className="LabelImage" src={this.state.vippic}/>会员展示</div></div>
          <div className="weui-flex__item"><div className="divLabel">　　<img className="LabelImage" src={this.state.platpic}/>平台展示</div></div>
        </div>
        {this.props.datas.map(s =>
          <BaiduItem
            BinduserName={this.props.BinduserName}
            wxtoken={this.props.wxtoken}
            Type={this.props.Type}
            key={s.adva}
            adva={s.adva}
            cont={s.cont}
            isVIP={s.isVIP}
            isPlat={s.isPlat}
            labe={s.labe}
            user={s.user}
            compAliaName={s.compAliaName}
            textProp={s.contName}
            AddpProp={this.AddProv}
            DetailProp={this.Detail}
          />
        )}
        <p>　　　</p>
      </div>
    )
  }
}

export default BaiduList;