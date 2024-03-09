import { getIcon } from "../../api/getDiscovery";
import { useQuery } from "react-query";
import "./Middle.scss"

export default function Middle() {
  const { data, isLoading, error } = useQuery('iconData', getIcon);
  
  if (isLoading || !data) return (
    <div style={{marginLeft: '30px', width: '50%', height: '12px', left:'5px', marginTop: '40px', background: 'rgb(203 203 203)', borderRadius: '8px'}}></div>
  )
  if (error) return <div>Error: {error.message}</div>;

  const icons = data?.data?.blocks?.find(i => i.showType == "DRAGON_BALL").creatives[0].resources.slice(1, 10)
  return (
    <div className="middle">
      {icons.map(
        (i, index) => (
          <div className="middle__content" key={index}>
            <img className="middle__content__img" src={i.uiElement.image.imageUrl2} />
            <p className="middle__content__title">{i.uiElement.mainTitle.title}</p>
          </div>
        )
      )}
    </div>
  )
}