import SongList from "../songList/SongList"
import { useNavigate } from 'react-router-dom';
import { useVideoStore } from '/src/store/video.js'
import { useEffect } from "react";
import "./MusicList.scss"

export default function MusicList({songs, title, pic, trackCount}) {
  const navigate = useNavigate();
  const handleGoBack = () => {
    // 回退到上一个路由
    navigate(-1);
  };

  useEffect(() => {
    window.addEventListener('scroll', function() {
      var header = document.querySelector('.header');
      var scrollPosition = window.scrollY;
    
      if (header) {
        if (scrollPosition > 210) {
          header.style.backgroundColor = 'rgba(225, 90, 90, 0.9)'; // 当滚动位置大于0时，改变背景颜色为色
          header.style.borderRadius = '0 0 5px 5px'
        } else {
          header.style.backgroundColor = 'transparent'; // 否则背景透明
        }
      }
    });
  })
  

  const {selectPlay,randomPlay, playlist} = useVideoStore()
  function selectItem (index) {
    selectPlay(songs, index)
  }
  function random () {
    randomPlay(songs)
    console.log('success : ', playlist)
  }

  return (
    <div className="musiclist">
      <div className="background">
        <img src={pic} />
      </div>
      <div className="header">
        <div className="back" onClick={handleGoBack}>
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
          <div className="playall" onClick={random}>
            <img className="playicon" src="/src/components/musicList/开始.png"/>
            <div className="title">随机播放({trackCount})</div>
          </div>
          <img className="list" src="/src/assets/fonts/菜单.png" />
        </div>
        <SongList 
          songs = {songs}
          select = {selectItem}
        />
      </div>
      
    </div>
  )
}
