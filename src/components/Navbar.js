import React from 'react'
import {Link} from 'gatsby'
import github from '../img/github-icon.svg'
import logo from '../img/logo-colored.png'
import logoInverted from '../img/Samagra_Logo_updated.png'
import menuIcon from '../img/menu_icon.png'
import HeaderDropdown from "./HeaderDropdown";

const Navbar = class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {showInverted: false, projects: [], domains: []};
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
        const {showInverted, projects, domains} = this.state;
        return (
            <div className={`header-wrapper  ${showInverted ? 'inverted-fixed' : ''} `}>
                <div>
                    <nav id='navbar-text' className="nav-wrapper nav justify-content-between align-items-center" style={{padding:"10px 0", margin:"0 132px",borderBottom:"1px rgba(255, 255, 255, 0.72) solid"}}>
                        <Link to={'/'} style={{padding:"0"}}>
                            <a className="nav-link active navbar-brand" style={{padding: 0}} href="#">
                                <img className={'logo'} src={showInverted ? logo : logoInverted} style={{width: !showInverted && "258px",height:!showInverted && "93px"}}/>
                            </a>
                        </Link>
                        <ul className={'nav justify-content-end'} style={{display:"flex",gap:"36px"}}>
                            <HeaderDropdown domains={domains}/>

                            <li>
                            <Link to={'/amritseries'}><a className="nav-link" style={{fontSize:"18px"}} href="/amritseries">Success Stories</a></Link>
                            </li>
                            <li>
                                <a className="nav-link" href="https://tech.samagragovernance.in" style={{fontSize:"18px"}}>Tech and Data</a>
                            </li>
                            <li>
                                <Link to={'/'}><a className="nav-link" href="/" style={{fontSize:"18px"}}>About Us</a></Link>
                            </li>
                            <li>
                                <Link to={'/'}><a className="nav-link" href="/" style={{fontSize:"18px"}}>Governance</a></Link>
                            </li>
                            <li>
                                <Link to={'/c4gt'}><a className="nav-link" href="/c4gt" style={{fontSize:"18px"}}>Events and Initiatives</a></Link>
                            </li>
                        </ul>
                        {/* <ul className={'nav justify-content-end'}>
                            <HeaderDropdown domains={domains}/>

                            <li>
                                <a className="nav-link" href="https://tech.samagragovernance.in">SamagraX</a>
                            </li>
                            <li>
                                <Link to={'/governanceframeworks'}><a className="nav-link" href="/governanceframeworks">Governance Frameworks</a></Link>
                            </li> */}
                            {/* <li>
                                <Link to={'/casestudies'}><a className="nav-link" href="/casestudies">Case Studies</a></Link>
                            </li> */}
                            {/* <li>
                                <Link to={'/amritseries'}><a className="nav-link" href="/amritseries">Amrit Series</a></Link>
                            </li>
                            <li>
                                <Link to={'/sushasan'}><a className="nav-link" href="/sushasan">Sushasan</a></Link>
                            </li>
                            <li>
                                <Link to={'/c4gt'}><a className="nav-link" href="/c4gt">C4GT</a></Link>
                            </li>
                            <li>
                                <Link to={'/team'}><a className="nav-link" href="/team">Team</a></Link>
                            </li> */}
                            {/* <li>
                                <Link to={'/partners'}><a className="nav-link" href="/partners">Partners</a></Link>
                            </li> */}
                            {/* <li>
                                <Link to={'/media'}><a className="nav-link" href="/media">Media</a></Link>
                            </li> */}

                            {/*<li>*/}
                            {/*    <Link to={'/blog'}><a className="nav-link" href="/blog">Blog</a></Link>*/}
                            {/*</li>*/}
                            {/* <li>
                                <Link to={'/careers'}><a className="nav-link" href="/careers">Careers</a></Link>
                            </li>
                        </ul> */}
                    </nav>
                </div>
            </div>
        )
    }
}

export default Navbar
