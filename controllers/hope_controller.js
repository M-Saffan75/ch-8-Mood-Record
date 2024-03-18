const Hopeful = require('../models/hopeful.js');
const multer = require('multer');
const dotenv = require('dotenv');
dotenv.config();


//  video are here

const AudioStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './records/hope/audio');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const HopefulAudio = multer({
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


/* create Hopefull */

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
                user_id: req.user_id,
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


/* All Hopefull */


const Fetch_hope = async (req, res) => {
    try {
        const hope = await Hopeful.find();
        if (!hope || hope.length === 0) {
            return res.status(404).json({ message: 'Hope not found.' });
        }

        res.status(200).json({ message: 'Hope retrieved successfully', hope: hope });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};


/* Delete Hopefull */


const Remove_hope = async (req, res) => {
    try {
        const hopeId = await Hope.findById(req.params.id);
        await Hopeful.deleteOne({ _id: req.params.id });
        return res.status(200).json({ message: 'Hope Successfully Deleted', code: 200 });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};



module.exports = { Recording_hopeful, Remove_hope, Fetch_hope }