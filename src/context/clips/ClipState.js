import { useState } from "react";
import ClipContext from "./clipContext";

const ClipState = (props) => {
    const host = "https://clipper-save.herokuapp.com"
    // const host = "http://localhost:5000"
    const clipsIntital = [];
    const [clips, setClips] = useState(clipsIntital);

    //Get Clip
    const getClip = async () => {
        // API Call
        const response = await fetch(`${host}/api/clips/getclip`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('clipName')
            },

        });
        const json = await response.json();
        // console.log(json);
        if (json.success) {
            setClips(json.clip);
        } else if (!json.success) {
            setClips({ clipName: "", clipContent: "", file: "" });
        }
        // Delete clips if it is to be deleted
        deleteClip();
    }

    //Add a Clip
    const addClip = async (clipName, clipContent, file) => {
        // API Call
        var data = new FormData()
        data.append('file', file)
        data.append('clipName', clipName)
        data.append('clipContent', clipContent)

        const response = await fetch(`${host}/api/clips/createClip`, {
            method: 'POST',
            headers: {
                // 'Content-Type': 'application/json',
                // 'Content-Type': 'multipart/form-data',
                // "Content-Type": "multipart/form-data; boundary=BbC04y ", //"multipart/mixed;boundary=gc0p4Jq0M2Yt08jU534c0p" //  ή // multipart/form-data 
                'auth-token': localStorage.getItem('token')
            },
            body: data
        });
        const clip = await response.json();
        // console.log(clip);
        // setClips({ clipName, clipContent, file });
        getClip();
    }

    // Delete a Clip
    const deleteClip = async () => {
        // API Call
        // console.log(localStorage.getItem('clipName'));
        const response = await fetch(`${host}/api/clips/deleteclip/`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('clipName')
            }
            // body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        // console.log(json);
        getClip();
        // console.log("Deleting the clip with id => "+id);
        // const newClips = clips.filter((clip) => { return clip._id !== id });
        // setClips(newClips);

    }
    return (
        <ClipContext.Provider value={{ clips, addClip, getClip, deleteClip }}>
            {props.children}
        </ClipContext.Provider>
    )
};

export default ClipState;
