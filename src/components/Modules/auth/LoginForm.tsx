import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
// import Password from "../../ui/password";

import { CheckCircle2, XCircle } from "lucide-react";

import { useState } from "react";
import Password from "@/components/ui/password";

import { toast } from "sonner";
// import config from "@/config";
import {
  useLoginMutation,

} from "@/components/Redux/Features/Auth/auth.api";
import { loginSchema } from "@/util/UserVaidationZodSchema/LoginSchema";
import { role } from "@/Constant/role";
export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const [login] = useLoginMutation();
 

  const [message, setMessage] = useState("");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  /* submit handler */
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      const result = await login(userInfo).unwrap();
      
      const userRole = result?.data?.user?.role;

      if ( userRole === role.ADMIN) {
        navigate("/admin/analytics");
      } else if (userRole === role.SENDER) {
        navigate("/sender/createPercel");
      } else if (userRole === role.RECEIVER) {
        navigate("/receiver/getpercelinfo");
      } else {
        toast.error("Invalid role or unauthorized access.");
        navigate("/unauthorized");
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string }; status?: number };
      console.log(err);

      if (err?.data?.message === "User is not verified") {
        toast.error("Your account is not verified.");
      } else if (err?.data?.message === "Invalid email and password") {
        setMessage("Invalid email and password");
      }
      else if(err?.data?.message === "Account was auto-created. Please complete registration first.") {
        setMessage("Plz register before you login");
        toast.error("Plz register before you login")
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center py-3">
        <h1 className="text-2xl font-bold">Login to your account</h1>
      </div>
      <div className="grid gap-8 ">
        {/* Form  start*/}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
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

            {/* Password */}
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
            <small className="text-red-700"> {message}</small>

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
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <Link to="/register" className="underline underline-offset-4">
          signUp
        </Link>
      </div>
    </div>
  );
}
