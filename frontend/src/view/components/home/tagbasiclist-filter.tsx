import * as React from 'react';
import { TagBasicList } from './tagbasic-list';
import './tagbasiclist-filter.scss';

type TagColor = 'black'|'dark'|'light'|'white'|'primary'|'link'|'info'|'success'|'warning'|'danger';

export class TagBasicListFilter extends React.Component<{
  taglist:{
    tagCategoryName:string,
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
  }[];
  onBack:() => void;
  onFilter:(filCriteria:string) => void;
  onDelete:([]) => void;
}, {
  searchCondtion:string;
}>  {

  private selectedTags:string[] = [];
  public onDelete = (selected:boolean, selectedId:string) => {
    if (this.selectedTags.length === 0) {
      this.selectedTags.push(selectedId);
      this.props.onDelete && this.props.onDelete(this.selectedTags);
      return;
    }
    const pos = this.selectedTags.indexOf(selectedId);
    if (!selected && pos >= 0) {
      this.selectedTags.splice(pos, 1);
    }
    if (selected && pos < 0) {
      this.selectedTags.push(selectedId);
    }
    this.props.onDelete && this.props.onDelete(this.selectedTags);
  }

  public render () {
    return <div className="tagbasiclistfilter">
    <div className="filter" >
      <div className="filterbar">
        <div className="filterbarcontent">
        <div className="filterbarcenter">
          <i className="fas fa-search" style={{margin:'0 5px 0 10px'}}></i>
          <input type="text" placeholder="" className="filterboxwidth"
            onChange={(ev) => {
              console.log(ev.target.value);
              this.setState({searchCondtion: ev.target.value});
            }}
            onKeyDown={(ev) => {
              // 如果按下回车键&&值不为空,
              if (ev.keyCode === 13 && this.state.searchCondtion) {
                this.props.onFilter(this.state.searchCondtion);
              }
            }}
            />
        </div>
        <div onClick={() => this.props.onBack }>取消</div>
      </div>
        {this.props.taglist.map((category) => {
        return  <TagBasicList
          key={category.tagCategoryName}
          tagCategoryName={category.tagCategoryName}
          childTags={ category.childTags}
          tagSize={category.tagSize || 'normal'}
          tagColor={category.tagColor || 'white'}
          selectedColor={category.selectedColor || 'danger'}
          showTrashbin={category.showTrashbin || false }
          backgroundColor={category.backgroundColor || 'rgba(244,245,249,1)'}
          style={category.style ||  {textDecoration:'none'}}
          onClick={(selected, selectedId) => selected && this.onDelete(selected, selectedId)}>
      </TagBasicList> ;
      })}
      </div>
    </div>
    </div>;
  }
}