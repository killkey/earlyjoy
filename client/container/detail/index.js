import React,{Component} from 'react';
import {ajax} from '../../util/index'
export default class Detail extends Component{
  constructor(){
    super()
    this.state={

    }
  }
  handleClick=()=>{
    this.props.history.push('/rank')
  }
  componentDidMount(){
    ajax({
      url:'http://localhost:8333/api/detail/:id',
      method:'GET'
    }).then(res=>{
      console.log(res);
      let {img,userName,time,continued} =res
      this.setState({img,userName,time,continued})
    })
  }
    render(){
    let {img,userName,time,continued} =this.state
        return (
            <div className="page-wrap main-page" ref="mainPage">
                <div className="user-info-wrap">
                  <img className="user-img" src={img} alt=""/>
                  <p>{userName}</p>
                </div>
              <p className="time">{time}</p>
              <p className="time">{continued}</p>
              <div className="right"><i className="iconfont icon-xin"></i></div>
              <div onClick={this.handleClick} className="state">他的其他状态</div>
            </div>
        )
    }
}
import './index.less'
