// API fetch routes for Activities
// - get all by plan 	/workplan/:wid/activities
// - get by id 		/workplan/:wid/activity/:aid
// - create in plan 	/workplan/:wid/activity/
// - update 		/workplan/:wid/activity/:aid

import type { Activity } from "@/lib/types";
import { API_URL } from "@/lib/api";

/**
 * Get all the activities of a workplan
 * @param wid the id of the workplan
 * @returns a promise with the activities
 */
export async function getAllActivities(wid: string): Promise<Activity[]> {
  const response = await fetch(`${API_URL}/workplans/${wid}/activities`);
  return response.json();
}

/**
 * Get an activity by its id
 * @param wid the id of the workplan
 * @param aid the id of the activity
 * @returns a promise with the activity
 */
export async function getActivityById(
  wid: string,
  aid: string
): Promise<Activity> {
  const response = await fetch(`${API_URL}/workplans/${wid}/activities/${aid}`);
  return response.json();
}

/**
 * Create a new activity in a workplan
 * @param wid the id of the workplan
 * @param activity the activity to create
 * @returns a promise with the new activity
 */
export async function createActivity(wid: string, activity: Activity) {
  await fetch(`${API_URL}/workplans/${wid}/activities`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activity),
  });
}

/**
 * Update an activity
 * @param wid the id of the workplan
 * @param activity the activity to update
 * @returns a promise with the updated activity
 */
export async function updateActivity(
  wid: string,
  activity: Activity,
  user?: string
) {
  const body = user ? { activity, user } : { activity };
  await fetch(`${API_URL}/workplans/${wid}/activities/${activity.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
