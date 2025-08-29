import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Password from "@/components/ui/password";
import { useRegisterMutation } from "@/components/Redux/Features/Auth/auth.api";

import { registerSchema } from "@/util/UserVaidationZodSchema/RegisterSchema";
import type z from "zod";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function RegisterForm({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  const [resgister] = useRegisterMutation();
  const navigate = useNavigate();

  const form = useForm<{
    name: string;
    email: string;
    password: string;
    confirmpassword: string;
    phone: string;
    address: string;
    shopName: string;
    role: "SENDER" | "RECEIVER";
  }>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmpassword: "",
      phone: "",
      address: "",
      shopName: "",
      role: "SENDER",
    },
  });

  const UserRole = form.watch("role");

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const userInfo = {
      name: data.name,
      email: data.email,
      password: data.password,
      phone: data.phone,
      address: data.address,
      shopName: data?.role === "SENDER" ? data.shopName : "",
      role: data.role,
    };

  

    try {
      await resgister(userInfo).unwrap();

      toast.success("User created successfully");
      navigate("/login");
    } catch (error) {
   
      const err = error as { data?: { message?: string } };
      if (err?.data?.message === "user already Exist please log in") {
        toast.error("User Already Exist,plz log in");
      }
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center py-3 mt-7">
        <h1 className="text-2xl font-bold">Sign Up Your Account</h1>
      </div>
      <div className="grid gap-8">
        {/* Form start */}
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 ">
            {/* Name */}
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
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

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
                    <FormDescription></FormDescription>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Phone */}
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => {
                const phoneRegex = /^[0-9]{11}$/;
                const isValidPhone = phoneRegex.test(field.value);

                return (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        className={cn(
                          "rounded-none border transition-colors duration-200",
                          !isValidPhone
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        )}
                        placeholder="1234567890"
                        {...field}
                      />
                    </FormControl>
                    <div className="mt-2 text-sm flex items-center gap-2">
                      {isValidPhone ? (
                        <CheckCircle2 className="text-green-500" size={18} />
                      ) : (
                        <XCircle className="text-red-500" size={18} />
                      )}
                      <span
                        className={
                          isValidPhone ? "text-green-600" : "text-gray-500"
                        }
                      >
                        Valid phone number (11 digits)
                      </span>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* Address */}
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => {
                const isValidLength = field.value?.length >= 10;

                return (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input
                        className={cn(
                          "rounded-none border transition-colors duration-200",
                          !isValidLength
                            ? "border-red-500 bg-red-50"
                            : "border-gray-300"
                        )}
                        placeholder="123 Main St, City, Country"
                        {...field}
                      />
                    </FormControl>
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
                        Address must be at least 10 characters
                      </span>
                    </div>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            {/* ROle */}
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ADD Your Role</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="w-auto">
                        <SelectValue placeholder="Select a Role" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="SENDER">SENDER</SelectItem>
                      <SelectItem value="RECEIVER">RECEIVER</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Shop Name */}

            {/* {UserRole === "SENDER" && (
               <FormField
              control={form.control}
              name="shopName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>ShopName</FormLabel>
                    <FormControl>
                      <Input
                        className="rounded-none border transition-colors duration-200"
                        placeholder="Shop Name"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            )}  */}
            <FormField
              control={form.control}
              name="shopName"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel
                      className={cn(
                        "rounded-none  transition-colors duration-200",
                        UserRole === "RECEIVER" ? "hidden" : ""
                      )}
                    >
                      ShopName
                    </FormLabel>
                    <FormControl>
                      <Input
                        className={cn(
                          "rounded-none border transition-colors duration-200",
                          UserRole === "RECEIVER" ? "hidden" : ""
                        )}
                        placeholder="Shop Name"
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

            {/* Confirm Password */}
            <FormField
              control={form.control}
              name="confirmpassword"
              render={({ field }) => {
                const password = form.getValues("password");
                const isValid =
                  field.value === password && field.value.length >= 6;

                return (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Password
                        {...field}
                        className={cn(
                          "rounded-none transition-colors duration-200",
                          !field.value || field.value !== password
                            ? "border-red-500 bg-red-50"
                            : isValid
                            ? "border-green-500 bg-green-50"
                            : "border-gray-300"
                        )}
                      />
                    </FormControl>

                    {field.value && (
                      <div className="flex items-center gap-2 text-sm mt-1">
                        {isValid ? (
                          <CheckCircle2 className="text-green-500" size={18} />
                        ) : (
                          <XCircle className="text-red-500" size={18} />
                        )}
                        Password and Confirm Password must match
                      </div>
                    )}

                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <Button className="w-full rounded-none" type="submit">
              Submit
            </Button>
          </form>

          <div className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link to="/login" className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </Form>
        {/* Form end */}
      </div>
    </div>
  );
}
