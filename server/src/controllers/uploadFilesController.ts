import { Request, Response } from "express";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";

/**
 * Class that handles the requests related to uploading files and images to cloud service
 */
export class uploadFilesController {
  /**
   * Upload a File or image
   * @param req the request
   * @param res the response
   */
  public static async uploadFile(req: Request, res: Response) {
    try {
      const giveCurrentDateTime = () => {
        const today = new Date();
        const date =
          today.getFullYear() +
          "-" +
          (today.getMonth() + 1) +
          "-" +
          today.getDate();
        const time =
          today.getHours() +
          ":" +
          today.getMinutes() +
          ":" +
          today.getSeconds();
        const dateTime = date + " " + time;
        return dateTime;
      };
      const dateTime = giveCurrentDateTime();

      // Initialize Cloud Storage and get a reference to the service
      const storage = getStorage();

      const storageRef = ref(
        storage,
        `files/${req.file.originalname + "       " + dateTime}`
      );

      // Create file metadata including the content type
      const metadata = {
        contentType: req.file.mimetype,
      };

      // Upload the file in the bucket storage
      const snapshot = await uploadBytesResumable(
        storageRef,
        req.file.buffer,
        metadata
      );
      //by using uploadBytesResumable we can control the progress of uploading like pause, resume, cancel

      // Grab the public url
      const downloadURL = await getDownloadURL(snapshot.ref);

      console.log("File successfully uploaded.");
      return res.send({
        message: "file uploaded to firebase storage",
        name: req.file.originalname,
        type: req.file.mimetype,
        downloadURL: downloadURL,
      });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }
}
