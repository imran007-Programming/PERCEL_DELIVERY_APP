import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

// import { useRegisterMutation } from "@/redux/features/auth/auth.api";
// import { toast } from "sonner";
import { CheckCircle2, XCircle } from "lucide-react";
// import  { registerSchema } from "@/utils/userRegistrationValidation/userValidation";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Password from "@/components/ui/password";



export function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
//   const [resgister] = useRegisterMutation();
  const navigate= useNavigate()
  const form = useForm({
    // resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  });

  /* submit handler */
  const onSubmin = async (data
    // : z.infer<typeof registerSchema>
) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
    };
    try {
    //   const result = await resgister(userInfo).unwrap();
      console.log(data);
    //   toast.success("User created successfully");
    //   navigate("/verify")
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      if (err?.data?.message === "User Already Exist") {
        // toast.error("User Already Exist");
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center py-3 mt-7">
        <h1 className="text-2xl font-bold">Sign Up Your Account</h1>
      </div>
      <div className="grid gap-8 ">
        {/* Form  start*/}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmin)} className="space-y-4 ">
            {/* name */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                const hasError = !!form.formState.errors.name;
                const isFilled = field.value && !hasError;
                const isValidLength = field.value?.length >= 2;

                return (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input
                        className={cn(
                          "rounded-none border transition-colors duration-200",
                          hasError
                            ? "border-red-500 bg-red-50"
                            : isFilled
                              ? "border-green-500 bg-green-50"
                              : "border-gray-300"
                        )}
                        placeholder="userName"
                        {...field}
                      />
                    </FormControl>

                    {/* ✅ Username criteria */}
                    <div className="mt-2 text-sm flex items-center gap-2">
                      {isValidLength ? (
                        <CheckCircle2 className="text-green-500" size={18} />
                      ) : (
                        <XCircle className="text-red-500" size={18} />
                      )}
                      <span
                        className={
                          isValidLength ? "text-green-600" : "text-gray-500"
                        }
                      >
                        At least 2 characters
                      </span>
                    </div>

                    <FormMessage/>
                  </FormItem>
                );
              }}
            />

            {/* email */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                const hasError = !!form.formState.errors.email;
                const includesAt = field.value.includes("@");
                const isValid = includesAt && !hasError;

                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className={cn(
                          "rounded-none border transition-colors duration-200",
                          !includesAt
                            ? "border-red-500 bg-red-50"
                            : isValid
                              ? "border-green-500 bg-green-50"
                              : "border-gray-300"
                        )}
                        placeholder="jhon.doe@company.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/*Confirm Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                const password = field.value || "";
                const isMinLength = password.length >= 8;
                const hasUpperCase = /[A-Z]/.test(password);
                const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
                const isValid = isMinLength && hasUpperCase && hasSpecialChar;

                // Helper component inside render
                const Criterion = ({
                  passed,
                  label,
                }: {
                  passed: boolean;
                  label: string;
                }) => (
                  <div className="flex items-center gap-2 text-sm">
                    {passed ? (
                      <CheckCircle2 className="text-green-500" size={18} />
                    ) : (
                      <XCircle className="text-red-500" size={18} />
                    )}
                    <span>{label}</span>
                  </div>
                );

                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Password
                        {...field}
                        className={cn(
                          "rounded-none border transition-colors duration-200",
                          !password || !isValid
                            ? "border-red-500 bg-red-50"
                            : "border-green-500 bg-green-50"
                        )}
                      />
                    </FormControl>

                    <div className="mt-2 space-y-1">
                      <Criterion
                        passed={isMinLength}
                        label="Password must be at least 8 characters"
                      />
                      <Criterion
                        passed={hasUpperCase}
                        label="One uppercase letter"
                      />
                      <Criterion
                        passed={hasSpecialChar}
                        label="One special character"
                      />
                    </div>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* confirm password */}
            <FormField
              control={form.control}
              name="confirmpassword"
              render={({ field }) => {
                const hasError = !!form.formState.errors.confirmpassword;
                const password = form.getValues("password");
                const isValid =
                  field.value === password &&
                  field.value.length >= 6 &&
                  !hasError;
                const isMatch =
                  field.value === password && field.value.length > 0;

                const Criterion = ({
                  passed,
                  label,
                }: {
                  passed: boolean;
                  label: string;
                }) => (
                  <div className="flex items-center gap-2 text-sm mt-1">
                    {passed ? (
                      <CheckCircle2 className="text-green-500" size={18} />
                    ) : (
                      <XCircle className="text-red-500" size={18} />
                    )}
                    {label}
                  </div>
                );

                return (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Password
                        {...field}
                        className={cn(
                          "rounded-none transition-colors duration-200",
                          !field.value ||
                            field.value.length < 6 ||
                            field.value !== password
                            ? "border-red-500 bg-red-50"
                            : isValid
                              ? "border-green-500 bg-green-50"
                              : "border-gray-300"
                        )}
                      />
                    </FormControl>

                    {/* Show live match criteria */}
                    {field.value && (
                      <Criterion
                        passed={isMatch}
                        label="Password and Confirm Password match"
                      />
                    )}

                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button className="w-full rounded-none" type="submit">
              Submit
            </Button>
          </form>
          <div className="grid gap-3">
            <div className="flex items-center">
              <a
                href="#"
                className="ml-auto text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
          </div>
        </Form>
        {/* Form end */}

        <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
          <span className="bg-background text-muted-foreground relative z-10 px-2">
            Or continue with
          </span>
        </div>
        {/* <Button variant="outline" className="w-full">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path
              d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              fill="currentColor"
            />
          </svg>
          Login with GitHub
        </Button> */}
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
}
