// API fetch routes for Uploading Files
import { API_URL } from "@/lib/api.ts";
/**
 * Upload a file or image to cloud service
 * @param file the file to upload
 */
export async function uploadFile(
    file: File,
    ): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch(`${API_URL}/files`, {
        method: "POST",
        body: formData,
    });
    const URL = await res.json();
    return URL.downloadURL;
}