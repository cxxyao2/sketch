import * as React from 'react';
import { classnames } from '../../../utils/classname';
import { Tag, TagColor } from '../common/tag';
import './tagbasic-list.scss';
import { ResData } from '../../../config/api';

export type TagListType = {
  tagCategoryName:string,
  childTags:ResData.Tag[],
  tagSize?:'normal'|'medium'|'large',
  tagColor?:TagColor,
  selectable?:boolean,
  selectedColor?:TagColor,
  showTrashBin?:boolean,
  backgroundColor?:string,
  className?:string;
  style?:React.CSSProperties;
  sortAvailable?:boolean;
  sortFlag?:boolean;
};

export class TagBasicList extends React.Component<{
  // props
  tagCategoryName:string;
  childTags:ResData.Tag[];
  tagSize:'normal'|'medium'|'large',
  tagColor:TagColor,
  selectable:boolean,
  selectedColor:TagColor,
  showTrashBin:boolean,
  onClick:(selected:boolean, selectedId:number) => void;
  backgroundColor?:string,
  className?:string;
  style?:React.CSSProperties;
  sortAvailable?:boolean;
  sortFlag?:boolean;
}, {
  // states
  sortFlag:boolean;
  sortAvailable:boolean;
  myChildTags:ResData.Tag[];
}> {
  public state = {
    sortAvailable: this.props.sortAvailable || false, // false, 默认排序按钮不可见
    sortFlag: this.props.sortFlag || false, // false, 默认按照标签名字升序排列
    myChildTags: this.props.childTags || [],
  };

  public onSort = (sortFlag:boolean) => {
    const childTags = [...this.state.myChildTags];
    // false,升序
    if (!sortFlag) {
      childTags.sort( (a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0));
    }
    //true,降序
    if (sortFlag) {
      childTags.sort( (a, b) => (a.id > b.id) ? -1 : ((b.id > a.id) ? 1 : 0));
    }
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
        <span style={{ float:'right', display:this.props.showTrashBin ? 'inline' : 'none'}}>
          <i className="far fa-trash-alt"></i>
        </span>
      </div>
      <div className={classnames('tags')} >
          {this.state.myChildTags.map((child, inx) => {
          return   <Tag
          key={child.id}
          selectable={this.props.selectable || true}
          color={this.props.tagColor}
          selectedColor={this.props.selectedColor}
          style={this.props.style}
          onClick={(selected:boolean) => this.props.onClick(selected, child.id)}
          size={this.props.tagSize}>{child.attributes.tag_name}</Tag>;
          })}
        </div>
      </div>
      </div>
      );
  }
}

