import React from 'react'
import {Link} from 'gatsby'
import github from '../img/github-icon.svg'
import logo from '../img/Samagra_Logo_Colored.svg'
import logoInverted from '../img/Samagra_Logo_updated.svg'
import menuIconWhite from '../img/Menu_Icon_white.svg'
import menuIconBlack from '../img/Menu_Icon_black.svg'
import HeaderDropdown from "./HeaderDropdown";
import MenuDropdown from './MenuDropdown'

const Navbar = class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {showInverted: false, projects: [], domains: [],isOpen:false};
    }

    componentDidMount() {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', this.handleScroll, true);
            const self = this;
            if (window.localStorage.getItem('domains')) {
                setTimeout(() => {
                    const domains = [];

                    JSON.parse(window.localStorage.getItem('domains')).forEach((d) => {
                        domains.push({...d.node.frontmatter})
                    })
                    self.setState({domains: domains})
                }, 10);
            }
        }
    }

  handleMouseEnter = () => {
    this.setState({isOpen: true});
  };

  handleMouseLeave = () => {
    this.setState({isOpen: false});
  };
    toggleHamburger = () => {
        // toggle the active boolean in the state
        this.setState(
            {
                active: !this.state.active,
            },
            // after state has been updated,
            () => {
                // set the class in state for the navbar accordingly
                this.state.active
                    ? this.setState({
                        navBarActiveClass: 'is-active',
                    })
                    : this.setState({
                        navBarActiveClass: '',
                    })
            }
        )
    }
    filterUrl = (str) => {
        let result = '';
        str = str.replace(/ /g, '-').toLowerCase();
        for (let i = 0; i < str.length; i++) {
            if ('ascdfeghijklmnopqrstuvwxyz0123456789-'.indexOf(str[i]) > -1) {
                result += str[i];
            }
        }
        return result;
    };
    handleScroll = () => {
        if (this.state.showInverted && window.scrollY < 250) {
            this.setState({showInverted: false});
        }
        if (!this.state.showInverted && window.scrollY > 250) {

            this.setState({showInverted: true});
        }
    };

    render() {
        const {showInverted, projects, domains,isOpen} = this.state;
        return (
            <div className={`header-wrapper  ${showInverted ? 'inverted-fixed' : ''} `}>
                <div>
                    <nav id='navbar-text' className="nav-wrapper nav justify-content-between align-items-center" style={{padding:"4px 0", margin:"0 7.5vw",borderBottom:`.82px ${showInverted?"rgba(40, 40, 40, 0.72)":"rgba(255, 255, 255, 0.72)"} solid`}}>
                        <Link to={'/'} style={{padding:"0"}}>
                            <a className="nav-link active navbar-brand" style={{padding: "0"}} href="#">
                                <img className={'logo'} src={showInverted ? logo : logoInverted} />
                            </a>
                        </Link>
                        <ul className={'nav justify-content-end'} style={{display:"flex",gap:"12px"}}>
                            <HeaderDropdown domains={domains} menuIcon={showInverted?menuIconBlack:menuIconWhite}/>

                            <li>
                            <Link to={'/amritseries'}><a className="nav-link"  href="/amritseries">Our Impact</a></Link>
                            </li>
                            <li>
                                <a className="nav-link" href="https://tech.samagragovernance.in" >SamagraX</a>
                            </li>
                            <MenuDropdown menuIcon={showInverted?menuIconBlack:menuIconWhite} heading={"About Us"} data={[{title:"Team",projectUrl:"/team"},
                            {title:"Partners",projectUrl:"/partners"},
                            {title:"Media",projectUrl:"/media"},
                            {title:"Blog",projectUrl:"/blog"},
                            {title:"Careers",projectUrl:"/careers"}]}/>
                            <MenuDropdown menuIcon={showInverted?menuIconBlack:menuIconWhite} heading={"Our Assets"} data={[{title:"Amrit Series",projectUrl:"/amritseries"},
                            {title:"Governance Frameworks",projectUrl:"/governanceframeworks"},
                            {title:"Sushasan",projectUrl:"/sushasan"}]}/>
                            <MenuDropdown menuIcon={showInverted?menuIconBlack:menuIconWhite} heading={"Ecosystem Initiatives"} data={[{title:"Code for GovTech (C4GT)",projectUrl:"/c4gt"},
                            {title:"The Governance Challenge (TGC)",projectUrl:"/tgc"}]}/>
                            {/* <li className='nav-dropdown-menu'>
                                <a className="nav-link" href="#" onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} style={{display:"flex",alignItems:"center",gap:"4px",position:"relative"}}>
                                <span>About Us</span><img src={showInverted?menuIconBlack:menuIconWhite}/>
                                </a>
                                {isOpen && <div class="dropdown-content" style={{color:"#000000"}}>
                                    <a className='nav-dropdown-items' href="/team">Team</a>
                                    <a className='nav-dropdown-items' href="/partners">Partners</a>
                                    <a className='nav-dropdown-items' href="/media">Media</a>
                                    <a className='nav-dropdown-items' href="/blog">Blog</a>
                                    <a className='nav-dropdown-items' href="/careers">Careers</a>
                                </div>}
                            </li> */}
                            {/* <li className='nav-dropdown-menu'>
                                <a className="nav-link" href="#" style={{display:"flex",alignItems:"center",gap:"4px"}}><span>Our Assets</span><img src={showInverted?menuIconBlack:menuIconWhite}/></a>
                                <div class="dropdown-content" style={{color:"#000000"}}>
                                    <a className='nav-dropdown-items' href="/amritseries">Amrit Series</a>
                                    <a className='nav-dropdown-items' href="/governanceframeworks">Governance Frameworks</a>
                                    <a className='nav-dropdown-items' href="/sushasan">Sushasan</a>
                                </div>
                            </li>
                            <li className='nav-dropdown-menu'>
                                <a className="nav-link" href="#" style={{display:"flex",alignItems:"center",gap:"4px"}}><span>Ecosystem Initiatives</span><img src={showInverted?menuIconBlack:menuIconWhite}/></a>
                                <div class="dropdown-content" style={{color:"#000000"}}>
                                    <a className='nav-dropdown-items' href="/c4gt">{"Code for GovTech (C4GT)"}</a>
                                    <a className='nav-dropdown-items' href="/tgc">{"The Governance Challenge (TGC)"}</a>
                                </div>
                            </li> */}
                        </ul> 
                    </nav>
                </div>
            </div>
        )
    }
}

export default Navbar
