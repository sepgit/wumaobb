import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../css/weui.css';
import '../css/page.css';
import YJSearchBaidu from './YJSearchBaidu.js';
import TZSearchBaidu from './TZSearchBaidu.js';
import FWSearchBaidu from './FWSearchBaidu.js';
import Rpath from '../Rpath.js';
import Title from  '../component/Title.js';
import BackTitle from '../component/BackTitle.js';
import HTTPED from '../address';

class Baidu extends Component {
  constructor(props) {
    super(props);
    this.renderMain = this.renderMain.bind(this);
    this.renderYJ = this.renderYJ.bind(this);
    this.renderFW = this.renderFW.bind(this);
    this.renderTZ = this.renderTZ.bind(this);
    this.ToMain = this.ToMain.bind(this);
    this.ToYJ = this.ToYJ.bind(this);
    this.ToFW = this.ToFW.bind(this);
    this.ToTZ = this.ToTZ.bind(this);
    this.state = {
      Pagestatus:'',
      doorpic:''
    }
  }

  componentWillMount(){
    this.setState({
      Pagestatus:'Main',
      doorpic:HTTPED+ "images/door.png",
    });
  }

  ToYJ(){
    this.setState({
      Pagestatus:'YJ',
    });
  }

  ToFW(){
    this.setState({
      Pagestatus:'FW',
    });
  }

  ToTZ(){
    this.setState({
      Pagestatus:'TZ',
    });
  }

  ToMain(){
    this.setState({
      Pagestatus:'Main',
    });
  }

  renderMain(){
    return  <div className="page">
      <Title Titletext={'服务类型'}/>
      <div className="page__bd page__bd_spacing">
        <div className="weui-flex">
          <div className="weui-flex__item"><div className="blue_panel"><a className="Text_title" href="javascript:;" onClick={this.ToYJ}>普通货优势搜索</a></div></div>
          <div className="blue_panel"><img className="panel_Coin" src={this.state.doorpic}/></div>
        </div>
        <div className="nocolor_panel"></div>
        <div className="weui-flex">
          <div className="weui-flex__item"><div className="green_panel"><a className="Text_title" href="javascript:;" onClick={this.ToTZ}>特种货优势搜索</a></div></div>
          <div className="green_panel"><img className="panel_Coin" src={this.state.doorpic}/></div>
        </div>
        <div className="nocolor_panel"></div>
        <div className="weui-flex">
          <div className="weui-flex__item"><div className="black_panel"><a className="Text_title" href="javascript:;" onClick={this.ToFW}>服务优势搜索</a></div></div>
          <div className="black_panel"><img className="panel_Coin" src={this.state.doorpic}/></div>
        </div>
      </div>
    </div>
  }

  renderYJ(){
    return  <div>
      <BackTitle backonClick={this.ToMain}/>
      <YJSearchBaidu />
    </div>
  }

  renderFW(){
    return  <div>
      <BackTitle backonClick={this.ToMain}/>
      <FWSearchBaidu />
    </div>
  }

  renderTZ(){
    return  <div>
      <BackTitle backonClick={this.ToMain}/>
      <TZSearchBaidu />
    </div>
  }

  render() {
    return (
      <div>
        {
          this.state.Pagestatus=='Main'?
            this.renderMain():undefined
        }
        {
          this.state.Pagestatus=='YJ'?
            this.renderYJ():undefined
        }
        {
          this.state.Pagestatus=='FW'?
            this.renderFW():undefined
        }
        {
          this.state.Pagestatus=='TZ'?
            this.renderTZ():undefined
        }
      </div>
    );
  }
}
export default Baidu;