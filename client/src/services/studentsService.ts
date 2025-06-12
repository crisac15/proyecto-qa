// API fetch routes for teachers

import type { Notification, Inbox, Student } from "@/lib/types.ts";
import { API_URL } from "@/lib/api.ts";

/**
 * Get all the students
 * @returns a promise with the students
 */
export async function getAllStudents(): Promise<Student[]> {
  const response = await fetch(`${API_URL}/students`);
  return response.json();
}

/**
 * Get all the students from a campus
 * @param campus the campus
 * @returns a promise with the students
 */
export async function getStudentsByCampus(campus: string): Promise<Student[]> {
  const response = await fetch(`${API_URL}/students/campus/${campus}`);
  return response.json();
}

/**
 * Delete a student
 * @param carnet the id of the student to delete
 * @returns a promise with the deleted student
 */
export async function deleteStudent(carnet: number): Promise<Student> {
  const response = await fetch(`${API_URL}/students/${carnet}`, {
    method: "DELETE",
  });
  return response.json();
}

/**
 * Update a student
 * @param student the student to update
 * @returns a promise with the updated student
 */
export async function updateStudent(student: Student): Promise<Student> {
  const response = await fetch(`${API_URL}/students/${student.carnet}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(student),
  });
  return response.json();
}

/**
 * Update the photo of a student
 * @param carnet the id of the student
 * @param photo the new photo
 * @returns a promise with the updated student
 */
export async function updateStudentPhoto(
  carnet: number,
  photo: string
): Promise<Student> {
  const response = await fetch(`${API_URL}/students/${carnet}/photo`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ photo }),
  });
  return response.json();
}

/**
 * Get a student by id
 * @param carnet the id of the student
 * @returns a promise with the student
 */
export async function getStudentById(carnet: number): Promise<any> {
  const response = await fetch(`${API_URL}/students/${carnet}`);
  return response.json();
}

/**
 * Get the inbox of a student
 * @param carnet the id of the student
 * @returns a promise with the notifications
 */
export async function getStudentInbox(carnet: string): Promise<Inbox> {
  const response = await fetch(`${API_URL}/students/${carnet}/inbox`);
  return response.json();
}

/**
 * Update the inbox of a student
 * @param carnet the id of the student
 * @param inbox the new inbox
 * @returns a promise with the updated inbox
 */
export async function updateStudentInbox(
  carnet: string,
  inbox: Inbox
): Promise<Inbox> {
  const response = await fetch(`${API_URL}/students/${carnet}/inbox`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(inbox),
  });
  return response.json();
}

/**
 * Delete a notification from the inbox of a student
 * @param carnet the id of the student
 * @param notificationId the id of the notification to delete
 * @returns a promise with the updated inbox
 */
export async function deleteNotification(
  carnet: string,
  notificationId: string
): Promise<Inbox> {
  const response = await fetch(
    `${API_URL}/students/${carnet}/inbox/${notificationId}`,
    {
      method: "DELETE",
    }
  );
  return response.json();
}

/**
 * Mark a notification as read
 * @param carnet the id of the student
 * @param notificationId the id of the notification to mark as read
 * @returns a promise with the updated inbox
 */
export async function markNotificationAsRead(
  carnet: string,
  notificationId: string
): Promise<Inbox> {
  const response = await fetch(
    `${API_URL}/students/${carnet}/inbox/${notificationId}`,
    {
      method: "PATCH",
    }
  );
  return response.json();
}

/**
 * Delete all the read notifications from the inbox of a student
 * @param carnet the id of the student
 * @returns a promise with the updated inbox
 */
export async function deleteReadNotifications(carnet: string): Promise<Inbox> {
  const response = await fetch(`${API_URL}/students/${carnet}/inbox`, {
    method: "PATCH",
  });
  return response.json();
}

/**
 * Get all the notifications
 * @returns a promise with the notifications
 */
export async function getAllNotifications(): Promise<Notification[]> {
  const response = await fetch(`${API_URL}/students/1/notifications`);
  return response.json();
}
