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
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { useForm } from "react-hook-form";

import z from "zod";

const FormSchema = z.object({
  location: z
    .string()
    .min(6, { message: "Location must be at least 6 characters." }),
  status: z.enum(
    [
      "PENDING",
      "CANCELED",
      "PICKED",
      "IN_TRANSIT",
      "DELIVERED",
      "RETURNED_REQUEST",
    ] as const,
    "Please select a valid status"
  ), // <-- second param is the error message
  note: z.string().min(6, { message: "Note must be at least 6 characters." }),
});

interface IPercelProps {
  onSubmit: (data: {
    location: string;
    status:
      | "PENDING"
      | "CANCELED"
      | "PICKED"
      | "IN_TRANSIT"
      | "DELIVERED"
      | "RETURNED_REQUEST";
    note: string;
  }) => Promise<void>;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
}

export default function PercelUpdateModal({
  onSubmit,
  setShowModal,
  showModal,
}: IPercelProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      location: "",
      status: "PENDING",
      note: "",
    },
  });
  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
          onClick={(e)=>e.stopPropagation()}
            className="p-6  shadow-lg max-w-md w-full rounded-3xl bg-white dark:bg-gray-900"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <h2 className="text-xl text-center mb-4">Update Parcel Status</h2>
            <div className="flex justify-center items-center">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-6"
                >
                  {/* Status */}
                  <FormField
                    control={form.control}
                    name="status"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Status</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="PENDING">PENDING</SelectItem>
                            <SelectItem value="CANCELED">CANCELED</SelectItem>
                            <SelectItem value="PICKED">PICKED</SelectItem>
                            <SelectItem value="IN_TRANSIT">
                              IN_TRANSIT
                            </SelectItem>
                            <SelectItem value="DELIVERED">DELIVERED</SelectItem>
                            <SelectItem value="RETURNED_REQUEST">
                              RETURNED_REQUEST
                            </SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Location */}
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Location" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Note */}
                  <FormField
                    control={form.control}
                    name="note"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Note</FormLabel>
                        <FormControl>
                          <Input placeholder="Add a note here" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="flex justify-end gap-2">
                    <Button type="button" onClick={() => setShowModal(false)}>
                      Close
                    </Button>
                    <Button type="submit">Update Status</Button>
                  </div>
                </form>
              </Form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
