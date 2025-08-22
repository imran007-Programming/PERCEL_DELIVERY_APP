import z from "zod";

export const registerSchema = z
  .object({
    name: z
      .string({ error: "name is required" })
      .min(2, { error: "name has at least 2 characters" })
      .max(50, { error: "name can not be more than 50 characters" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .refine((val) => val.includes("@"), {
        message: "Email must contain @",
      }),
    phone: z
      .string()
      .min(11, { message: "Phone must be exactly 11 digits" }) // Minimum length check
      .regex(/^[0-9]{11}$/, { message: "Phone must be 11 digits and contain only numbers" }), // Numeric check
    address: z
      .string()
      .min(8, { message: "Address must be at least 8 characters long" }), // Minimum length check for address
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" })
      .regex(/[A-Z]/, {
        message: "Password must contain at least one uppercase letter",
      })
      .regex(/[^A-Za-z0-9]/, {
        message: "Password must contain at least one special character",
      }),
    confirmpassword: z
      .string()
      .min(6, { error: "Confirm password is too short" }),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Password and Confirm Password don't match",
    path: ["confirmpassword"], // path of error
  });
