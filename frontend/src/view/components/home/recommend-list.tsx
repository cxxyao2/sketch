import * as React from 'react';
import { Link  } from 'react-router-dom';
import { Popup } from '../common/popup';
import './recommend-list.scss';
import { TagBasicList } from './tagbasic-list';

type taglistType = {
  tagCatagoryName:string,
  childTags:{ tagId:string, tagName:string,selected:boolean,
    selectable:boolean,}[],
};

export class RecommendList extends React.Component<{
  taglist:taglistType[];
  threads:{id:number, channel_id:number, title:string, brief:string, author:string }[];
  onBack:() => void;
  onSearch:() => void;
  onShowTags:() => void;
}, {
  showPopup: boolean;
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
    console.log('hi,sort button,clicked');
  }

  public filterByTags = () => {
    this.setState((prevState) => {
      return {
        showPopup: !prevState.showPopup,
      };
    });
    console.log('hi,filter,clicked');
  }

  public onSelectTag = (selected:boolean, selectedId:string) => {
    // 选中1个tag
    console.log('tag is seleccted ', selected);
    console.log('tagid is', selectedId);
  }

  public render () {
    return <div style={{
      display:'flex',
      flexDirection:'column',
      alignItems:'center' ,
      backgroundColor:'rgba(244,245,249,1)',
      margin:'0',
      padding:'0',
      width:'100%'}} className="recommendlist">
      <div style={{
        margin:'0',
        backgroundColor:'white',
        padding: '10px 0',
        width:'100%',
        borderBottom: '4px solid rgba(244,245,249,1)',
      }}>
        <div style={{
          margin:'0 20px',
          float:'left'}} onClick={this.props.onBack}>
          <Link className=""
              to={`/back/`}><i className="fas fa-chevron-left"></i>
          </Link>
          </div>
        <div style={{
          margin:'0px',
          padding:'0px',
          float:'right',
          width:'50px'}} onClick={this.props.onSearch}>
          <Link className=""
                to={`/search/`}><i className="fa fa-search i00"></i>
          </Link>
        </div>
        <div style={{
          float:'none',
          width:'auto',
          margin:'0 50px',
          textAlign:'center',
          fontSize:'1.1rem'}}>
            推荐
        </div>
      </div>

      <div style={{
        margin: '0',
        backgroundColor: 'white',
        padding: '10px 0',
        width:'100%',
        borderBottom: '2px solid rgba(244,245,249,1)'}}>
        <div id="divSort"
          ref={(el) => el && (this.divSort = el)}
          style={{
          margin:'0 20px',
          float:'left',
          fontSize:'1rem',
          fontWeight:'bold'}} onClick={() => this.sortByTags()} >
          排序<i className="fas fa-sort-down" style={{marginLeft:'3px'}}></i>
        </div>
        <div style={{
          margin:'0 20px',
          padding:'0px',
          float:'right',
          fontSize:'1rem',
          fontWeight:'bold'}} onClick={this.props.onShowTags}>
          <Link className=""
                to={`/tags/`}>标签列表
          </Link>
        </div>
        <div style={{
          float:'none',
          width:'auto',
          margin:'0 50px',
          textAlign:'left',
          fontSize:'1rem',
          fontWeight:'bold'}} onClick={() => this.filterByTags()}>
        筛选<i className="fas fa-sort-down" style={{marginLeft:'3px'}}></i>
        </div>
      </div>

      {this.state.showPopup &&
        <Popup
          width = {'100%'}
          darkBackground={0.01}
          onClose={() => {
            console.log('chicked');
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
            tagSize={'medium'}
            tagColor={'light'}
            selectedColor={'danger'}
            showTrashbin={false}
            backgroundColor={'white'}
            onClick={(selected, selectedId) => this.onSelectTag(selected, selectedId)}>
          </TagBasicList> ;
          })}
        </Popup>
      }
      {this.props.threads.map((thread, id) => {
        return <div style={{
          margin:'0px',
          backgroundColor:'white',
          padding:'10px 0',
          width:'100%',
          display:'flex',
          flexDirection:'column',
          justifyContent:'flex-start',
          borderBottom: '4px solid rgba(244,245,249,1)',
          zIndex:1 }}>
        <div style={{margin:'0 20px'}}>
            <div style={{
              margin:'0px',
              fontSize:'1rem',
              float:'left',
              fontWeight:'bold'}}>
              <Link className="" key={thread.id}
                to={`/thread/${thread.id}`}>{thread.title}
              </Link>
            </div>
            <div style={{
              margin:'0px',
              padding:'0px',
              float:'right',
              textAlign:'right',
              width:'100px',
              fontSize:'0.9rem'}}>
              {thread.author}
            </div>
        </div>
        <div style={{margin:'0 20px', textAlign:'left',fontSize:'0.9rem'}}>{thread.brief}</div>
      </div> ;
  })}
  </div>;
  }
}