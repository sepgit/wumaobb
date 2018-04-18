import React, { Component } from 'react';
import '../css/weui.css';
import HTTPED from '../address';
//具体的每一个搜索到的具体的用户数据
class EachCompany extends Component {
    constructor(props) {
        super(props);
        this.state={
            user : "user",
            ipgp : "bang",
            name: 'name',
            userAcco:'userAcco',
            
          }
    }
    componentWillMount() {
        this.setState({
            ITuser:this.props.user,
            ituserAcco:this.props.userAcco
        });
      }

    render(){
        let vip = HTTPED + 'images/vip.png';
        return (
            <ul className="companyChoose clearfix">
                <li className="companyID" >{ this.props.user }</li>
                <li className="companyIcon" ><img src={vip} alt="会员" className="companyIcon_img"/></li>
                <li className="companyUser">{ this.props.name }</li>
                
                {/* 公司简称 */}
                <li className="companyIPGP">{ this.props.ipgp }</li>
                <li className="companyList" onClick={this.props.chooseClick}>选择</li>
            </ul>
        )
    }
}

export default EachCompany;