import React from 'react'
import {Link} from 'gatsby'

import logo from '../img/logo.svg'
import logoColored from "../img/logo-colored.png";
import facebookIconActive from "../img/footer-facebook-icon.svg";
import linkedInIconActive from "../img/footer-linkedin-icon.svg";
import youtubeIconActive from "../img/footer-youtube-icon.svg";
import instagramIconActive from "../img/footer-insta-icon.svg";

const Footer = class extends React.Component {
    render() {
        return (
            <FooterComponent/>
        )
    }
};

export const FooterComponent = ({}) => {
    const [fIcon, setFIcon] = React.useState(
        facebookIconActive
    );
    const [iIcon, setIIcon] = React.useState(
        instagramIconActive
    );
    const [lIcon, setLIcon] = React.useState(
        linkedInIconActive
    );
    const [yIcon, setYIcon] = React.useState(
        youtubeIconActive
    );

    return (
        <div className={'footer-wrapper'}>
            <div style={{padding:"0 8.5vw"}}>
                <nav className="nav-wrapper nav justify-content-between align-items-center">
                    <div style={{padding:"16px 0"}}>
                    <div>
                        <a className="nav-link navbar-brand" href="#" style={{paddingLeft:"0px",paddingRight:"0px"}}>
                        <img className={'logo'} src={logoColored} style={{width:"240px",height:"56.657px"}}/>
                    </a></div>
                    <div><a className="nav-link navbar-brand" href="#" style={{paddingLeft:"0px",paddingRight:"0px"}}>
                        <div className={'address-line1'}>
                            Samagra | Transforming Governance
                        </div>
                        <div className={'address-line1'}>
                            9/5 Sarvapriya Vihar, New Delhi 110016
                        </div>
                    </a>
                    </div>
                    </div>
                    <div className={'nav'} style={{display:"flex", gap:"28px", padding:"28px 0"}}>
                        <div style={{display:"flex",flexDirection:"column", gap:"4px"}}>
                            <div className='footer-heading'>About Us</div>
                            <div>
                            <Link to={'/team'}><span className='footer-item' >Team</span></Link>
                            </div>
                            <div>
                            <Link to={'/media'}><span className='footer-item'>News</span></Link>
                            </div>
                            <div>
                            <Link to={'/blog'}><span className='footer-item'>Blog</span></Link>
                            </div>
                            <div>
                            <Link to={'/careers'}><span className='footer-item'>Apply</span></Link>
                            </div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column", gap:"4px"}}>
                            <div className='footer-heading'>Our Assets</div>
                            <div>
                            <Link to={'/amritseries'}><span className='footer-item'>Amrit Series</span></Link>
                            </div>
                            {/* <div>
                            <Link to={'/'}><span className='footer-item'>Governance Decluttered</span></Link>
                            </div> */}
                            <div>
                            <Link to={'/governanceframeworks'}><span className='footer-item'>Governance Frameworks</span></Link>
                            </div>
                            <div>
                            <Link to={'/sushasan'}><span className='footer-item'>Sushasan</span></Link>
                            </div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column", gap:"8px"}}>
                            <div style={{display:"flex",flexDirection:"column", gap:"4px"}}>
                                <div className='footer-heading'>Ecosystem Initiatives</div>
                                <div>
                                    <Link to={'/c4gt'}><span className='footer-item'>Code for GovTech (C4GT)</span></Link>
                                </div>
                                <div>
                                    <Link to={'/tgc'}><span className='footer-item'>The Governance Challenge (TGC)</span></Link>
                                </div>
                            </div>
                            <div style={{display:"flex",flexDirection:"column", gap:"4px"}}>
                                <div className='footer-heading'>Follow Us</div>
                                <div style={{display:"flex",gap:"20px"}}>
                                    <div>
                                        <img className={'social-icons'} onClick={()=>{
                                            window.location.href="https://www.linkedin.com/company/samagra-transforming-governance/"}} src={linkedInIconActive}/>
                                    </div>
                                    <div>
                                        <img className={'social-icons'} onClick={()=>{window.location.href="https://www.instagram.com/samagragovernance/?hl=en"}} src={instagramIconActive}/>
                                    </div>
                                    {/* <div>
                                        <img className={'social-icons'} src={facebookIconActive}/>
                                    </div> */}
                                    <div>
                                        <img className={'social-icons'} onClick={()=>{window.location.href="https://www.youtube.com/channel/UCfkXErS-f87xUQkmSKSC8bg"}} src={youtubeIconActive}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
            <div className={'bottom-copyright'} style={{opacity: '50%'}}>
                © 2024 Samagra Development Associates Pvt. Ltd &nbsp;&nbsp; <a
                href="https://drive.google.com/file/d/1JBr51LlCtUv-q35Onh6dbgHBmI18qhEH/view?usp=sharing" target="_" style={{color: "#1E2833", textDecoration:"underline"}}>CSR</a>
            </div>
        </div>
    )
};

export default Footer
