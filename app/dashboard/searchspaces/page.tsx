"use client";

import { toast } from "sonner";
import SearchSpaceForm from "@/components/search-space-form";
import { motion } from "framer-motion";

export default function SearchSpacesPage() {
  const handleCreateSearchSpace = (data: { name: string; description: string }) => {
    // In a real application, this would make an API call to create the search space
    console.log("Creating search space:", data);
    toast.success(`Search space "${data.name}" created successfully!`);
  };

  return (
    <motion.div 
      className="container mx-auto py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-5xl">
        <SearchSpaceForm onSubmit={handleCreateSearchSpace} />
      </div>
    </motion.div>
  );
} 