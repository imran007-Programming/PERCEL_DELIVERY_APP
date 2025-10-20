"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
 
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useCreatePercelMutation } from "@/components/Redux/Features/Percel/percel.api";

const FormSchema = z.object({
  recevierName: z.string().min(2, {
    message: "Receiver Name must be at least 2 characters.",
  }),
  recevierEmail: z.string().email({ message: "Invalid email address." }),
  recevierPhone: z.string().min(10, { message: "Phone number is too short." }),
  recevierAddress: z.string().min(5, { message: "Address is too short." }),
  percelType: z.string().min(3, { message: "Parcel type must be provided." }),
  weight: z.object({
    value: z.number().min(0, { message: "Weight must be greater than 0." }),
    unit: z.string().min(1, { message: "Unit must be provided." }),
  }),
  fee: z.number().min(0, { message: "Fee must be a positive value." }),
  estimate_deleivery_date: z
    .date()
    .min(10, { message: "Invalid date format." }),
  pickupAddress: z
    .string()
    .min(5, { message: "Pickup address must be provided." }),
  dispatchLocation: z
    .string()
    .min(5, { message: "Dispatch location must be provided." }),
  currentLocation: z
    .string()
    .min(5, { message: "Current location must be provided." }),
});

export function PercelForm({senderId}:{senderId:string}) {
const [createPercel]=useCreatePercelMutation()



  const form = useForm<z.infer<typeof FormSchema>>({
    
    resolver: zodResolver(FormSchema),
    defaultValues: {
      recevierName: "",
      recevierEmail: "",
      recevierPhone: "",
      recevierAddress: "",
      percelType: "",
      weight: { value: 0, unit: "" },
      fee: 0,
      estimate_deleivery_date: new Date(),
      pickupAddress: "",
      dispatchLocation: "",
      currentLocation: "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const toastId= toast.loading("Loading..")
   try {
     const parceData = {
      ...data,
      weight: {
        value: Number(data.weight.value),
        unit: data.weight.unit,
      },
      fee: Number(data.fee),
     senderInfo: senderId,
    };
    const res= await createPercel(parceData).unwrap()
    form.reset()
   if(res.success){
    toast.success("Percel created successfully",{id:toastId})
   }
   } catch (error) {
    console.log(error)
   }
  }
  /* Prevent previous date  selection */
  const yesterDay = new Date();
  yesterDay.setDate(yesterDay.getDate() - 1);

  return (
    <div className="p-5">
  <Form {...form}>
    <form
      onSubmit={form.handleSubmit(onSubmit)}
      className="grid grid-cols-1 sm:grid-cols-2 gap-6" // responsive grid layout
    >
      {/* Receiver Name */}
      <FormField
        control={form.control}
        name="recevierName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Receiver Name</FormLabel>
            <FormControl>
              <Input
                placeholder="Receiver Name"
                {...field}
                className="rounded-lg border-gray-300 dark:border-gray-600"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Receiver Email */}
      <FormField
        control={form.control}
        name="recevierEmail"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Receiver Email</FormLabel>
            <FormControl>
              <Input
                placeholder="Receiver Email"
                {...field}
                className="rounded-lg border-gray-300 dark:border-gray-600"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Receiver Phone */}
      <FormField
        control={form.control}
        name="recevierPhone"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Receiver Phone</FormLabel>
            <FormControl>
              <Input
                placeholder="Receiver Phone"
                {...field}
                className="rounded-lg border-gray-300 dark:border-gray-600"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Receiver Address */}
      <FormField
        control={form.control}
        name="recevierAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Receiver Address</FormLabel>
            <FormControl>
              <Input
                placeholder="Receiver Address"
                {...field}
                className="rounded-lg border-gray-300 dark:border-gray-600"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Parcel Type */}
      <FormField
        control={form.control}
        name="percelType"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Parcel Type</FormLabel>
            <FormControl>
              <Input
                placeholder="Parcel Type"
                {...field}
                className="rounded-lg border-gray-300 dark:border-gray-600"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Weight Value */}
      <FormField
        control={form.control}
        name="weight.value"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Weight Value</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Weight Value"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className="rounded-lg border-gray-300 dark:border-gray-600"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Weight Unit */}
      <FormField
        control={form.control}
        name="weight.unit"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Weight Unit</FormLabel>
            <FormControl>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select Weight Unit" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="kg">Kg</SelectItem>
                  <SelectItem value="gm">Gm</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Fee */}
      <FormField
        control={form.control}
        name="fee"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Fee</FormLabel>
            <FormControl>
              <Input
                type="number"
                placeholder="Fee"
                {...field}
                onChange={(e) => field.onChange(Number(e.target.value))}
                className="rounded-lg border-gray-300 dark:border-gray-600"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Estimate Delivery Date */}
      <FormField
        control={form.control}
        name="estimate_deleivery_date"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Estimate Delivery Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full text-left font-normal",
                      !field.value && "text-muted-foreground"
                    )}
                  >
                    {field.value ? format(field.value, "PPP") : "Pick a date"}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={new Date(field.value)}
                  onSelect={field.onChange}
                  disabled={(date) => date < yesterDay}
                  captionLayout="dropdown"
                />
              </PopoverContent>
            </Popover>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Pickup Address */}
      <FormField
        control={form.control}
        name="pickupAddress"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Pickup Address</FormLabel>
            <FormControl>
              <Input
                placeholder="Pickup Address"
                {...field}
                className="rounded-lg border-gray-300 dark:border-gray-600"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Dispatch Location */}
      <FormField
        control={form.control}
        name="dispatchLocation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Dispatch Location</FormLabel>
            <FormControl>
              <Input
                placeholder="Dispatch Location"
                {...field}
                className="rounded-lg border-gray-300 dark:border-gray-600"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Current Location */}
      <FormField
        control={form.control}
        name="currentLocation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Current Location</FormLabel>
            <FormControl>
              <Input
                placeholder="Current Location"
                {...field}
                className="rounded-lg border-gray-300 dark:border-gray-600"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      {/* Submit Button (full width) */}
      <div className="sm:col-span-2">
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </div>
    </form>
  </Form>
</div>

  );
}
