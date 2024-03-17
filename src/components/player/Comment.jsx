import { useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from "react-query";
import { getComment } from "../../api/getSong";
import './Comment.scss'

export default function Comment() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentSong = location.state.currentSong;

  const { data, isLoading, error } = useQuery('comment', () => getComment(currentSong.id));
  
  useEffect(() => {
    const handleScroll = () => {
      var commentsTop = document.querySelector('.comments__top');
      var scrollPosition = commentsElement.scrollTop;
      if (commentsTop) {
        if (scrollPosition > 74) {
          commentsTop.style.position = 'fixed';
          commentsTop.style.top = '48px';
          commentsTop.style.zIndex = '500';
        } else {
          commentsTop.style.position = 'static';
        }
      }
    };
  
    const commentsElement = document.querySelector('.comment');
    if (commentsElement) {
      commentsElement.addEventListener('scroll', handleScroll);
    }
  
    return () => {
      if (commentsElement) {
        commentsElement.removeEventListener('scroll', handleScroll);
      }
    };
  });

  if (isLoading || !data) return (
    <div style={{height: '100%', padding:'40px 18px'}}>
    <div style={{display: 'inline-block', width: '100px', height: '100px', left:'0', marginTop: '26px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
    <div style={{display: 'inline-block'}}>
      <div style={{width: '140px', height: '12px', marginLeft:'18px', marginBottom:'25px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
      <div style={{width: '200px', height: '12px', marginLeft:'18px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
    </div>
    <div style={{width: '80%', height: '12px', left:'5px', marginTop: '110px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
    <div style={{width: '50%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
    <div style={{width: '80%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
    <div style={{width: '50%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
    <div style={{width: '80%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
    <div style={{width: '50%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
    <div style={{width: '80%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
  </div>
  )
  
  if (error) return <div>Error: {error.message}</div>;

  const commentslist = data?.hotComments?.map((i, index) => (
    <li key={index} >
      
      <div className="commentslist__item">
        <div className="left">
          <img className="avatar" src={i.user.avatarUrl} />
        </div>
        <div className="right">
          <div className="top">       
            <div className="name">
              {i.user.nickname}
            </div>
            <div className="vip">
              { i.user.vipRights && i.user.vipRights.associator && <img className="vipIcon" src={i.user.vipRights.associator.iconUrl} /> }
            </div>
            {i.likedCount}
            <div className="like">
              <img className="likeIcon" src="/src/components/player/不喜欢.png" />
            </div>
          </div>
          <div className="content">
            {i.content}
          </div>
        </div>     
      </div>
    </li>
  ))

  const handleGoBack = () => {
    // 回退到上一个路由
    navigate(-1);
  };

  return (
    <div className="comment">
      <div className="header">
        <div className="back" onClick={handleGoBack}>
          {'<'} 
        </div>
        <h1 className="title">评论(20)</h1>
        <img className="share" src="/src/components/player/分享.png"></img>
      </div>
      <div
        className='middle'
      >
        <div className="cd-wrapper">
            <img
              width="40"
              height="40"
              src={currentSong.al.picUrl}             
              />
        </div>
        <div className="slider-wrapper">
          <h2 className="name">{currentSong.name}</h2>
          <h2 className="desc">- {currentSong?.ar?.[0]?.name}</h2>
        </div>
      </div>
      <div className="comments">
        <div className="comments__top">
          <div>评论区</div>
          <div className="text">推荐</div>
          <div className="text1">最热</div>
          <div className="text1">最新</div>
        </div>
        <ul className="commentslist">
          {commentslist}  
        </ul>                                                             
      </div>
    </div>
  )
}
