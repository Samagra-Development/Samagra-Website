import React from "react";

const Card = ({ category, title, description, imageUrl="", link = "#" }) => {
    return (
        <div className="newsletter_card">
            <div className="card-image">
                <img src={imageUrl} alt={title} />
            </div>
            <div className="card-content">
                <div className="card-category">{category}</div>
                <h2 className="card-title">{title}</h2>
                <p className="card-description">{description}</p>
                <a href={link} className="card-link">
                    Read more <span>&rarr;</span>
                </a>
            </div>
        </div>
    );
};

export default Card;
