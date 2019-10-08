import * as React from 'react';
import { TagBasicList } from './tagbasic-list';
import './tagbasiclist-select.scss';

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

export class TagBasicListSelect extends React.Component<{
  taglist:taglistType[];
  onBack:() => void;
  onFilter:() => void;
  selectedCounter:number;
  onSelect:([]) => void;
}, {
}>  {

  private selectedTags:string[] = [];
  public onClick = (selected:boolean, selectedId:string) => {
    if (this.selectedTags.length === 0){
      this.selectedTags.push(selectedId);
      this.props.onSelect && this.props.onSelect(this.selectedTags);
      return;
    }
    const pos = this.selectedTags.indexOf(selectedId);
    if (!selected && pos >= 0) {
      this.selectedTags.splice(pos, 1);
    }
    if (selected && pos < 0) {
      this.selectedTags.push(selectedId);
    }
    this.props.onSelect && this.props.onSelect(this.selectedTags);
  }

  public render () {
    return <div className="tagbasiclistselect">
    <div className="selectwrapper" >
      <div className="header">
        <div className="headerleft" onClick={this.props.onBack}>
          <i className="fas fa-chevron-left"></i>
          </div>
        <div className="headerright" onClick={this.props.onFilter}>
          <i className="fa fa-search i00"></i>
        </div>
        <div className="headermiddle">
            标签列表
        </div>
      { (this.props.selectedCounter > 0) && <div className="selectsum">
        取消选择({this.props.selectedCounter})</div> }
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
          onClick={(selected, selectedId) => this.onClick(selected,selectedId)}>
      </TagBasicList> ;
      })}
      </div>
    </div>
    </div>;
  }
}


