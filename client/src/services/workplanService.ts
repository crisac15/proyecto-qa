// API fetch routes for workplans

import type { WorkPlan } from "@/lib/types";
import { API_URL } from "@/lib/api";

/**
 * Get all the workplans
 * @returns a promise with the workplans
 */
export async function getAllWorkplans(): Promise<WorkPlan[]> {
  const response = await fetch(`${API_URL}/workplans`);
  return response.json();
}

/**
 * Get a workplan by its id
 * @param _id the id of the workplan
 * @returns a promise with the workplan
 */
export async function getWorkplanById(_id: string): Promise<WorkPlan> {
  const response = await fetch(`${API_URL}/workplans/${_id}`);
  return response.json();
}

/**
 * Create a new workplan
 * @param workplan the workplan to create
 * @returns a promise with the new workplan
 */
export async function createWorkplan() {
  const response = await fetch(`${API_URL}/workplans`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await response.json();
  return data.id;
}

/**
 * Update a workplan
 * @param workplan the workplan to update
 * @returns a promise with the updated workplan
 */
export async function updateWorkplan(workplan: WorkPlan) {
  await fetch(`${API_URL}/workplans/${workplan.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(workplan),
  });
}

/**
 * Delete a workplan
 * @param id the id of the workplan to delete
 * @returns a promise with the deleted workplan
 */

export async function deleteWorkplan(id: string) {
  await fetch(`${API_URL}/workplans/${id}`, {
    method: "DELETE",
  });
}

export async function notifyActitities(date: string) {
  await fetch(`${API_URL}/notifications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ date }),
  });
}
