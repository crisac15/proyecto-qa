// API fetch routes for Excel

import type { Campus } from "@/lib/types.ts";
import { API_URL } from "@/lib/api.ts";

/**
 * Download an excel file with the students from a campus
 * @param campus the campus
 */
export async function downloadStudents(campus: string): Promise<void> {
  window.open(`${API_URL}/excel/download/${campus}`);
}

/**
 * Download an excel file with all the students
 */
export async function downloadAllStudents(): Promise<void> {
  window.open(`${API_URL}/excel/download/`);
}

/**
 * Upload an excel file with the students
 * @param file the file to upload
 */
export async function uploadStudents(
  file: File,
  campus: Campus
): Promise<void> {
  const formData = new FormData();
  formData.append("file", file);

  await fetch(`${API_URL}/excel/upload`, {
    method: "POST",
    body: formData,
    headers: {
      campus: campus,
    },
  });
}
