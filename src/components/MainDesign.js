import React from 'react';
import Footer from './Footer';
import Heypasteit from './Heypasteit';

const MainDesign = (props) => {
    return (
        <>
            <div className="container-fluid min-vh-100" style={{ backgroundColor: '#FFECD0' }}>
                <div className="">
                    <Heypasteit showAlert={props.showAlert} setClip={props.setClip}  clip={props.clip} />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default MainDesign;
