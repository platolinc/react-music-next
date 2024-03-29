import SongList from "../songList/SongList"
import { useNavigate } from 'react-router-dom';
import { useVideoStore } from '@/store/video.js'
import { useEffect } from "react";
import "./MusicList.scss"

import sp from "@/assets/fonts/搜索.png"
import p1 from "@/components/musicList/转发.png"
import p2 from "@/components/musicList/评论.png"
import p3 from "@/components/musicList/收藏.png"
import p4 from "@/components/musicList/开始.png"
import p5 from "@/assets/fonts/菜单.png"

export default function MusicList({songs, title, pic, trackCount}) {
  const navigate = useNavigate();
  const handleGoBack = () => {
    // 回退到上一个路由
    navigate(-1);
  };

  useEffect(() => {
    window.addEventListener('scroll', function() {
      var header = document.querySelector('.header');
      var bottomflex = document.querySelector('.bottom__flex');
      var scrollPosition = window.scrollY;
    
      if (header && bottomflex) {
        if (scrollPosition > 205) {
          header.style.background = `url(${pic})`; // 当滚动位置大于0时，改变背景
          bottomflex.style.position = 'fixed'
          bottomflex.style.top = '49px'
          bottomflex.style.background = 'rgb(250, 250, 250)'          
        } else {
          header.style.background = 'transparent'; // 否则背景透明
          bottomflex.style.position = 'static'
          bottomflex.style.background = 'linear-gradient(to top, rgb(250, 250, 250), rgba(255, 255, 255, 0.8))'
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
        <img className="searchimg" src={sp}></img>
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
            <img className="icon" src={p1} />
            <p>3598</p>
          </div>
          <div className="border">
            <img className="icon" src={p2} />
            <p>398</p>
          </div>
          <div className="border">
            <img className="icon" src={p3} />
            <p>598</p>
          </div>
        </div>
      </div>
      
      <div className="bottom">
        <div className="bottom__flex">
          <div className="playall" onClick={random}>
            <img className="playicon" src={p4} />
            <div className="title">随机播放({trackCount})</div>
          </div>
          <img className="list" src={p5} />
        </div>
        <SongList 
          songs = {songs}
          select = {selectItem}
        />
      </div>
      
    </div>
  )
}
