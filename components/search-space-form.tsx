"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plus, Search, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Tilt } from "@/components/ui/tilt";
import { Spotlight } from "@/components/ui/spotlight";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface SearchSpaceFormProps {
  onSubmit?: (data: { name: string; description: string }) => void;
  onDelete?: () => void;
  className?: string;
  isEditing?: boolean;
  initialData?: { name: string; description: string };
}

export function SearchSpaceForm({ 
  onSubmit, 
  onDelete,
  className,
  isEditing = false,
  initialData = { name: "", description: "" }
}: SearchSpaceFormProps) {
  const [name, setName] = useState(initialData.name);
  const [description, setDescription] = useState(initialData.description);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSubmit) {
      onSubmit({ name, description });
    }
    // Reset form if not editing
    if (!isEditing) {
      setName("");
      setDescription("");
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24,
      },
    },
  };

  return (
    <motion.div 
      className={cn("space-y-8", className)}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="flex flex-col space-y-2" variants={itemVariants}>
        <h2 className="text-3xl font-bold tracking-tight">
          {isEditing ? "Edit Search Space" : "Create Search Space"}
        </h2>
        <p className="text-muted-foreground">
          {isEditing 
            ? "Update your search space details" 
            : "Create a new search space to organize your documents, chats, and podcasts."}
        </p>
      </motion.div>
      
      <motion.div 
        className="w-full"
        variants={itemVariants}
      >
        <Tilt
          rotationFactor={6}
          isRevese
          springOptions={{
            stiffness: 26.7,
            damping: 4.1,
            mass: 0.2,
          }}
          className="group relative rounded-lg"
        >
          <Spotlight
            className="z-10 from-blue-500/20 via-blue-300/10 to-blue-200/5 blur-2xl"
            size={300}
            springOptions={{
              stiffness: 26.7,
              damping: 4.1,
              mass: 0.2,
            }}
          />
          <div className="flex flex-col p-8 rounded-xl border-2 bg-muted/30 backdrop-blur-sm transition-all hover:border-primary/50 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <span className="p-3 rounded-full bg-blue-100 dark:bg-blue-950/50">
                  <Search className="size-6 text-blue-500" />
                </span>
                <h3 className="text-xl font-semibold">Search Space</h3>
              </div>
              {isEditing && onDelete && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full hover:bg-destructive/90 hover:text-destructive-foreground"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete Search Space</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to delete this search space? This action cannot be undone.
                        All documents, chats, and podcasts in this search space will be permanently deleted.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={onDelete}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
            <p className="text-muted-foreground">
              A search space allows you to organize and search through your documents, 
              generate podcasts, and have AI-powered conversations about your content.
            </p>
          </div>
        </Tilt>
      </motion.div>
      
      <Separator className="my-6" />
      
      <motion.form 
        onSubmit={handleSubmit} 
        className="space-y-6"
        variants={itemVariants}
      >
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="My Search Space"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-11"
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input
              id="description"
              placeholder="A space for my documents and research"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-11"
            />
          </div>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
        >
          <Button type="submit" className="w-full h-11 text-base font-medium">
            <Plus className="mr-2 h-5 w-5" />
            {isEditing ? "Update Search Space" : "Create Search Space"}
          </Button>
        </motion.div>
      </motion.form>
    </motion.div>
  );
}

export default SearchSpaceForm; 