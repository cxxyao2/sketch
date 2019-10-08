import '@fortawesome/fontawesome-free-webfonts/css/fa-brands.css';
import '@fortawesome/fontawesome-free-webfonts/css/fa-regular.css';
import '@fortawesome/fontawesome-free-webfonts/css/fa-solid.css';
import '@fortawesome/fontawesome-free-webfonts/css/fontawesome.css';
import { action } from '@storybook/addon-actions';
import { withConsole } from '@storybook/addon-console';
import { boolean, number, select, text, withKnobs } from '@storybook/addon-knobs';
import { withViewport } from '@storybook/addon-viewport';
import { addDecorator, storiesOf } from '@storybook/react';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import '../theme.scss';
import { Accordion } from '../view/components/common/accordion';
import { Animate } from '../view/components/common/animate';
import { Badge } from '../view/components/common/badge';
import { Card } from '../view/components/common/card';
import { Center } from '../view/components/common/center';
import { Dropdown } from '../view/components/common/dropdown';
import { FilterBar } from '../view/components/common/filter-bar';
import { List } from '../view/components/common/list';
import { LongList } from '../view/components/common/longList';
import { Mark } from '../view/components/common/mark';
import { NavBar } from '../view/components/common/navbar';
import { Popup } from '../view/components/common/popup';
import { PopupMenu } from '../view/components/common/popup-menu';
import { RouteMenu } from '../view/components/common/route-menu';
import { Slider } from '../view/components/common/slider';
import { Tab } from '../view/components/common/tab';
import { Tag, TagColor } from '../view/components/common/tag';
import { TagList } from '../view/components/common/tag-list';
import { FloatButton } from '../view/components/common/float-button';
import { Core } from '../core/index';
import { Carousel } from '../view/components/common/carousel';
import { NoticeBar } from '../view/components/common/notice-bar';
import { Loading } from '../view/components/common/loading';
import { ThreadPreview } from '../view/components/thread/thread-preview';
import { randomCnWords } from '../utils/fake';
import { FooterMenu } from '../view/components/common/footer-menu';
import { SearchHomepageBar } from '../view/components/home/searchhomepage-bar';
import { ChannelPreview } from '../view/components/home/channel-preview';
import { TagBasicList } from '../view/components/home/tagbasic-list';
import { TagBasicListSelect } from '../view/components/home/tagbasiclist-select';
import { TagBasicListFilter } from '../view/components/home/tagbasiclist-filter';
import { RecommendList } from '../view/components/home/recommend-list';

const core = new Core();

addDecorator((storyFn, context) => withConsole()(storyFn)(context));
addDecorator(withViewport());
addDecorator(withKnobs);

