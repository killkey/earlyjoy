import React, { Component } from 'react';
import {ajax} from "../../util/index";
import {Link} from "react-router-dom";

export default class extends Component {
  constructor () {
    super();
    this.state = {
      list: []
    };
  }

  componentWillMount () {
    //{ method='', url='', async=true, data={}, headers={} }
    ajax({
      method: 'POST',
      url: 'http://localhost:8333/api/todaylist',
      data: {
        offset: 0,
        limit: 24,
      }
    }).then(res => {
      let {list, hasMore} = res;
      this.setState({list, hasMore});
    }).catch(error => {
      console.log('请求/api/todaylist失败');
    });
  }

  render () {

    return (
      <div className="page-wrap today-page" ref="todayPage">
        今日列表好友情况/好友列表
        <ul className='today-list'>
          {
            this.state.list.map((item, index) => (
              <Link to={`/detail/${item.uid}`} key={index}>
                <li>
                  <img src={item.img} alt=""/>
                  <p>
                    <span className='today-list-name'>{item.userName}</span>
                    <span className='today-list-reason'>起床迟到</span>
                    <span className='today-list-date'>{item.time}</span>
                  </p>
                  <span className='today-list-detail'>{item.text}</span>
                  <span className='today-list-heart'>i</span>
                </li>
              </Link>
            ))
          }
        </ul>
      </div>
    )
  }
}
import './today.less';
