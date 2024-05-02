import React, {useState} from 'react';

const MenuDropdown = ({data, heading,menuIcon}) => {
    let loosingFocusTimeout;

    const [focused, changeFocus] = useState(
        false
    );
    const looseFocus = () => {
        loosingFocusTimeout = setTimeout(() => {
            changeFocus(false);
            loosingFocusTimeout = null;
        }, 100);
    };
    const setFocus = () => {
        if (loosingFocusTimeout) {
            clearTimeout(loosingFocusTimeout);
        }
        changeFocus(true)
    };


    return (
        <li onMouseEnter={() => setFocus()} onMouseLeave={() => looseFocus()} style={{position: 'relative'}}
            className={`${focused ? 'focused' : ''}`}>
            <a className="nav-link" href="#" style={{display:"flex",alignItems:"center",gap:"4px"}}><span>{heading}</span><img src={menuIcon}/></a>
            <div className={'sub-menu'}>
                <div className={"head-items-wrapper"}>
                {
                            data.map((item, index) => {
                                return <a href={item.projectUrl}>
                                    <div key={index} className={`head-item`}>
                                        {
                                            item.title
                                        }
                                    </div>
                                </a>;
                            })
                        }
                </div>
            </div>
        </li>
    )
};

export default MenuDropdown