storiesOf('Common Components', module)
  .add('Badge', () => <Badge num={number('num', 10)}
      max={number('max', 0)}
      dot={boolean('dot', false)}
      hidden={boolean('hidden', false)}>
      {text('text', 'test')}
    </Badge>,
  )
  .add('Tag', () => {
    const colorOptions:{[name:string]:TagColor} = {
      black: 'black',
      dark: 'dark',
      light: 'light',
      white: 'white',
      primary: 'primary',
      link: 'link',
      info: 'info',
      success: 'success',
      warning: 'warning',
      danger: 'danger',
    };
    return <Tag
      selected={boolean('selected', false)}
      onClick={action('tag click')}
      size={select('size', {
        normal: 'normal',
        medium: 'medium',
        large: 'large',
      },           'normal')}
      color={select('color', colorOptions, undefined)}
      selectedColor={select('selectedColor', colorOptions, undefined)}
      rounded={boolean('rounded', false)}
      selectable={boolean('selectable', true)}
    >{text('text', 'test')}</Tag>;
  })
  .add('TagList', () => {
    const colorOptions:{[name:string]:TagColor} = {
      black: 'black',
      dark: 'dark',
      light: 'light',
      white: 'white',
      primary: 'primary',
      link: 'link',
      info: 'info',
      success: 'success',
      warning: 'warning',
      danger: 'danger',
    };
    return <TagList>
      {(new Array(number('length', 20)).fill(text('text', 'tag')).map((content, i) => <Tag
        key={i}
        onClick={action('tag click ' + i)}
        size={select('size', {
          normal: 'normal',
          medium: 'medium',
          large: 'large',
        },           'normal')}
        color={select('color', colorOptions, undefined)}
        selectedColor={select('selectedColor', colorOptions, undefined)}
        rounded={boolean('rounded', false)}
        selectable={boolean('selectable', true)}
      >{content}</Tag>))}
    </TagList>;
  })

  .add('FilterBar', () => {
    return <FilterBar></FilterBar>;
  })
  .add('Popup', () => React.createElement(class extends React.Component {
    public state = {
      showPopup: true,
    };
    public render () {
      return <div>
        <button className="button" onClick={() => this.setState({showPopup: true})}>show popup</button>
        {this.state.showPopup &&
          <Popup
            width={text('width', '')}
            bottom={text('bottom', '')}
            darkBackground={number('darkBackground', 0.8)}
            onClose={() => this.setState({showPopup: false})}>
            {text('content', 'example content')}
          </Popup>
        }
      </div>;
    }
  }))
  .add('Center', () => <Center width={text('width', '')} height={text('height', '')}>
    <div>center anything</div>
  </Center>)
  .add('List', () => <List>
    {['a', 'b', 'c'].map((item, i) => <List.Item
      key={i}
      onClick={() => alert('click item ' + item)}
      arrow={boolean('arrow', false)}>
      {item}
    </List.Item>)}
  </List>)
  .add('LongList', () => React.createElement(class extends React.Component {
    public state = {
      items: [],
      isLoading: true,
      cursor: 0,
    };

    public componentDidMount() {
      // do some paginated fetch
      this.loadMore();
    }

    public apiCall = async () => {
      await new Promise((resolve) => setTimeout(resolve, 100));
      return ['a', 'a', 'a', 'a', 'a'];
    }

    public loadMore = () => {
      // throttle could be implemented here, or in api service
      this.setState({ isLoading: true, error: undefined });
      this.apiCall().then((res) => {
        this.setState({
          items: [...this.state.items, ...res],
          isLoading: false,
          });
        },
                          (error) => {
            this.setState({ isLoading: false, error });
          });
      }

      public render() {
        return (
          <LongList
            isLoading={this.state.isLoading}
            hasMore={true}
            onLoadMore={this.loadMore}
          >
            {this.state.items.map((item, i) => (
              <List.Item
                key={i}
                onClick={() => alert('click item ' + item)}
                arrow={boolean('arrow', false)}
              >
                {item}
              </List.Item>
              ))}
          </LongList>
        );
      }
    }))
  .add('Accordion', () => <Accordion
    title={text('title', 'accordion title')}
    arrow={boolean('arrow', true)}
  >
    <List>
      <List.Item>1</List.Item>
      <List.Item>2</List.Item>
    </List>
  </Accordion>)
  .add('Menu', () => React.createElement(class extends React.Component {
    public state = {
      onIndex: 0,
      icon: boolean('icon', false),
    };
    public render () {
      const items = [
        {to: '', label: 'menu1'},
        {to: '', label: 'menu2'},
        {to: '', label: 'menu3'},
      ];
      if (this.state.icon) {
        for (let i = 0; i < items.length; i ++) {
          const item = items[i];
          item['icon'] = 'fas fa-star';
          item['selectedColor'] = 'red';
          item['defaultColor'] = 'black';
        }
      }
      return <Router history={createBrowserHistory()}>
          <RouteMenu
            items={items}
            onIndex={this.state.onIndex}
            onClick={(_, i) => this.setState({onIndex: i})}
          ></RouteMenu>
      </Router>;
    }
  }))
  .add('Mark', () => <Mark length={number('length', 5)}
      mark={boolean('disabled', false) ? 4 : undefined}
      onClick={action('onClick')} />,
  )
  .add('Slider', () =>
    <Slider>
      {[1, 2, 3, 4, 5, 6, 7].map((i) =>
        <Slider.Item key={i}>
          <Card style={{
            width: '70px',
            height: '70px',
            border: '1px solid grey',
            padding: '1px',
            marginTop: '0',
          }}>
            <Center>
              card {i}
            </Center>
          </Card>
        </Slider.Item>,
      )}
    </Slider>,
  )
  .add('tab', () => {
    const tabContent = [1, 2, 3, 4, 5].map((tab) => {
      return {
        name: 'tab' + tab,
        children: <List noBorder>
          {[1, 2, 3, 4].map((item) =>
            <List.Item key={item}>tab {tab} list-item {item}</List.Item>,
          )}
        </List>,
      };
    });
    return <Tab
      tabs={tabContent}
      onClickTab={action('onClickTab')}
    />;
  })
  .add('popup menu', () => React.createElement(class extends React.Component<{}, {showPopup:boolean}> {
    public state = {
      showPopup: true,
    };
    public render () {
      return <div>
        <div className="button"
          onClick={() => this.setState((prevState) => ({showPopup: !prevState.showPopup}))}>
          show popup
        </div>
        {this.state.showPopup && <PopupMenu
          list={[
            { title: 'one', onClick: action('clickOne')},
            { title: 'two', onClick: action('clickTwo')},
          ]}
          onClose={() => this.setState({showPopup: false})}
        />}
    </div>;
    }
  }))
  .add('animation', () => <Animate
    name={select(
      'name',
      {
        slideInUp: 'slideInUp',
        slideOutUp: 'slideOutUp',
        slideInDown: 'slideInDown',
        slideOutDown: 'slideOutDown',
        slideInRight: 'slideInRight',
        slideOutRight: 'slideOutRight',
        slideInLeft: 'slideInLeft',
        slideOutLeft: 'slideOutLeft',
      },
      'slideInUp')}
    speed={select(
      'speed',
      {
        slow: 'slow',
        slower: 'slower',
        fast: 'fast',
        faster: 'faster',
      },
      undefined)}
    infinite={boolean('infinite', false)}
    ><div>example animation</div></Animate>)
  .add('carousel', () => <Carousel
    windowResizeEvent={core.windowResizeEvent}
    slides={[
      <div> sample slide 1 </div>,
      <div> sample slide 2 </div>,
      <div> sample slide 3 </div>,
    ]}
    getIndex={action('getIndex')}
    indicator={boolean('indicator', true)}
    startIndex={number('startIndex', 0)}
  />)
  .add('Loading', () =>
    <Loading>
      <div style={{
        width: '200px',
        height: '200px',
        border: '1px solid black',
        lineHeight: '200px',
        textAlign: 'center',
      }}>
        <p> 加载中请稍后</p>
      </div>
    </Loading>,
  );

