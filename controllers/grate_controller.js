const GrateFul = require('../models/grateful.js');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();


//  video are here

const AudioStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './records/grateful/audio');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const GratefulAudio = multer({
    storage: AudioStorage,
    fileFilter: function (req, file, cb) {
        if (file.mimetype.startsWith('audio/mpeg')) {
            cb(null, true);
        } else {
            cb(new Error('Only MP3 audio files are allowed!'), false);
        }
    }
});


/* <><><><><>----------------------<><><><><> */

/* create Grate */

const Recording_grateful = async (req, res) => {
    try {
        GratefulAudio.single('grateful')(req, res, async function (err) {
            if (err) {
                return res.status(400).json({ message: 'File upload failed.', status: 'failed' });
            }

            if (!req.file) {
                return res.status(402).json({ message: 'All Fields and Image Are Required', status: 'failed' });
            }

            const grate = await GrateFul({
                user_id: req.user._id,
                gratetful: req.file.filename
            });

            await grate.save();
            res.status(200).json({ message: 'Grate Create successfully', gratetful: grate, code: 200, status: "success" });
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', status: 'failed' });
    }
};


/* All grateful */

const Fetch_grateful = async (req, res) => {
    try {
        const userId = req.user.id;
        const grate = await GrateFul.find({ user_id: userId });

        if (!grate || grate.length === 0) {
            return res.status(404).json({ message: 'GrateFul not found for this user.',status: "failed" });
        }

        res.status(200).json({ message: 'GrateFul Retrieved successfully', grateful: grate, code: 200,status: "success" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message , status: "failed"});
    }
};


/* Delete grateful */

const Remove_grateful = async (req, res) => {
    try {
        const grateId = await GrateFul.findById(req.params.id);
        if (!grateId) {
            return res.status(200).json({ message: 'GrateFul not found', code: 401, status: "failed" });
        }
        await GrateFul.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: 'GrateFul Successfully Deleted', code: 200 ,status: "success"});
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message,status: "failed" });
    }
};



module.exports = { Recording_grateful, Remove_grateful, Fetch_grateful }