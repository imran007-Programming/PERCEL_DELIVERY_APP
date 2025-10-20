import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { cn } from "@/lib/utils";

import {
  Form,
  FormControl,

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
  

  <div className="grid gap-8">
    {/* Form start */}
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        
        {/* === Row 1: Name & Email === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Username */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              const hasError = !!form.formState.errors.name;
              const isFilled = field.value && !hasError;
             
              return (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      className={cn(
                        "rounded-md border transition-colors duration-200",
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
                        "rounded-md border transition-colors duration-200",
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
        </div>

        {/* === Row 2: Phone & Address === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                        "rounded-md border transition-colors duration-200",
                        !isValidPhone
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      )}
                      placeholder="1234567890"
                      {...field}
                    />
                  </FormControl>
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
                        "rounded-md border transition-colors duration-200",
                        !isValidLength
                          ? "border-red-500 bg-red-50"
                          : "border-gray-300"
                      )}
                      placeholder="123 Main St, City, Country"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </div>

        {/* === Row 3: Role & Shop Name === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Role */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="rounded-md border">
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

          {/* Shop Name (visible only if SENDER) */}
          <FormField
            control={form.control}
            name="shopName"
            render={({ field }) => (
              <FormItem>
                <FormLabel
                  className={cn(
                    UserRole === "RECEIVER" && "hidden"
                  )}
                >
                  Shop Name
                </FormLabel>
                <FormControl>
                  <Input
                    className={cn(
                      "rounded-md border transition-colors duration-200",
                      UserRole === "RECEIVER" && "hidden"
                    )}
                    placeholder="Shop Name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* === Row 4: Password & Confirm Password === */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Password {...field} className="rounded-md border" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Confirm Password */}
          <FormField
            control={form.control}
            name="confirmpassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Password {...field} className="rounded-md border" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {/* === Submit Button === */}
        <Button className="w-full rounded-md mt-4" type="submit">
          Sign Up
        </Button>

        {/* === Login Link === */}
        <div className="text-center text-sm mt-4">
          Already have an account?{" "}
          <Link to="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
      </form>
    </Form>
    {/* Form end */}
  </div>
</div>

  );
}
