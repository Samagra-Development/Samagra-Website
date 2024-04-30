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
                    <div>
                    <div>
                        <a className="nav-link navbar-brand" href="#" style={{paddingLeft:"0px",paddingRight:"0px"}}>
                        <img className={'logo'} src={logoColored}/>
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
                    <div className={'nav'} style={{display:"flex", gap:"32px", padding:"30px 0"}}>
                        <div style={{display:"flex",flexDirection:"column", gap:"12px"}}>
                            <div className='footer-heading'>About Us</div>
                            <div>
                            <Link to={'/team'}><span style={{color:"#1E2833", paddingBottom:"6px", fontSize:"16px"}}>Team</span></Link>
                            </div>
                            <div>
                            <Link to={'/media'}><span style={{color:"#1E2833", paddingBottom:"6px", fontSize:"16px"}}>News</span></Link>
                            </div>
                            <div>
                            <Link to={'/blog'}><span style={{color:"#1E2833", paddingBottom:"6px", fontSize:"16px"}}>Blog</span></Link>
                            </div>
                            <div>
                            <Link to={'/careers'}><span style={{color:"#1E2833", paddingBottom:"6px", fontSize:"16px"}}>Apply</span></Link>
                            </div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column", gap:"12px"}}>
                            <div className='footer-heading'>Governance+</div>
                            <div>
                            <Link to={'/amritseries'}><span style={{color:"#1E2833", paddingBottom:"6px", fontSize:"16px"}}>Amrit Series</span></Link>
                            </div>
                            {/* <div>
                            <Link to={'/'}><span style={{color:"#1E2833", paddingBottom:"6px", fontSize:"16px"}}>Governance Decluttered</span></Link>
                            </div> */}
                            <div>
                            <Link to={'/governanceframeworks'}><span style={{color:"#1E2833", paddingBottom:"6px", fontSize:"16px"}}>Governance Frameworks</span></Link>
                            </div>
                            <div>
                            <Link to={'/sushasan'}><span style={{color:"#1E2833", paddingBottom:"6px", fontSize:"16px"}}>Sushasan</span></Link>
                            </div>
                        </div>
                        <div style={{display:"flex",flexDirection:"column", gap:"16px"}}>
                            <div style={{display:"flex",flexDirection:"column", gap:"12px"}}>
                                <div className='footer-heading'>Events & Initiatives</div>
                                <div>
                                    <Link to={'/c4gt'}><span style={{color:"#1E2833", paddingBottom:"6px", fontSize:"16px"}}>Code for GovTech (C4GT)</span></Link>
                                </div>
                                <div>
                                    <Link to={'/tgc'}><span style={{color:"#1E2833", paddingBottom:"6px", fontSize:"16px"}}>The Governance Challenge (TGC)</span></Link>
                                </div>
                            </div>
                            <div style={{display:"flex",flexDirection:"column", gap:"12px"}}>
                                <div className='footer-heading'>Follow Us</div>
                                <div style={{display:"flex",gap:"24px"}}>
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
            <div className={'bottom-copyright-section'}>
                © 2024 Samagra Development Associates Pvt. Ltd &nbsp;&nbsp; <a
                href="https://drive.google.com/file/d/1JBr51LlCtUv-q35Onh6dbgHBmI18qhEH/view?usp=sharing" target="_" style={{color: "#1E2833", textDecoration:"underline"}}>CSR</a>
            </div>
        </div>
    )
};

export default Footer
