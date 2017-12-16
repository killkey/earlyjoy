import React, { Component } from 'react';
import {ajax} from "../../util/index";
import {HashRouter as Router,Route,Link} from 'react-router-dom'
import index from '../index/index'
export default class extends Component {
  constructor () {
    super();
    this.state = {

    };
  }

  componentWillMount () {
    ajax({
      method:'post',
      url:'http://localhost:8333/api/ranklist',
      data:{offset:0,limit:10}
    }).then(res=>{
      let {list,hasMore}=res;
      this.setState({list,hasMore})
    }).catch(err=>{
      console.log(err);
    })
  }

  render () {
    return (
      <Router>
      <div className="page-wrap rank-page">
        <Route path='/index' component={index}/>
        {
          this.state.hasMore?this.state.list.map((item,index)=>(
            <Link to='/detail' className='rank-item' key={index}>
              <div className="rank-level">{item.rank}</div>
              <div className="rank-avatar">
                <img src={item.avatar} alt=""/>
              </div>
              <span className="rank-user-name">{item.userName}</span>
              <div className="rank-continued">{`连续起床${item.continued}天`}</div>
            </Link>
          )):null
        }
      </div>
      </Router>
    )
  }
}
import './rank.less';
