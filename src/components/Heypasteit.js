// import moment from 'moment';
import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import contextValue from "../context/clips/clipContext";


const Heypasteit = (props) => {
    const context = useContext(contextValue);
    const { clips, addClip, getClip, deleteClip } = context;
    let navigate = useNavigate();
    const { clip, setClip, showAlert, } = props;
    const handleSaveClip = (e) => {
        e.preventDefault();
        // console.log(clip.file);
        addClip(clip.clipName, clip.clipContent, clip.file);
        setClip({ clipName: "", clipContent: "", file: "" });
        showAlert("Clip saved successfully, Clip will destroyed after 1 hour from creation", "success");
    }
    const handleFindClip = (e) => {
        e.preventDefault();

    }

    const handleOnChange = (e) => {
        setClip({ clipName: localStorage.getItem('clipName'), clipContent: e.target.value, file: clip.file });
    }
    const handleFileChange = (e) => {
        setClip({ clipName: localStorage.getItem('clipName'), clipContent: clip.clipContent, file: e.target.files[0] });
    }

    useEffect(() => {
        if (localStorage.getItem('clipName')) {
            getClip();
        } else {
            localStorage.removeItem('clipName');
            navigate("/");
        }
        // eslint-disbaled-next-line
    }, []);

    const getCurrentDate = () => {
        var today = new Date();
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let date = today.getDate() + '-' + monthNames[(today.getMonth() + 1)].substring(0, 3) + '-' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + (today.getSeconds());

        // console.log(moment.utc(today.getHours() + ':' + today.getMinutes(), 'hh:mm').add(1, 'hour').format('hh:mm'));
        // console.log(moment.utc(today.getHours() + ':' + today.getMinutes(), 'hh:mm').add(30, 'minutes').format('hh:mm'));
        // console.log(moment.utc(today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds(), 'hh:mm:ss').add(30, 'seconds').format('hh:mm:ss'));

        return date;
    }

    return (
        <>
            <div className="container-fluid">
                <div className="col col-md-12 offset-md-0 col-lg-12 offset-lg-0 div-wrapper d-flex justify-content-center align-items-center">
                    <div className='col-12 col-lg-8 m-2 h-100 min-vh-100' style={{ backgroundColor: '#FFF5E6', border: '2px solid #F9AB35', borderRadius: '10px' }}>
                        <div className='d-lg-flex mt-5 p-3'>
                            <div className='col-12 col-lg-8'>
                                <h1 className="display-6 text-dark">Hey, Clipper</h1>
                            </div>
                            <div className="align-items-center">
                                <div className="col-12">
                                    <form onSubmit={handleFindClip}>
                                        {/* <input type="text" autoComplete='off' required name='clipName' style={{ backgroundColor: '#FFF5E6', borderLeft: '2px solid #F9AB35', borderTop: '2px solid #F9AB35', borderBottom: '1px solid #F9AB35', borderRight: '1px solid #F9AB35', borderRadius: '5px', height: '36px', margin: '0', padding: '0' }} className="col-12 col-sm-6 col-md-8 mb-2" id="clipName" />
                                        <input type="submit" value="Find It" name='find_it' id='find_it' className='' style={{ padding: '8px 10px 8px 10px', borderRadius: '6px', marginLeft: '5px', backgroundColor: '#F9AB35', border: '1px solid #f8f9fa' }} /> */}
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="d-lg-flex p-3">
                            <form className='w-100' onSubmit={handleSaveClip}>
                                <label htmlFor="clipName" className="w-100">Clip Name : {localStorage.getItem('clipName')}</label>
                                {/* <label htmlFor="clipName" className="mb-3">Clip will be destroy on : {new Date().toLocaleString() + ""}</label> */}
                                {/* <label htmlFor="clipName" className="mb-3">Clip will be destroyed on : {getCurrentDate()}</label> */}
                                <input type="hidden" readOnly name="clipName" id="clipName" value={localStorage.getItem('clipName')} />
                                {clips.clipContent === '' ?
                                    <>
                                        <textarea required name="clipContent" id="clipContent" cols="30" rows="8" className='w-100' style={{ backgroundColor: '#FFF5E6', borderLeft: '2px solid #F9AB35', borderTop: '2px solid #F9AB35', borderBottom: '1px solid #F9AB35', borderRight: '1px solid #F9AB35', borderRadius: '5px' }} onChange={handleOnChange} placeholder='Enter your text here...'></textarea>
                                        <p><b>{clip.clipContent.split(/\s+/).filter((element) => { return element.length !== 0 }).length}</b> words and <b>{clip.clipContent.length}</b> characters</p>
                                        <input type="file" name="clipFile" id="clipFile" onChange={handleFileChange} /><br /><br />
                                        <input type="submit" value="Save This Clip" name='saveClip' id='saveClip' className='' style={{ padding: '8px 10px 8px 10px', borderRadius: '6px', marginLeft: '5px', backgroundColor: '#F9AB35', border: '1px solid #f8f9fa' }} />
                                    </>
                                    :
                                    <>
                                        <label htmlFor="clipName" className="mb-3">Clip will be destroyed on : {clips.destroy_on}</label>
                                        <textarea readOnly required name="clipContent" id="clipContent" cols="30" rows="8" className='w-100' style={{ backgroundColor: '#FFF5E6', borderLeft: '2px solid #F9AB35', borderTop: '2px solid #F9AB35', borderBottom: '1px solid #F9AB35', borderRight: '1px solid #F9AB35', borderRadius: '5px' }} value={clips.clipContent}></textarea>
                                        {clips.file !== '' && <a href={`public/clipsImages/${clips.file}`} download={clips.file}>Download</a>}
                                    </>
                                }
                            </form>
                        </div>
                    </div>
                    {/* <div className='d-lg-flex p-3 col-12 col-lg-8' style={{ backgroundColor: '#FFF5E6', border: '2px dashed #F9AB35' }}> */}
                </div>
            </div>
            {/* <div className="row">
                <div className="col-12 p-0">
                    <div className="jumbotron min-vh-100 text-center m-0 bg-primary d-flex flex-column justify-content-center">
                        <div className=''>
                            <div className="col-md-6 offset-md-3 col-lg-12 offset-lg-0 div-wrapper d-flex justify-content-center align-items-center">
                                <div className="lead container my-3" style={{ height: '100vh' }}>
                                    <div className="container" style={{ border: '2px solid white' }}>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
        </>
    );
};

export default Heypasteit;
