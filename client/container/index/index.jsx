import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/index.js';
import {ajax} from '../../util/index'

@connect((state) => {
  return {
    cntData: state.cnt
  }
},{...actions})
export default class extends Component {
  constructor () {
    super();
    this.state = {

    };
  }

  clickHandler () {
    this.props.setCnt();
  }

  componentDidMount(){
    ajax({
      url: 'http://localhost:8333/api/myinfo',
      method: 'GET',
    }).then(res => {
      let {userName, avatar} = res;
      this.setState({userName, avatar});
    }).catch(err => {

    });
  };

  render () {
    let { cnt } = this.props.cntData;
    let {avatar, userName} = this.state;

    return (
        <div className="page-wrap main-page" ref="mainPage">
          <div className='user-info-wrap'>
            <img className='user-avatar' src={avatar} alt=""/>
            <p className='user-name'>{userName}</p>
          </div>
        </div>
    )
  }
}
import './index.less';
