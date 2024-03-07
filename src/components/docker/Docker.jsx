// import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Docker.scss"

function Docker() {
  return (
    <div className="docker">
      <NavLink exact="true" to="/discover" className="docker__item">
        <img className="iconfont" src="/src/assets/fonts/网易云音乐.png" />
        发现
      </NavLink>
      <NavLink exact="true" to="/podcast" className="docker__item">
      <img className="iconfont" src="/src/assets/fonts/播客.png" />
        播客
      </NavLink>
      <NavLink exact="true" to="/my" className="docker__item">
      <img className="iconfont" src="/src/assets/fonts/音符.png" />
        我的
      </NavLink>
      <NavLink exact="true" to="/follow" className="docker__item">
      <img className="iconfont" src="/src/assets/fonts/我的关注.png" />
        关注
      </NavLink>
      <NavLink exact="true" to="/community" className="docker__item">
      <img className="iconfont" src="/src/assets/fonts/社区.png" />
        社区
      </NavLink>
    </div>
  );
}

export default Docker;