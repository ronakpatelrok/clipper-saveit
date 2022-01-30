import React from 'react';

const Footer = () => {
    return (
        <footer className="text-center text-lg-start">
            <div className="text-center p-3" style={{ backgroundColor: "#FFECD0" }}>
                © {new Date().getFullYear() +"-"+ (new Date().getFullYear()+1)} Copyright : All rights reserved. <a className="text-dark" target='_blank' rel="noreferrer" href="https://vivaanintellects.com">Vivaan Intellects</a>
                {/* © 2020 - 2022 All Rights Reserved. Vivaan Intellects */}
            </div>
        </footer>
    );
};

export default Footer;
