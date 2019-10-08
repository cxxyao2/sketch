import * as React from 'react';
import { Link  } from 'react-router-dom';
import { Popup } from '../common/popup';
import './recommend-list.scss';
import { TagBasicList } from './tagbasic-list';

type TagColor = 'black'|'dark'|'light'|'white'|'primary'|'link'|'info'|'success'|'warning'|'danger';

type taglistType = {
  tagCatagoryName:string,
  childTags:{
    tagId:string,
    tagName:string,
    selected:boolean,
    selectable:boolean}[],
  tagSize?:'normal'|'medium'|'large',
  tagColor?:TagColor,
  selectedColor?:TagColor,
  showTrashbin?:boolean,
  backgroundColor?:TagColor,
  style?:React.CSSProperties,

};

export class RecommendList extends React.Component<{
  taglist:taglistType[];
  threads:{id:number, channel_id:number, title:string, brief:string, author:string }[];
  onBack:() => void;
  onSearch:() => void;
  onShowTags:() => void;
}, {
  showPopup:boolean;
}>  {

  public state = {
    showPopup : false,
  };
  private selectedTags:string[] = [];
  public divSort:HTMLDivElement = document.createElement('div');

  public sortByTags = () => {
    this.setState((prevState) => {
      return {
        showPopup: !prevState.showPopup,
      };
    });
  }

  public filterByTags = () => {
    this.setState((prevState) => {
      return {
        showPopup: !prevState.showPopup,
      };
    });
  }

  public onSelectTag = (selected:boolean, selectedId:string) => {
    // 选中1个tag
  }

  public render () {
    return <div className="recommendlist">
    <div className="list" >
      <div className="header">
        <div className="headerleft" onClick={this.props.onBack}>
          <Link className=""
              to={`/back/`}><i className="fas fa-chevron-left"></i>
          </Link>
          </div>
        <div className="headerright" onClick={this.props.onSearch}>
          <Link className=""
                to={`/search/`}><i className="fa fa-search i00"></i>
          </Link>
        </div>
        <div className="headermiddle">
            推荐
        </div>
      </div>

      <div className="fonctionarea">
        <div id="divSort"
          ref={(el) => el && (this.divSort = el)}
          className="sortarea" onClick={() => this.sortByTags()} >
          排序<i className="fas fa-sort-down" style={{marginLeft:'3px'}}></i>
        </div>
        <div className="tagarea" onClick={this.props.onShowTags}>
          <Link className=""
                to={`/tags/`}>标签列表
          </Link>
        </div>
        <div className="filterarea" onClick={() => this.filterByTags()}>
        筛选<i className="fas fa-sort-down" style={{marginLeft:'3px'}}></i>
        </div>
      </div>

      {this.state.showPopup &&
        <Popup
          width = {'100%'}
          darkBackground={0.01}
          onClose={() => {
            this.setState((prevState) => {
            return {
              showPopup: !prevState.showPopup,
            };
          }); }}>
          {this.props.taglist.map((category) => {
            return  <TagBasicList
            key={category.tagCatagoryName}
            tagCategoryName={category.tagCatagoryName}
            childTags={ category.childTags}
            tagSize={category.tagSize || 'medium'}
            tagColor={category.tagColor || 'light'}
            selectedColor={category.selectedColor || 'danger'}
            showTrashbin={category.showTrashbin || false }
            backgroundColor={category.backgroundColor || 'white'}
            style={category.style ||  {textDecoration:'none'}}
            onClick={(selected, selectedId) => this.onSelectTag(selected, selectedId)}>
          </TagBasicList> ;
          })}
        </Popup>
      }
      {this.props.threads.map((thread, id) => {
        return <div className="threadarea">
        <div style={{margin:'0 20px'}}>
            <div className="threadtitle">
              <Link className="" key={thread.id}
                to={`/thread/${thread.id}`}>{thread.title}
              </Link>
            </div>
            <div className="threadauthor">
              {thread.author}
            </div>
        </div>
        <div className="threadbrief">{thread.brief}</div>
      </div> ;
      })}
    </div>
  </div>;
  }
}