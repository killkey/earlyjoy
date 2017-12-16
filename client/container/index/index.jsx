import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/index.js';
import {ajax} from '../../util/index';
import {Link} from 'react-router-dom'
@connect((state) => {
  return {
    cntData: state.cnt
  }
},{...actions})
export default class extends Component {
  constructor () {
    super();
    this.state = {list:[]};
  }

  handleClick=()=> {
    this.props.history.push('/rank')
  }

  componentDidMount(){
    ajax({
      url:'http://localhost:8333/api/myinfo',
      method:'get'
    }).then(res=>{

      let {userName,avatar}=res;
      this.setState({userName,avatar});
    }).catch(err=>{

    }),
      ajax({
        url:'http://localhost:8333/api/mylist',
        method:'post',
        data:{offset:0,limit:2}
      }).then(res=>{
        let {list}=res;
        this.setState({list});
      }).catch(err=>{

      })
  }


  render () {
    let { cnt } = this.props.cntData;
    let {userName,avatar}=this.state;
    let {img,text,getupTime}=this.state;
    return (
        <div className="page-wrap main-page" ref="mainPage">
          <div className="user-info-wrap">
            <img className="user-avatar" src={avatar}/>
            <p className='user-name'>{userName}</p>
            <div onClick={this.handleClick} className="today">
              <i>+</i><span>添加今日状态</span>
            </div>

            {
              this.state.list.map((item,index)=>(
                <Link to={`/detail/$(item.uid)`} key={index} className="box">
                  <img className="picture" src={item.img}/>
                  <p className="new">{item.text}</p>
                  <p className="data">{item.time}</p>
                </Link>
              ))
            }


          </div>
        </div>
    )
  }
}
import './index.less';
