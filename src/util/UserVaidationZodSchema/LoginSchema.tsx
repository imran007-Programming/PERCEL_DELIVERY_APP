import z from "zod";

export const loginSchema = z
    .object({
  
      email: z
        .string()
        .min(1, { message: "Email is required" })
        .refine((val) => val.includes("@"), {
          message: "Email must contain @",
        }),
      password: z
        .string()
        .min(8, { message: "Password must be at least 8 characters long" })
        .regex(/[A-Z]/, {
          message: "Password must contain at least one uppercase letter",
        })
        .regex(/[^A-Za-z0-9]/, {
          message: "Password must contain at least one special character",
        }),
      
    });