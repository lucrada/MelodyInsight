const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const { connect } = require('./config/db_config');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { execute } = require("./model/model_handler.js");
const { responseMessage } = require("./utils/util.js");
require("dotenv").config();

const port = process.env.PORT || 3000;
const clientPort = 5173;
const app = express();

(async () => {
    await connect();
    app.use(cors({ origin: `http://localhost:${clientPort}`, credentials: true }));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use("/cms", require("./routes/cms.route.js"));

    const uploadPath = '/home/kali/Desktop/MelodyInsight/MelodyInsight/server/src/model/music/';

    if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
    }

    const upload = multer({ dest: uploadPath });

    app.post('/cms/user/upload', upload.single('file'), (req, res) => {
        try {
            const file = req.file;
            if (!file) {
                responseMessage(res, 500, 'FILE_NOT_UPLOADED');
            }

            const uploadedFilePath = path.join(uploadPath, file.filename);
            const newFilePath = path.join(uploadPath, 'song.mp3');
            console.log(newFilePath);
            fs.renameSync(uploadedFilePath, newFilePath);

            console.log('File uploaded:', file.originalname);
            responseMessage(res, 200, 'FILE_UPLOADED');
        } catch (error) {
            console.error('Error uploading file:', error);
            responseMessage(res, 500, 'FILE_NOT_UPLOADED');
        }
    });

    app.post('/cms/user/upload', upload.single('file'), (req, res) => {
        try {
            const file = req.file;
            if (!file) {
                responseMessage(res, 500, 'FILE_NOT_UPLOADED');
                return;
            }
    
            const uploadedFilePath = path.join(uploadPath, file.filename);
            const newFilePath = path.join(uploadPath, file.originalname);
            console.log(newFilePath);
            fs.renameSync(uploadedFilePath, newFilePath);
    
            console.log('File uploaded:', file.originalname);
            responseMessage(res, 200, 'FILE_UPLOADED');
        } catch (error) {
            console.error('Error uploading file:', error);
            responseMessage(res, 500, 'FILE_NOT_UPLOADED');
        }
    });
    

    app.get("/", (_, res) => {
        res.send("Melody Insight");
    });
    app.listen(port, () => {
        console.log(`App listening on port ${port}`);
    })

})();