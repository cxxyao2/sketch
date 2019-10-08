import * as React from 'react';
import { classnames } from '../../../utils/classname';
import { Tag } from '../common/tag';
import './tagbasic-list.scss';

type TagColor = 'black'|'dark'|'light'|'white'|'primary'|'link'|'info'|'success'|'warning'|'danger';
type tagType = {
  tagId:string,
  tagName:string,
  selected:boolean,
  selectable:boolean,
};

export class TagBasicList extends React.Component<{
  // props
  tagCategoryName:string;
  childTags:tagType[];
  tagSize:'normal'|'medium'|'large',
  tagColor:TagColor,
  selectedColor:TagColor,
  showTrashbin:boolean,
  onClick:(selected:boolean, selectedId:string) => void;
  backgroundColor: string,
  className?:string;
  style?:React.CSSProperties;
  sortAvailable?:boolean;
  sortFlag?:boolean;
}, {
  // states
  sortFlag:boolean;
  sortAvailable:boolean;
  myChildTags:tagType[];
}> {
  public state = {
    sortAvailable: this.props.sortAvailable || false, // false, 默认排序按钮不可见
    sortFlag: this.props.sortFlag || false, // false, 默认按照标签名字升序排列
    myChildTags: this.props.childTags || [],
  };

  public onSort = (sortFlag:boolean) => {
    console.log('click onsort', sortFlag);
    const childTags = [...this.state.myChildTags];
    console.log('tags',childTags);
    // false,升序
    if (!sortFlag) {
      childTags.sort( (a, b) => (a.tagName > b.tagName) ? 1 : ((b.tagName > a.tagName) ? -1 : 0));
    }
    //true,降序
    if (sortFlag) {
      childTags.sort( (a, b) => (a.tagName > b.tagName) ? -1 : ((b.tagName > a.tagName) ? 1 : 0));
    }
    console.log('tags2',childTags);
    this.setState({myChildTags:childTags});
  }

  public render () {
    return (
      <div className="tagbasiclist">
            <div  className="listhead" style={{backgroundColor: this.props.backgroundColor}} >
      <div>
        <span className="listname">
          {this.props.tagCategoryName}
          {this.state.sortAvailable && <i className={classnames(
            'fas',
            {'fa-sort-down': !this.state.sortFlag},
            {'fa-sort-up': this.state.sortFlag})}
            style={{ marginLeft:'3px'}}
            onClick={() => {
              this.setState((prevState) => {
                this.onSort && this.onSort(!prevState.sortFlag);
                return {
                  sortFlag: !prevState.sortFlag,
                };
              });
            }}>
          </i>}
        </span>
        <span style={{ float:'right', display:this.props.showTrashbin ? 'inline' : 'none'}}>
          <i className="far fa-trash-alt"></i>
        </span>
      </div>
      <div className={classnames('tags')} >
          {this.state.myChildTags.map((child, inx) => {
          return   <Tag
          key={child.tagId}
          selected={child.selected}
          selectable={child.selectable}
          color={this.props.tagColor}
          selectedColor={this.props.selectedColor}
          style={this.props.style}
          onClick={(selected:boolean) => this.props.onClick(selected, child.tagId)}
          size={this.props.tagSize}>{child.tagName}</Tag>; })}
        </div>
      </div>
      </div>
      );
  }
}

