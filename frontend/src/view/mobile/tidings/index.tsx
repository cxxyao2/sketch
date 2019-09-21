import * as React from 'react';
import { MobileRouteProps } from '../router';
import { List } from '../../components/common/list';
import  './styles.css';
// 等后续用api直接替换
import data from './data';
import { Fragment } from 'react'

interface State {
  list: any,
  isAll: boolean
}

export class Tidings extends React.Component<MobileRouteProps, State> {
  public state:State = {
    isAll: true,
    list: data
};

  render () {
    return (
      <Fragment>
        <textarea className="textarea font13 border-0" placeholder="今天你丧了吗…" ></textarea>
        <div className="border-1px"></div>
        <button className="publish-btn" >发布</button>
        <div className="content">
          <div className="tiddings-tabs">
            <button className={  this.state.isAll ? 'tab-btn tab-btn-active' : 'tab-btn' } onClick={this.handleClick.bind(this, true)}>全部</button>
            <button className={  !this.state.isAll ? 'tab-btn tab-btn-active' : 'tab-btn' } onClick={this.handleClick.bind(this, false)}>关注</button>
          </div>
          <List> {this.renderList()} </List>
        </div>
      </Fragment>
    );
  }

  // 根据获取的动态信息渲染列表
  renderList () {
    return data.map((msg, idx) => {
      return (
        <List.Item key={ msg.id }>
            <div className="font13">
              <p className="font12">{msg.author}</p>
              {msg.message}
            </div>
          </List.Item>
      )
    })
  }
  
  async handleClick (isAll) {
    // TODO 确定api如何交互后修改
    // await this.getTidingsList().then(res => {
    //   this.setState((preState) => ({
    //     list: res
    //   }))
    // })
  }

  // 获取消息列表
  getTidingsList () {}

}