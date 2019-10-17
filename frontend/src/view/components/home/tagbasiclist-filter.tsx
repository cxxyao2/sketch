import * as React from 'react';
import { TagBasicList, TagListType } from './tagbasic-list';
import './tagbasiclist-filter.scss';

export class TagBasicListFilter extends React.Component<{
  taglist:TagListType[];
  onBack:() => void;
  onFilter:(filCriteria:string) => void;
  onDelete:([]) => void;
}, {
  searchCondition:string;
}>  {

  private selectedTags:number[] = [];
  public onClick = (selected:boolean, selectedId:number) => {
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
              this.setState({searchCondition: ev.target.value});
            }}
            onKeyDown={(ev) => {
              // 如果按下回车键&&值不为空,
              if (ev.keyCode === 13 && this.state.searchCondition) {
                this.props.onFilter(this.state.searchCondition);
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
          selectable={category.selectable || true}
          showTrashBin={category.showTrashBin || false }
          backgroundColor={category.backgroundColor || 'rgba(244,245,249,1)'}
          style={category.style ||  {textDecoration:'none'}}
          onClick={(selected, selectedId) => selected && this.onClick(selected, selectedId)}>
      </TagBasicList> ;
      })}
      </div>
    </div>
    </div>;
  }
}