storiesOf('Common Components/Notice Bar', module)
  .add('short message', () => <NoticeBar
    icon={text('icon', 'fas fa-bullhorn')}
    closable={boolean('closable', true)}
    onClick={action('onClick')}
    customizeLink={(() => {
      if (boolean('customizeLink', false)) {
        return <div>go</div>;
      }
      return undefined;
    })()}
    >example notice message
  </NoticeBar>)
  .add('long message', () => <NoticeBar
    icon={text('icon', 'fas fa-bullhorn')}
    closable={boolean('closable', true)}
    onClick={action('onClick')}
  >
    example super super super super super super super super super super super super super super super super super super long notice message
  </NoticeBar>)
;

storiesOf('Common Components/Dropdown', module)
  .add('Dropwdown', () => <Dropdown
    list={[{text: '1', value: 1}, {text: '2', value: 2}]}
    onIndex={0}
    onClick={action('onClick')}
    />)
  .add('Dropdown(with title)', () => {
    return <Dropdown
      list={[{text: '1', value: 1}, {text: '2', value: 2}]}
      title={text('title', 'dropdown menu')}
      onClick={action('onClick')}
    />;
  })
;

storiesOf('Common Components/Navigation Bar', module)
  .add('simple', () => <NavBar goBack={action('goBack')} >
    {text('title', 'example title')}
  </NavBar>)
  .add('buttons', () => <NavBar goBack={action('goBack')}>
    <div className="button">阅读模式</div>
    <div className="button">论坛模式</div>
  </NavBar>)
  .add('with menu', () => React.createElement(class extends React.Component {
    public state = {
      showPopup: false,
    };
    public render () {
      return <NavBar goBack={action('goBack')}
      onMenuClick={() => this.setState({showPopup: true})}>
      {text('title', 'example title')}
      {this.state.showPopup &&
        <PopupMenu
          list={[
            {title: 'menu1', onClick: action('click menu1')},
            {title: 'menu2', onClick: action('click menu2')},
          ]}
          onClose={() => this.setState({showPopup: false})}
        />
      }
    </NavBar>;
    }
  }))
