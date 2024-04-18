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
    const { homeContent } = this.props;
    return (
      <div className={'home-second-section-wrapper'}>
        <div style={{backgroundColor:"#F2E5CA", padding:"42px 55px 66px 55px",margin:"46px 0 105px 0"}}>
          <div className='section-heading'>Our Model</div>
          <div style={{display:"flex", gap:"77px", padding:"48px 0"}}>
            <div style={{display:"flex", gap:"32px", flex:"1"}}>
              <div><img style={{background:"#ffffff", borderRadius:"4px", padding:"8px"}} src={whoWeAre} alt="Sticky Icon" /></div>
              <div style={{textAlign:"start"}}>
                <div className='our-model-sub-heading'>Who We Are</div>
                <div className='our-model-description'>We are a mission-driven governance consulting firm. We firmly believe in governance being the primary lever of change to create large scale impact in the country.</div>
              </div>
            </div>
            <div style={{display:"flex", gap:"32px",flex:"1"}}>
            <div><img style={{background:"#ffffff", borderRadius:"4px", padding:"8px"}} src={whatWeDo} alt="Sticky Icon" /></div>
              <div style={{textAlign:"start"}}>
                <div className='our-model-sub-heading'>What We Do</div>
                <div className='our-model-description'>We work with the senior political and bureaucratic leadership of states to solve governance problems at scale. We co-work with the government to diagnose the problem, design a transformation roadmap and implement the same. Our solutions are rooted in the realities of governance in India. We leverage tech & data to enable systemic transformations.</div>
              </div>
            </div>
          </div>
          <div className={'image-section'} style={{paddingTop:"24px"}}>
            <div className="image-background-section" style={{border:"solid #ffffff 4px", borderRadius:"24px"}}>
            <iframe
              className={'home-second-section-iframe'}
              src="https://www.youtube.com/embed/Y-iHVVfSHRg"
              style={{borderRadius:"24px", padding:"16px", minWidth: "300px",minHeight:"180px", height:"54vw",width:"100%"}}
              frameBorder="0"
              allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
           </div>
          </div>
        </div>
        <SectionDivider />
        <div style={{position:"relative"}}><div style={{marginTop:"64px", padding:"64px 0"}}>
          <div className='section-heading'>Our Approach</div>
          <div className='section-description' style={{ padding:"16px 124px 48px 124px", fontSize:"31.5px"}}>We combine a top-down management consulting approach for problem structuring with a bottom-up understanding of the governance ecosystem for designing solutions, while leveraging data and technology to enable implementation of our solutions, with the objective of making governments accountable and deliver with minimum delays and maximum efficiency.</div>
          <div style={{ display:"flex", alignItems:"center",justifyContent:"center",width:"100%"}}><div style={{width:"54vw",height:"45vw"}}>
           
                <video
                  autoPlay 
                  muted 
                  style={{
                    width: '100%',
                    backgrounColor: 'white',
                    height: '100%',
                  }}
                  >
                  <source src={approachVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
      
          </div>
          </div>
        </div>
        <div style={{position:"absolute", top:"0",right:"0"}}><img src={colorWheel} alt='color-wheel'/></div>
        <div style={{position:"absolute", bottom:"0",left:"0"}}><img src={colorWheel1} alt='color-wheel'/></div>
        <div style={{position:"absolute", bottom:"20px",right:"0"}}><img src={colorWheel2} alt='color-wheel'/></div>
        </div>
        
      </div>
    );
  }
}
