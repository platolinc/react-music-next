import { useNavigate } from 'react-router';
import { getAlbum } from "../../api/getDiscovery";
import { getSongs } from "../../api/getDiscovery";
import { useQuery } from "react-query";
import "./Recommend.scss"

export default function Recommend() {
  const navigate = useNavigate()
  const handleAlbumClick = (album) => {
    // 获取点击的歌单项对应的 album 对象
    // 这里可以根据您的具体数据结构来获取相应的 album 对象
    // 假设 album 参数就是点击的歌单项对应的 album 对象

    // 跳转到相应的路由，并将 album 对象作为参数传递给目标组件
    navigate(`/discover/${album.id}`, { state: { album } });
  };

  const { data, isLoading, error } = useQuery('albumData', getAlbum);
  const result = useQuery('songData', getSongs);
  
  if (isLoading || !data) return (
    <div style={{height: '100%', padding:'40px 30px'}}>
      <div style={{width: '80%', height: '12px', left:'5px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
      <div style={{width: '50%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
      <div style={{width: '80%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
      <div style={{width: '50%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
      <div style={{width: '80%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
    </div>
  )
  if (error) return <div>Error: {error.message}</div>;

  const albums = data.result
  const songs = result?.data?.data?.slice(0,5)

  return (
    <div className="recommend">
      <p className="title">推荐歌单 {">"}</p>
      <div className="albums">
        {albums.map(
          (i, index) => (
              <div className="albums__content" key={index} onClick={() => handleAlbumClick(i)}>
                <img className="albums__content__img" src={i.picUrl} />
                <p className="albums__content__title">{i.name}</p>
              </div>
          )
        )}
      </div> 
      <div className="songs-wrapper">
        <div className="songs">
          一人一首华语经典 {">"}
          {songs?.map(
            (i, index) => (
              <div className="songs__content" key={index}>
                <img className="songs__content__img" src={i.album.blurPicUrl} />
                <div className="songs__content__text">
                  <div className="songs__content__text__title">{i.album.name}</div>
                  <div className="songs__content__text__artist">{i.album.artists[0].name}</div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
         
    </div>
  )
}