;

storiesOf('Common Components/Float Button', module)
  .add('plus', () => <FloatButton.Plus
    onClick={action('onClick')}
  />)
  .add('page', () => <div style={{ height: '1000px', position: 'relative', overflowY: 'auto' }}><FloatButton.Page
    currentPage={number('currentPage', 1)}
    totalPage={number('totalPage', 3)}
    onClick={action('onClick')}
  /></div>)
  .add('customize', () => <FloatButton>
    <div className="button">customize</div>
  </FloatButton>)
;
storiesOf('Home Components/HomePage', module)
  .add('SearchHomepageBar', () => React.createElement(class extends React.Component {
    public render () {
      return <div style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'rgba(244,245,249,1)',
      }}>
          <SearchHomepageBar hasInfo={true}
            onSearch={() => console.log('click search')} onInfo={() => console.log('click info')}>
          </SearchHomepageBar>
      </div>;
    }
  }))
  .add('ChannelPreview', () => React.createElement(class extends React.Component {
    public render () {
      const items = [
        {id:1, channel_id:1, title:'春潮', brief:'我要吞下蛮荒的野兽本性我要吞下蛮荒的野兽本性我要吞下蛮荒的野兽本性我要吞下蛮荒的野兽本性我要吞下蛮荒的野兽本性我要吞下蛮荒的野兽本性我要吞下蛮荒的野兽本性我要吞下蛮荒的野兽本性我要吞下蛮荒的野兽本性', author:'小山鬼'},
        {id:2, channel_id:1, title:'stay gold', brief:'娱乐圈万人迷娱乐圈万人迷娱乐圈万人迷娱乐圈万人迷娱乐圈万人迷娱乐圈万人迷娱乐圈万人迷娱乐圈万人迷娱乐圈万人迷娱乐圈万人迷娱乐圈万人迷娱乐圈万人迷娱乐圈万人迷娱乐圈万人迷', author:'草率'},
        {id:3, channel_id:1, title:'英国病人', brief:'我要吞下蛮荒的野兽本性我要吞下蛮荒的野兽本性我要吞下蛮荒的野兽本性我要吞下蛮荒的野兽本性我要吞下蛮荒的野兽本性我要吞下蛮荒的野兽本性我要吞下蛮荒的野兽本性我要吞下蛮荒的野兽本性我要吞下蛮荒的野兽本性', author:'小山鬼'},
    ];
      return <Router history={createBrowserHistory()}>
          <ChannelPreview
          channel={{id:1, name: '推荐榜单'}}
          threads={items}>
        </ChannelPreview>
        </Router>;
    }
  }))
  .add('buttons', () => <NavBar goBack={action('goBack')}>
    <div className="button is-danger"><i className="fas fa-fire"></i>推荐</div>
    <div className="button is-danger"><i className="fas fa-book-open"></i>文库</div>
  </NavBar>)
  .add('FooterMenu', () => React.createElement(class extends React.Component {
    public state = {
      onIndex: 0,
      icon: boolean('icon', false),
    };
    public render () {
      const items = [
        {to: '', label: '首页', icon: 'fas fa-home', defaultColor:'black', selectedColor:'red'},
        {to: '', label: '论坛', icon: 'fas fa-comments', defaultColor:'black', selectedColor:'red'},
        {to: '', label: '动态', icon: 'far fa-compass', defaultColor:'black', selectedColor:'red'},
        {to: '', label: '收藏', icon: 'far fa-star', defaultColor:'black', selectedColor:'red'},
        {to: '', label: '我的', icon: 'far fa-user', defaultColor:'black', selectedColor:'red'},
      ];
      return <Router history={createBrowserHistory()}>
      <div style={{
          position: 'absolute',
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column'}}>
          <FooterMenu
            items={items}
            onIndex={this.state.onIndex}
            onClick={(_, i) => this.setState({onIndex: i})}
          ></FooterMenu>
          </div>
      </Router>;
    }
  }))
  .add('tagbasicMidium', () => <Tag
    selected={false}
    size={'medium'}
    color={'light'}
    selectedColor={'danger'}
    style={{textDecoration:'none'}}
    selectable={true}>button
    </Tag>)
  .add('tagbasicSmall', () => <Tag
    selected={false}
    size={'normal'}
    color={'white'}
    selectedColor={'danger'}
    style={{textDecoration:'none'}}
    selectable={true}>button
  </Tag>)
  .add('TagBasicList1', () => React.createElement(class extends React.Component {
    public render () {
      return <div style={{
        width: '100%',
        margin: '0',
        padding: '0',
        backgroundColor:'rgba(244,245,249,1)'}}>
        <TagBasicList
          tagCategoryName={'最近搜索'}
          childTags={[
            {tagId: '12', tagName: '星星', selected: false, selectable: true},
            {tagId: '13' , tagName: '星星月亮', selected: false, selectable: true},
          ]}
          tagSize={'normal'}
          tagColor={'white'}
          selectedColor={'danger'}
          showTrashbin={true}
          sortAvailable={true}
          backgroundColor={'rgba(244,245,249,1)'}
          style={{textDecoration:'none'}}
          onClick={(selected, selectedId) => action('onClick')}>
        </TagBasicList>
      </div>;
    }
  }))
  .add('TagBasicList2', () => React.createElement(class extends React.Component {
    public render () {
      return <div style={{
        width: '100%',
        margin: '0',
        padding: '0',
        backgroundColor:'rgba(244,245,249,1)'}}>
        <TagBasicList
          tagCategoryName={'热门推荐'}
          childTags={[
            {tagId: '12', tagName: '得偿所愿', selected: true, selectable: true},
            {tagId: '13' , tagName: '翅膀养护日记', selected: true, selectable: true},
          ]}
          tagSize={'normal'}
          tagColor={'white'}
          selectedColor={'danger'}
          showTrashbin={false}
          backgroundColor={'rgba(244,245,249,1)'}
          onClick={(selected, selectedId) => action('onClick')}>
        </TagBasicList>
      </div>;
    }
  }))
  .add('TagBasicList3', () => React.createElement(class extends React.Component {
    public render () {
      return <div style={{
        width: '100%',
        margin: '0',
        padding: '0',
        backgroundColor:'white'}}>
        <TagBasicList
          tagCategoryName={'文章分类'}
          childTags={[
            {tagId: '12', tagName: '原创', selected: true, selectable: true},
            {tagId: '13' , tagName: '同人', selected: true, selectable: true},
          ]}
          tagSize={'medium'}
          tagColor={'light'}
          selectedColor={'danger'}
          showTrashbin={false}
          backgroundColor={'white'}
          onClick={(selected, selectedId) => action('onClick')}>
        </TagBasicList>
      </div>;
    }
  }))
  .add('tagBasicListSelect', () => React.createElement(class extends React.Component {
    public state = {
        counter: 0,
        selectedTags: [],
    };
    public render () {
        return <TagBasicListSelect
        taglist={[
        {tagCatagoryName:'文章分类',
          childTags:[
            {tagId:'12', tagName:'原创', selected: true, selectable: true},
            {tagId:'13' , tagName:'同人', selected: true, selectable: true},
            ]},
        {tagCatagoryName:'篇幅',
          childTags:[
            {tagId:'14', tagName:'短篇', selected: true, selectable: true},
            {tagId:'15' , tagName:'中篇', selected: true, selectable: true},
            {tagId:'16', tagName:'长篇', selected: true, selectable: true},
            {tagId:'17', tagName:'大纲', selected: true, selectable: true}
          ]},
        ]}
        onBack={() => action('onBack')}
        onFilter={() => action('onFilter')}
        selectedCounter={this.state.counter}
        onSelect={(tags) => {
          const selectedTags = [...tags];
          this.setState({selectedTags});
          this.setState({counter:selectedTags.length});
          action('onSelect');
        }}
        >
        </TagBasicListSelect>;
    }
  }))
  .add('tagBasicListFilter', () => React.createElement(class extends React.Component {
    public state = {
        recentSearchTags: [],
    };
    public render () {
        return <TagBasicListFilter
        taglist={[
          {tagCategoryName:'最近搜索',
          showTrashbin:true,
          childTags:[
            {tagId:'12', tagName:'夏天', selected: false, selectable: true},
            {tagId:'13' , tagName:'星赭', selected: true, selectable: true},
          ]},
          {tagCategoryName:'热门推荐',
          showTrashbin:false,
          childTags:[
            {tagId:'14', tagName:'九州见闻', selected: true, selectable: true},
            {tagId:'15' , tagName:'得偿所愿', selected: true, selectable: true},
            {tagId:'16', tagName:'翅膀养护日记', selected: false, selectable: true},
            {tagId:'17', tagName:'不知道写啥', selected: true, selectable: true},
          ]},
          ]}
        onBack={() => action('onBack')}
        // 1,从最近搜索标签组中删除
        onDelete={(tags) => {
          action('onDelete');
          const recentSearchTags = [...tags];
          this.setState({recentSearchTags});
        }}
        onFilter={ (filCriteria) => action('onFilter')}
        >
        </TagBasicListFilter>;
    }
  }))
  .add('RecommendList', () => React.createElement(class extends React.Component {
    public render () {
      const items = [
        {id:1, channel_id:1, title:'夜深知雪重量', brief:'推荐语：小精灵要下山，老妖怪有交代：这世间乱得很，牵着九哥的手别放开；小精灵要下山，老妖怪有交代：这世间乱得很，牵着九哥的手别放开小精灵要下山，老妖怪有交代：这世间乱得很，牵着九哥的手别放开小精灵要下山，老妖怪有交代：这世间乱得很，牵着九哥的手别放开', author:'尸尸'},
        {id:2, channel_id:1, title:'贼雀', brief:'一二三四五六七，我们都死得很离奇；七六五四三二一，找到答案前谁都出不去', author:'叽里呱啦'},
        {id:3, channel_id:1, title:'她捡到1个放大镜', brief:'夏天夏天悄悄过去充满小秘密，放大镜的乐趣我只想告诉你', author:'越荷兮'},
    ];
      return <Router history={createBrowserHistory()}>
          <RecommendList
          taglist={[
            {tagCatagoryName:'文章分类',
              childTags:[
                {tagId:'12', tagName:'原创', selected: true, selectable: true},
                {tagId:'13' , tagName:'同人', selected: true, selectable: true},
            ]},
            {tagCatagoryName:'篇幅',
              childTags:[
              {tagId:'14', tagName:'长篇', selected: true, selectable: true},
              {tagId:'15' , tagName:'中篇', selected: true, selectable: true},
              {tagId:'16', tagName:'短篇', selected: true, selectable: true},
              {tagId:'17', tagName:'大纲', selected: true, selectable: true}
            ]},
            ]}
          threads={items}
          onBack={() => {}}
          onSearch={() => {}}
          onShowTags={() => {}}>
        </RecommendList>
        </Router>;
    }
  }))
;
storiesOf('Home Components', module)
;

storiesOf('User Components', module)
;

storiesOf('Thread Components', module)
  .add('list preview', () => <Card>
    <ThreadPreview
      mini={boolean('mini', false)}
      data={{
        type: 'thread',
        id: 1,
        attributes: {
          title: randomCnWords(number('title', 20), 0.15),
          brief: randomCnWords(number('brief', 40), 0.2),
          view_count: number('view', 200),
          reply_count: number('reply', 40),
          channel_id: 1,
        },
        last_post: {
          type: 'post',
          id: 1,
          attributes: {
            title: randomCnWords(number('post title', 40), 0.2),
            body: '',
          },
        },
        author: {
          id: 1,
          attributes: {
            name: randomCnWords(number('author name', 3), 0),
          },
          type: 'user',
        },
        tags: [
          {
            type: 'tag',
            id: 1,
            attributes: {
              tag_name: '日常闲聊',
              tag_type: '',
            },
          },
        ],
      }}
      onTagClick={action('toChannelTag')}
      onClick={action('onClick')}
      onUserClick={action('onUserClick')}
    />
  </Card>)
;

storiesOf('Message Components', module)
;

storiesOf('Status Components', module)
;

storiesOf('Collection Components', module)
;