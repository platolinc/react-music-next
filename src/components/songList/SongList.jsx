import './SongList.scss'
export default function SongList({songs = [], select}) {


  const songslist = songs.map((i, index) => (
    <li key={index} onClick={ () => select(index)} >
      <div className="songlist__content">
        <h2 className="name">{i.name}</h2>
        <p className="desc"> {i.ar[0].name} - {i.al.name}</p>
      </div>
    </li>
  ))
  
  return (
    <ol className="songlist">
      {songslist}
    </ol>
  )
}
