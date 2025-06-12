"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFilesController = void 0;
const storage_1 = require("firebase/storage");
/**
 * Class that handles the requests related to uploading files and images to cloud service
 */
class uploadFilesController {
    /**
     * Upload a File or image
     * @param req the request
     * @param res the response
     */
    static uploadFile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const giveCurrentDateTime = () => {
                    const today = new Date();
                    const date = today.getFullYear() +
                        "-" +
                        (today.getMonth() + 1) +
                        "-" +
                        today.getDate();
                    const time = today.getHours() +
                        ":" +
                        today.getMinutes() +
                        ":" +
                        today.getSeconds();
                    const dateTime = date + " " + time;
                    return dateTime;
                };
                const dateTime = giveCurrentDateTime();
                // Initialize Cloud Storage and get a reference to the service
                const storage = (0, storage_1.getStorage)();
                const storageRef = (0, storage_1.ref)(storage, `files/${req.file.originalname + "       " + dateTime}`);
                // Create file metadata including the content type
                const metadata = {
                    contentType: req.file.mimetype,
                };
                // Upload the file in the bucket storage
                const snapshot = yield (0, storage_1.uploadBytesResumable)(storageRef, req.file.buffer, metadata);
                //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel
                // Grab the public url
                const downloadURL = yield (0, storage_1.getDownloadURL)(snapshot.ref);
                console.log("File successfully uploaded.");
                return res.send({
                    message: "file uploaded to firebase storage",
                    name: req.file.originalname,
                    type: req.file.mimetype,
                    downloadURL: downloadURL,
                });
            }
            catch (error) {
                return res.status(400).send(error.message);
            }
        });
    }
}
exports.uploadFilesController = uploadFilesController;
//# sourceMappingURL=uploadFilesController.js.map