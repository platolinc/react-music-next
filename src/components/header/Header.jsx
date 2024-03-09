import { useState, useEffect } from 'react';
import { getBanner } from "../../api/getDiscovery";
import "./Header.scss";
import { useQuery } from "react-query";

export default function Header() {
  const { data, isLoading, error } = useQuery('bannerData', getBanner);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prevIndex =>
        prevIndex === data.banners.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // 自动滑动每5秒钟一次

    return () => clearInterval(interval);
  }, [data?.banners?.length]);

  if (isLoading || !data) return (
    <div style={{padding:'40px 30px'}}>
      <div style={{width: '80%', height: '12px', left:'5px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
      <div style={{width: '50%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
      <div style={{width: '80%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
    </div>
  )

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="header">
      <div className="header-mask"></div>
      <div className="top">
        <div className="top__left">
          <img className="top__left__img" src="src/assets/fonts/菜单.png" alt="菜单" />
        </div>
        <div className="top__center">
          <img className="top__center__img" src="src/assets/fonts/搜索.png" alt="搜索" />
        </div>            
        <div className="top__right">
          <img className="top__right__img1" src="src/assets/fonts/免费.png" alt="免费" />
          <img className="top__right__img" src="src/assets/fonts/听歌识曲.png" alt="听歌识曲" />
        </div>
      </div>
      <div className="banner">
        <div className="banner__container" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
          {data.banners.map((banner, index) => (
            <div key={index} className="banner__slide">
              <img className="banner__img" src={banner.imageUrl} alt="Banner" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}