import React from 'react';
import approachVideo from '../../../img/approach_view.mp4';
import whoWeAre from '../../../img/home-page/who-we-are.png';
import whatWeDo from '../../../img/home-page/what-we-do.png';
import colorWheel from '../../../img/home-page/color-wheel.png';
import colorWheel1 from '../../../img/home-page/color-wheel1.png';
import colorWheel2 from '../../../img/home-page/color-wheel2.png';
import SectionDivider from '../SectionDivider';

export class OurModelSection extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { homeContent, isMobile } = this.props;
    console.log("jkjkjkjkjkjk",homeContent, isMobile)
    return (
      <div className={'home-second-section-wrapper'}>
        <div style={{backgroundColor:"#F2E5CA", padding:"42px 55px 66px 55px",margin:"46px 0 105px 0"}}>
          <div className='section-heading'>{homeContent?.ourModel?.title}</div>
          <div style={{display:"flex",flexDirection:isMobile ? "column" : "row", gap:"77px", padding:"48px 0"}}>
            <div style={{display:"flex", gap:"32px", flex:"1"}}>
              <div><img style={{background:"#ffffff", borderRadius:"4px", padding:"8px"}} src={whoWeAre} alt="Sticky Icon" /></div>
              <div style={{textAlign:"start"}}>
                <div className='our-model-sub-heading'>{homeContent?.ourModel?.description[0]?.subTitle}</div>
                <div className='our-model-description'>{homeContent?.ourModel?.description[0]?.text}</div>
              </div>
            </div>
            <div style={{display:"flex", gap:"32px",flex:"1"}}>
            <div><img style={{background:"#ffffff", borderRadius:"4px", padding:"8px"}} src={whatWeDo} alt="Sticky Icon" /></div>
              <div style={{textAlign:"start"}}>
                <div className='our-model-sub-heading'>{homeContent?.ourModel?.description[1]?.subTitle}</div>
                <div className='our-model-description'>{homeContent?.ourModel?.description[1]?.text}</div>
              </div>
            </div>
          </div>
          <div className={'image-section'} style={{paddingTop:"24px"}}>
            <div className="image-background-section" style={{ border: !isMobile ? "solid #ffffff 4px" : "none", borderRadius:"24px"}}>
            <iframe
              className={'home-second-section-iframe'}
              src={homeContent?.ourModel?.ourModelVideoLink}
              style={{borderRadius:"24px", padding:"16px", minWidth: "300px",minHeight:"180px", height:"54vw",width:"100%"}}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
           </div>
          </div>
        </div>
        <SectionDivider />
        <div style={{position:"relative"}}><div style={{marginTop:"32px", padding:"64px 0"}}>
          <div className='section-heading'>{homeContent?.ourApproach?.title}</div>
          <div className='section-description' style={{ padding:isMobile? "16px 24px 48px 24px":"16px 124px 48px 124px"}}>{homeContent?.ourApproach?.description}</div>
          <div style={{ display:"flex", alignItems:"center",justifyContent:"center",width:"100%"}}>
            <div style={{width:"54vw",height:"45vw"}}>
                <video
                  autoPlay 
                  muted 
                  style={{
                    width: '100%',
                    backgrounColor: 'white',
                    height: '100%',
                  }}
                  >
                  <source src={homeContent?.ourApproach?.approachVideo?.publicURL ? (homeContent?.ourApproach?.approachVideo?.publicURL) : homeContent?.ourApproach?.approachVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
      
          </div>
          </div>
        </div>
        {!isMobile && <><div style={{position:"absolute", top:"0",right:"0"}}><img src={colorWheel} alt='color-wheel'/></div>
        <div style={{position:"absolute", bottom:"0",left:"0"}}><img src={colorWheel1} alt='color-wheel'/></div>
        <div style={{position:"absolute", bottom:"20px",right:"0"}}><img src={colorWheel2} alt='color-wheel'/></div></>}
        </div>
        
      </div>
    );
  }
}
