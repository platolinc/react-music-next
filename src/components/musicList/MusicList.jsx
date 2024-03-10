import SongList from "../songList/SongList"
import "./MusicList.scss"

export default function MusicList({songs, title, pic, trackCount}) {
  
  return (
    <div className="musiclist">
      <div className="background">
        <img src={pic} />
      </div>
      <div className="header">
        <div className="back">
          {'<'} 
        </div>
        <h1 className="title">歌单</h1>
        <img className="searchimg" src="/src/assets/fonts/搜索.png"></img>
      </div>
      <div className="middle">
        <div className="flex1">
          <img className="albumimg" src={pic} />
          <div className="describe">
            <p>{title}</p>
          </div>
        </div>
        <div className="flex2">
          <div className="border">
            <img className="icon" src="/src/components/musicList/转发.png" />
            <p>3598</p>
          </div>
          <div className="border">
            <img className="icon" src="/src/components/musicList/评论.png" />
            <p>398</p>
          </div>
          <div className="border">
            <img className="icon" src="/src/components/musicList/收藏.png" />
            <p>598</p>
          </div>
        </div>
      </div>
      
      <div className="bottom">
        <div className="bottom__flex">
          <img className="playall" src="/src/components/musicList/开始.png"/>
          <div className="title">随机播放({trackCount})</div>
          <img className="list" src="/src/assets/fonts/菜单.png" />
        </div>
        <SongList 
          songs={songs}
        />
      </div>
      
    </div>
  )
}
