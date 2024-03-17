// import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Docker.scss";
import dp from '@/components/docker/网易云音乐.png';
import pp from '@/components/docker/播客.png';
import mp from '@/components/docker/音符.png';
import fp from '@/components/docker/我的关注.png';
import cp from '@/components/docker/社区.png';

function Docker() {
  return (
    <div className="docker">
      <NavLink exact="true" to="/discover" className="docker__item">
        <img src={dp} className="iconfont"  />
        发现
      </NavLink>
      <NavLink exact="true" to="/podcast" className="docker__item">
      <img className="iconfont" src={pp} />
        播客
      </NavLink>
      <NavLink exact="true" to="/my" className="docker__item">
      <img className="iconfont" src={mp} />
        我的
      </NavLink>
      <NavLink exact="true" to="/follow" className="docker__item">
      <img className="iconfont" src={fp} />
        关注
      </NavLink>
      <NavLink exact="true" to="/community" className="docker__item">
      <img className="iconfont" src={cp} />
        社区
      </NavLink>
    </div>
  );
}

export default Docker;