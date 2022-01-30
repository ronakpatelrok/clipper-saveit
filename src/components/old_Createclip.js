import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Createclip = (props) => {
    let navigate = useNavigate();
    let { clip, setClip } = props;
    const handleSubmit = (e) => {
        e.preventDefault();
        props.showAlert("Clip saved successfully, Clip will destroyed after 1 hour from creation","success");
        // navigate('/clip/createclip');
    }
    useEffect(() => {
        if (localStorage.getItem('clipName')) {
            // getNotes();
        } else {
            navigate("/clip");
        }
        // eslint-disbaled-next-line 
    }, []);

    const onChange = (e) => {
        setClip({...clip, clipName: document.getElementById('formId').clipName.value, ClipContent: document.getElementById('formId').ClipContent.value, file: document.getElementById('formId').file.value })
    }
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 p-0">
                    <div className="jumbotron min-vh-100 text-center m-0 bg-primary d-flex flex-column justify-content-center">
                        <div className=''>
                            <div className="col-md-6 offset-md-3 col-lg-12 offset-lg-0 div-wrapper d-flex justify-content-center align-items-center">
                                <div className="lead">
                                    <form onSubmit={handleSubmit} id="formId">
                                        <h1 className="display-4 text-white m-4">{localStorage.getItem('clipName')},<span style={{ 'fontSize': '50px' }}>&#128515;&#128076;</span></h1>
                                        <div className="col-lg-12">
                                            <input type="hidden" readOnly name="clipName" id="clipName" value={localStorage.getItem('clipName')} onChange={onChange} />
                                            <textarea required placeholder='Enter your text here...' name="ClipContent" autoComplete='off' id="ClipContent" cols="20" rows="5" className='bg-primary w-100 text-white' style={{ 'border': '1px solid', 'borderBottom': '2px solid white', 'outline': 'none' }} onChange={onChange}></textarea>
                                            <br />
                                            <input type="file" className='w-100' name="file" accept="image/*" id="file" onChange={onChange} />
                                            <br />
                                            <button className='btn btn-outline-light my-3' id='createThisBtn'>Create clip</button>
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

export default Createclip;
