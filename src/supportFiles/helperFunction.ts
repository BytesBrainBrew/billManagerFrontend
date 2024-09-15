// in this file  we can define our  validate function 

/**
 * Validates an email address.
 * @param email - The email address to validate.
 * @returns Returns true if the email is valid, false otherwise.
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z-])+\.)+([a-zA-Z]{2,4})+$/;
  return emailRegex.test(email);
}
