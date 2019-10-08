import * as React from 'react';
import './searchhomepage-bar.scss';

export class SearchHomepageBar extends React.Component<{
  hasInfo:boolean;
  onSearch:() => void;
  onInfo:() => void;
  style?:React.CSSProperties,
}, {}> {

  public render () {
    return <div className="searchhomepage">
    <div style= {this.props.style || {}} className="searchbar">
    <div className="searchcondition" onClick={this.props.onSearch}>
      <i className="fa fa-search i00" id="i-advanced-search-i"></i>&nbsp;搜索文章、作者
    </div>
    <div className="alert" onClick={this.props.onInfo}>
      <i className="fas fa-bullhorn" style={{color: this.props.hasInfo ? 'red' : 'black'}}></i>
      <span>消息</span>
    </div>
    </div>
    </div>;
  }
}




