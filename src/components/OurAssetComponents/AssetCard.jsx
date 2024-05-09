import React, { useEffect, useState } from "react";
import ReadMoreIcon from '../../img/read_more_icon.svg';
import BottomReadMoreIcon from '../../img/card_arrow.svg';
import { set } from "react-ga";

function AssetCard({ data, style}) {
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(()=>{
    setIsFlipped(()=>false)
  },[])

  const handleMouseEnter = () => setIsFlipped(()=>true);
  const handleMouseLeave = () => setIsFlipped(()=>false);
 
  return (
    <div className='card-box' style={style}>
    <div onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave} className='card-item'>
            {isFlipped ?
             <div className="flipped-card">
             <img src={data?.icon?.childImageSharp ? (data?.icon?.childImageSharp?.fluid?.src) : data?.icon} className='flipped-card-image'/>
             <div className="card-description text-center blact-text-2">{data?.description}</div>
             <div className="read-button" onClick={()=>{
                window.location.href=data?.buttonLink
             }}>{data?.buttonText}<img className="read-button-arrow" src={ReadMoreIcon}/></div>
             </div> : 
             <div className="card-content" ><img src={data?.icon?.childImageSharp ? (data?.icon?.childImageSharp?.fluid?.src) : data?.icon} className='card-image'/></div>
             }
             {!isFlipped && <div className="mobile-icon"><img src={BottomReadMoreIcon}/></div>}
            </div>
            </div>
  );
}

export default AssetCard;
