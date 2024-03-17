const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const multer = require('multer');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
dotenv.config();


//  video are here

const VideoStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Admin/workout/videos');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});


const HopefulAudio = multer({
    storage: VideoStorage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('video/')) {
            cb(null, true);
        } else {
            cb(new Error('Only video files are allowed!'), false);
        }
    }
});


/* <><><><><>----------------------<><><><><> */


const Recording_hopeful = async (req, res) => {
    try {
        HopefulAudio.single('hopeful')(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ message: 'File upload failed.', status: 'failed' });
            }

            if (!req.file) {
                return res.status(402).json({ message: 'All Fields and Image Are Required', status: 'failed' });
            }

            const hope = await Hopeful({
                user_id:req.user_id,
                hopeful: req.file.filename
            });

            await hope.save();
            res.status(200).json({ message: 'Workout Create successfully', hopeful: hope, code: 200 });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', status: 'failed' });
    }
};

module.exports = { Recording_hopeful }