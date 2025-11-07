import React from 'react';
import whoWeAre from '../../img/home-page/who-we-are.svg';
import whatWeDo from '../../img/home-page/what-we-do.svg';

const OurModelSection = ({ homeContent }) => {
  return (
    <div style={{ paddingTop: "24px" }}>
      <div className='our-model-section'>
        <div className='section-heading blue-text text-center'>{homeContent?.ourModel?.title}</div>
        <div className='animated-text model-sub-section-division'>
          <div className='model-sub-section text-justify'>
            <div><img src={homeContent?.ourModel?.description[0]?.icon?.childImageSharp ? (homeContent?.ourModel?.description[0]?.icon?.childImageSharp?.fluid?.src) : homeContent?.ourModel?.description[0]?.icon} alt="Sticky Icon" className='model-icon' /></div>
            <div>
              <div className='section-sub-heading brown-text'>{homeContent?.ourModel?.description[0]?.subTitle}</div>
              <div className='section-description black-text-2'>{homeContent?.ourModel?.description[0]?.text}</div>
            </div>
          </div>
          <div className='model-sub-section text-justify'>
            <div><img src={homeContent?.ourModel?.description[1]?.icon?.childImageSharp ? (homeContent?.ourModel?.description[1]?.icon?.childImageSharp?.fluid?.src) : homeContent?.ourModel?.description[1]?.icon} alt="Sticky Icon" className='model-icon' /></div>
            <div>
              <div className='section-sub-heading brown-text'>{homeContent?.ourModel?.description[1]?.subTitle}</div>
              <div className='section-description black-text-2'>{homeContent?.ourModel?.description[1]?.text}</div>
            </div>
          </div>
        </div>
        {homeContent?.ourModel?.ourModelVideoLink && 
         <div className={'model-video'}>
          <div className="model-border">
            <iframe
              className={'our-model-video'}
              src={homeContent?.ourModel?.ourModelVideoLink}
              frameBorder="0"
              referrerpolicy="strict-origin-when-cross-origin"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
          </div>
        </div>
        }
               
      </div>
    </div>
  );
}

export default OurModelSection


