import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"; // shadcn Tabs
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { ThreeDot } from "react-loading-indicators";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";
import Password from "@/components/ui/password";
import { toast } from "sonner";
import { useLoginMutation } from "@/components/Redux/Features/Auth/auth.api";
import { loginSchema } from "@/util/UserVaidationZodSchema/LoginSchema";
import { role } from "@/Constant/role";

export function LoginForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const navigate = useNavigate();
  const [login, {isLoading}] = useLoginMutation();
  const [message, setMessage] = useState("");
  const [tab, setTab] = useState("user");

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Auto fill for admin login
  const handleTabChange = (value: string) => {
    setTab(value);
    if (value === "admin") {
      form.setValue("email", "admin@gmail.com");
      form.setValue("password", "1234567A@");
    } else {
      form.reset({
        email: "",
        password: "",
      });
    }
  };

  /* submit handler */
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    const userInfo = {
      email: data.email,
      password: data.password,
    };
    try {
      const result = await login(userInfo).unwrap();
      
      const userRole = result?.data?.user?.role;

      if (userRole === role.ADMIN) {
        navigate("/admin/analytics");
      } else if (userRole === role.SENDER) {
        navigate("/sender/createPercel");
      } else if (userRole === role.RECEIVER) {
        navigate("/receiver/dashboard");
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
      } else if (err?.data?.message === "user is blocked") {
        toast.error("You are blocked by admin");
      } else if (
        err?.data?.message ===
        "Account was auto-created. Please complete registration first."
      ) {
        setMessage("Plz register before you login");
        toast.error("Plz register before you login");
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center py-3">
        <h1 className="text-2xl font-bold">Login to your account</h1>
      </div>

      {/* Tabs for User / Admin */}
      <Tabs value={tab} onValueChange={handleTabChange} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-4">
          <TabsTrigger value="user">User Login</TabsTrigger>
          <TabsTrigger value="admin">Admin Login</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="grid gap-8 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
            {/* Email */}
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

            <Button
              className="w-full rounded-none"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex justify-between items-center gap-x-3">
                  <span>submit</span>
                <ThreeDot color="white" size="small" text="" textColor="" />
                </div>
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to="/register" className="underline underline-offset-4">
            signUp
          </Link>
        </div>
      </div>
    </div>
  );
}
