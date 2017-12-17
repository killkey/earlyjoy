import React, {Component} from 'react';
// import { connect } from 'react-redux';
// import actions from '../../redux/actions/index.js';
import {ajax} from '../../util/index'

// @connect((state) => {
//   return {
//     cntData: state.cnt
//   }
// },{...actions})
export default class MarkToday extends Component {
  constructor() {
    super();
    this.state = {img: '', text: '', getupTime: '', status: ''}
  }

  componentDidMount() {
    this.hour=24;
    this.minutes=this.format(0);
    // ajax({
    //   url: 'http://localhost:8333/api/myinfo',
    //   method: 'get',
    // }).then(res => {
    //    debugger;
    // }).catch(err => {
    //   // debugger;
    // });
    let time = new Date();
    let hour=time.getHours();
    let minutes=time.getMinutes()
    time = (this.format(hour) + ':' + this.format(minutes));
    if (hour - this.hour < 0||hour - this.hour==0&&minutes==0) {
      this.setState({status: '准时起床'})
    }else {
      this.setState({status: '迟到啦~ 懒鬼'})
    }
    this.setState({getupTime: time});
  }

  format(time) {
    return (Array(2).join(0) + time).slice(-2);
  }

  handleSubmit = () => {
    this.setState({img: this.img.value, text: this.text.value}, function () {
      ajax({
        url: 'http://localhost:8333/api/markToday',
        method: 'POST',
        data: this.state
      }).then(res => {
        // debugger;
      }).catch(err => {
        // debugger;
      });
    })
  }

  render() {
    return (
      <div className="page-wrap main-page" ref="mainPage">
        <p>上传图片 + <input type="file" ref={input => this.img = input}/></p>
        <p>当前时间 :<span>{this.state.getupTime}</span></p>
        <p>目标时间 :<span>{this.hour+':'+this.minutes}</span></p>
        <p>状态:{this.state.status}</p>
        <p><input ref={input => this.text = input} type="textera" placeholder='写一句话吧~'
                  style={{height: 100, width: '100%'}} multiple/></p>
        <p>
          <button onClick={this.handleSubmit}>确定打卡</button>
        </p>
      </div>
    )
  }
}
import './markToday.less'
