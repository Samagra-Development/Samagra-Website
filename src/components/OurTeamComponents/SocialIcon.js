import React, { useState } from "react";
import { IoLogoLinkedin } from "react-icons/io5"; 

const SocialIcon = ({ member }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div
            className="social-icon-wrapper text-center"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '50px',
                height: '50px',
                margin:'auto',
                borderRadius: '50%', 
                backgroundColor: isHovered ? '#0A66C2' : '#ffffff', 
                transition: 'background-color 0.3s ease', 
            }}
        >
            <a href={member.linkedInProfile} target="_blank" rel="noopener noreferrer">
                <IoLogoLinkedin
                    size={30} 
                    color={isHovered ? "#ffffff" : "#0A66C2"}
                    style={{ transition: 'color 0.3s ease' }} 
                />
            </a>
        </div>
    );
};

export default SocialIcon;
