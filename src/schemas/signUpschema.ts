import { z } from "zod";

export const usernameValidation = z
  .string()
  .min(2, "Username must be atleast 2 characters")
  .max(20, "Username must be less then 20 characters")
  .regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special character");

export const signUpScehma = z.object({
  username: usernameValidation,
  email: z.string().email({ message: "not valid email" }),
  password: z.string().min(6, { message: "password must be 6 character" }),
});
