// // Auth routes
// //Login
// router.get("/login", AuthController.login); // req: email, password
// // reset password
//  router.post("/resetPassword", AuthController.resetPassword); // req: email
//  // validate token
// router.get("/validateToken", AuthController.validateToken); // req: email, token
// // change password
// router.post("/changePassword", AuthController.changePassword); // req: email, new password

import type { User } from "@/lib/types";
import { API_URL } from "@/lib/api";

/**
 * Login a user
 * @param email the email of the user
 * @param password the password of the user
 * @returns a promise with the user
 */
export async function login(
  email: string,
  password: string
): Promise<User | null> {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Check if the request was successful
    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(`HTTP error! status: ${errorMessage.message}`);
    }

    return response.json();
  } catch (error) {
    console.error("An error occurred", error);
    return null;
  }
}

/**
 * Reset the password of a user
 * @param email the email of the user
 * @returns a promise with the user
 */
export async function resetPassword(email: string): Promise<User | null> {
  try {
    const response = await fetch(`${API_URL}/auth/resetPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    // Check if the request was successful
    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(`HTTP error! status: ${errorMessage.message}`);
    }
    return response.json();
  } catch (error) {
    console.error("An error occurred", error);
    return null;
  }
}

/**
 * Validate a token
 * @param email the email of the user
 * @param token the token to validate
 * @returns a promise with the user
 */
export async function validateToken(
  email: string,
  token: string
): Promise<User | null> {
  try {
    const response = await fetch(`${API_URL}/auth/validateToken`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, token }),
    });
    // Check if the request was successful
    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(`HTTP error! status: ${errorMessage.message}`);
    }
    return response.json();
  } catch (error) {
    console.error("An error occurred", error);
    return null;
  }
}

/**
 * Change the password of a user
 * @param email the email of the user
 * @param password the new password
 * @returns a promise with the user
 */
export async function changePassword(
  email: string,
  password: string
): Promise<User | null> {
  try {
    const response = await fetch(`${API_URL}/auth/changePassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    // Check if the request was successful
    if (!response.ok) {
      const errorMessage = await response.json();
      throw new Error(`HTTP error! status: ${errorMessage.message}`);
    }
    return response.json();
  } catch (error) {
    console.error("An error occurred", error);
    return null;
  }
}
