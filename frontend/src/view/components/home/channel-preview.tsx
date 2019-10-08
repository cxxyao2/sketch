import { Link } from 'react-router-dom';
import * as React from 'react';
import './channel-preview.scss';

interface Props {
  channel:{id:number, name:string};
  threads:{id:number, channel_id:number, title:string, brief:string, author:string }[];
}
interface State {
}

export class ChannelPreview extends React.Component<Props, State> {
  public render() {
    return <div className={'channelpreview'}>
      <div className="channel" >
      <div className="channelname">
        <Link key={this.props.channel.id}
                to={`/threads/?channels=[${this.props.channel.id}]`}>
              {this.props.channel.name}
        </Link>
      </div>

      {this.props.threads.map((thread, id) => {
        const borderBottomConst= id < (this.props.threads.length - 1 ) ? '4px solid rgba(244,245,249,1)' : '';
        return <div style={{
          borderBottom: borderBottomConst }} className="thread">
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
        <div className = "threadbrief" >{thread.brief}</div>
      </div> ;
      })}
      </div>
    </div>;
  }
}