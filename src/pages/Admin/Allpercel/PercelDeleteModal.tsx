import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface DeleteProps {
  showConfirmModal: boolean; 
  handleDelete: () => void;
  handleCancelDelete: () => void;
}

export default function PercelDeleteModal({
  showConfirmModal,
  handleDelete,
  handleCancelDelete,
}: DeleteProps) {
  return (
    <AnimatePresence>
      {showConfirmModal && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCancelDelete} // click outside to close
        >
          <motion.div
            className="p-6 rounded shadow-lg max-w-md w-full bg-white dark:bg-gray-900"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()} // prevent closing when clicking inside
          >
            <h2 className="text-xl text-center mb-4">
              Are you sure you want to delete this parcel?
            </h2>
            <div className="flex justify-center space-x-4">
              <Button onClick={handleDelete} className="bg-red-500 text-white">
                Yes
              </Button>
              <Button
                onClick={handleCancelDelete}
                className="bg-gray-500 text-white"
              >
                No
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
