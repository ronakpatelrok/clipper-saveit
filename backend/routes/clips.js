const express = require('express');
const router = express.Router();
const Clips = require('../models/Clips');
const { body, validationResult } = require('express-validator');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchClipToken = require('../middleware/fetchClipToken');
const fs = require('fs');

const JWT_SECRET = 'RonakisaGood%$Boy';

const getCurrentDate = (addTime) => {
    var today = new Date();
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // console.log(today.getSeconds());
    today.setSeconds(today.getSeconds() + addTime);
    // let date = today.getDate() + '-' + (today.getMonth()+1) + '-' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    let dateAfterAdding = monthNames[today.getMonth()] + ' ' + today.getDate() + ', ' + today.getFullYear() + ' ' + today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds();
    
    // console.log(moment.utc(today.getHours() + ':' + today.getMinutes(), 'hh:mm').add(1, 'hour').format('hh:mm'));
    // console.log(moment.utc(today.getHours() + ':' + today.getMinutes(), 'hh:mm').add(30, 'minutes').format('hh:mm'));
    // console.log(moment.utc(today.getHours() + ':' + today.getMinutes() + ':' + today.getSeconds(), 'hh:mm:ss').add(30, 'seconds').format('hh:mm:ss'));
    var dateobj = new Date(dateAfterAdding);
    return dateobj.toISOString();
}

// ROUTE 1 : Create a Clip using : POST "/api/clips/createClip". Doesn't require Auth
router.post('/createClip', [
    body('clipName', 'Enter a valid Clip Name').isLength({ min: 3 }),
    body('clipContent', 'Description must be atleast 5 character').isLength({ min: 5 })
], async (req, res)=>{
    try {
        let success = false;
        const { clipName, clipContent } = req.body;
        // console.log(req);
        let file = ""; 
        if (req.files) {
            var fl=req.files.file;
            // console.log(fl);
            fl.mv('../public/clipsImages/'+fl.name, function (err) {
                /* if (err) {
                    success = false;
                    // res.json({error: 'Please enter a unique value for clip name'});
                    return res.status(400).json({ success, error: 'Sorry a clip with this name already exits' });
                } */
            })
            file = fl.name;
        }

        // Check whether the clip with this name exist already
        let clip = await Clips.findOne({ clipName: req.body.clipName });
        if (clip) {
            success = false;
            // res.json({error: 'Please enter a unique value for clip name'});
            return res.status(400).json({ success, error: 'Sorry a clip with this name already exits' });
        }
        // If there are errors, returns bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        
        // Create a new clip
        clip = await Clips.create({
            clipName: clipName,
            clipContent: clipContent,
            file: file,
            destroy_on : getCurrentDate(30)
        });

        const data = {
            clip: {
                id: clip.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET);
        // console.log(jwtData);

        success = true;
        res.json({ success, authToken });

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }
    // res.send(req.body);
})

// ROUTE 2 : Get Clip Details using : POST "/api/clips/getclip".
router.post('/getclip', async (req, res) => {
    let success = false;
    try {
        // console.log(req.header('auth-token'));
        const token = req.header('auth-token');
        // const data = jwt.verify(token, JWT_SECRET);
        let data = await Clips.findOne({ clipName: token });
        if (!data) {
            success = false;
            // res.json({error: 'Please enter a unique value for email'});
            return res.json({ success, error: 'Sorry a clip with this name not exits' });
        }
        success = true;

        req.clip = data;
        const clipId = req.clip.id
        // console.log(clipId);
        const clip = await Clips.findById(clipId).select();
        res.json({ success, clip });
    } catch (error) {
        console.log(error.message);
        res.json({ success, error: "Internal Server Error" });
    }
})

// ROUTE 3 : Delete an existing Clip using : DELETE "/api/clips/deleteclip".
router.delete('/deleteclip', async (req, res) => {
    try {
        let currentTime = new Date().toISOString();
        // console.log('Current Time '+ getCurrentDate(0)+ ' After Time '+ currentTime);
        let data = await Clips.find({ "destroy_on": { $lte: getCurrentDate(0) }});
        // res.json(data.length);
        // console.log("Data - "+JSON.parse(JSON.stringify(data))[0].file);
        if (data.length > 0) {
            // console.log("InnerData - "+data);
            // fs.unlinkSync(path);
            let fl = JSON.parse(JSON.stringify(data))[0];
            if (fl.file !== '') {
                fs.unlinkSync('../public/clipsImages/'+fl.file);
            }
            let success = true;
            let clip = await Clips.findOneAndDelete({ "destroy_on": { $lte : getCurrentDate(0) }});
            res.json({ success, clip })
        }
        // Find the clip to be deleted and delete it
        /* let clip = await Clips.findById(req.params.id);
        if (!clip) { return res.status(404).send("Not Found") }

        // Allow deletion only if user owns this Clips
        if (clip.id.toString() !== req.clip.id) {
            return res.status(401).send("Not Allowed");
        }

        res.json({ "Success": "Clip has been deleted", clip: clip }); */
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal Server Error");
    }

})

module.exports = router;