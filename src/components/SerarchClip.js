import React from 'react';
import { useNavigate } from 'react-router-dom';

const SerarchClip = (props) => {
    localStorage.removeItem('clipName');
    // alert(localStorage.getItem('clipName'));
    let { clip, setClip } = props;
    // const [clip, setClip] = useState({ clipName: "", description: "", file: "" });
    let navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        // props.showAlert("","success");
        localStorage.setItem('clipName', clip.clipName);
        navigate('/createclip');
    }

    const onChange = (e) => {
        setClip({ ...clip, [e.target.name]: e.target.value })
    }

    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 p-0">
                    <div className="jumbotron min-vh-100 text-center m-0 d-flex flex-column justify-content-center" style={{ backgroundColor: '#F9AB35' }}>
                        <div className=''>
                            <div className="col-md-6 offset-md-3 col-lg-12 offset-lg-0 div-wrapper d-flex justify-content-center align-items-center">
                                <div className="lead" style={{ 'width': '408px' }}>
                                    <form onSubmit={handleSubmit}>
                                        <h1 className="display-4 text-white m-4">Hey, Clipper<span className='display-4'>&#128515;</span></h1>
                                        <div className="col-lg-12">
                                            {/* <form method='post'> */}
                                            <input type="text" autoComplete='off' placeholder='Enter clip name' required name="clipName" id="clipName" className='w-100 text-white' style={{ 'border': 'none', 'borderBottom': '2px solid white', 'outline': 'none', backgroundColor: '#F9AB35', "--color-text": 'white' }} onChange={onChange} />
                                            <br />
                                            <button className='btn btn-outline-light rounded-pill my-3' id='createThisBtn'><i className="fas fa-arrow-right fa-lg"></i></button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SerarchClip;
