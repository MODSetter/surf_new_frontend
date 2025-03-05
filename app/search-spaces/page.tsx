"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import SearchSpaceForm from "@/components/search-space-form";
import { motion } from "framer-motion";

export default function SearchSpacesPage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ name: "", description: "" });

  // In a real app, you would fetch the search space data from an API
  // For demo purposes, we'll simulate editing with local state
  const handleCreateSearchSpace = (data: { name: string; description: string }) => {
    // In a real application, this would make an API call to create the search space
    console.log("Creating search space:", data);
    toast.success(`Search space "${data.name}" created successfully!`, {
      description: "You can now add documents to your search space."
    });
    
    // Simulate editing mode after creation for demo purposes
    setIsEditing(true);
    setEditData(data);
  };

  const handleUpdateSearchSpace = (data: { name: string; description: string }) => {
    // In a real application, this would make an API call to update the search space
    console.log("Updating search space:", data);
    toast.success(`Search space "${data.name}" updated successfully!`);
    setEditData(data);
  };

  const handleDeleteSearchSpace = () => {
    // In a real application, this would make an API call to delete the search space
    console.log("Deleting search space:", editData.name);
    toast.success(`Search space "${editData.name}" deleted successfully!`);
    
    // Navigate back to dashboard after deletion
    router.push("/dashboard");
  };

  return (
    <motion.div 
      className="container mx-auto py-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mx-auto max-w-5xl">
        <SearchSpaceForm 
          onSubmit={isEditing ? handleUpdateSearchSpace : handleCreateSearchSpace}
          onDelete={isEditing ? handleDeleteSearchSpace : undefined}
          isEditing={isEditing}
          initialData={isEditing ? editData : undefined}
        />
      </div>
    </motion.div>
  );
} 