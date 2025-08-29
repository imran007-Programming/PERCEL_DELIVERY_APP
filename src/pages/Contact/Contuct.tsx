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
import { Textarea } from "@/components/ui/textarea"; 

import { useForm } from "react-hook-form";

// Import motion from framer-motion
import { motion } from "framer-motion";

export default function Contact() {
  const form = useForm({
    defaultValues: {
      username: "",
      address: "",
      mobilenumber: "",
      message: "",
    },
  });

  function onSubmit(data: {
    username: string;
    address: string;
    mobilenumber: string;
    message: string;
  }) {

  }

  return (
    <div className="container mx-auto">
      <motion.div 
        className="contact-page mt-25 grid grid-cols-1 sm:grid-cols-3 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="col-span-1 sm:block hidden"></div>

        {/* Contact Form */}
        <motion.div 
          className="col-span-1 sm:col-span-1 space-y-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl">Contact Us</h1>
          <h2>Send your message</h2>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Username Field */}
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Address Field */}
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Mobile Number Field */}
              <FormField
                control={form.control}
                name="mobilenumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your mobile number"
                        type="tel"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Message Field */}
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Message</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your message" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit">Send Message</Button>
            </form>
          </Form>
        </motion.div>

        {/* Contact Info */}
        <motion.div 
          className="flex flex-col justify-start sm:col-span-1"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col mt-30"> 
            <div></div>
            <div className="m-5 space-y-6">
              <h2 className="text-4xl">Address</h2>
              <div className="font-sm">
                <p>123 Parcel Street, Delivery City, DC 12345</p>
                <p>Phone:+8801647153126</p>
                <p>Email: support@parcelservice.com</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
