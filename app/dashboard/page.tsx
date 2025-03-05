"use client";

import React, { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Plus, Search, Trash2 } from 'lucide-react'
import { Tilt } from '@/components/ui/tilt'
import { Spotlight } from '@/components/ui/spotlight'
import { Logo } from '@/components/Logo';
import { ThemeTogglerComponent } from '@/components/theme/theme-toggle';
import { toast } from 'sonner';
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
} from '@/components/ui/alert-dialog';

const DashboardPage = () => {
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

  const [searchSpaces, setSearchSpaces] = useState([
    {
      id: 1,
      title: "Research Documents",
      description: "Academic papers and research notes",
      documents: 3,
      createdAt: "2 days ago",
      image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1546&q=80"
    },
    {
      id: 2,
      title: "Company Wiki",
      description: "Internal documentation and resources",
      documents: 12,
      createdAt: "1 week ago",
      image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
    },
    {
      id: 3,
      title: "Project Alpha",
      description: "Project documentation and planning",
      documents: 7,
      createdAt: "3 days ago",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
    }
  ]);

  const handleDeleteSearchSpace = (id: number) => {
    // In a real application, this would make an API call to delete the search space
    setSearchSpaces(searchSpaces.filter(space => space.id !== id));
    toast.success("Search space deleted successfully");
  };

  return (
    <motion.div
      className="container mx-auto py-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div className="flex flex-col space-y-6" variants={itemVariants}>
        <div className="flex flex-row space-x-4 justify-between">
          <div className="flex flex-row space-x-4">
            <Logo className="w-10 h-10 rounded-md" />
            <div className="flex flex-col space-y-2">
              <h1 className="text-4xl font-bold">SurfSense Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome to your SurfSense dashboard.
              </p>
            </div>
          </div>
          <ThemeTogglerComponent />
        </div>

        <div className="flex flex-col space-y-6 mt-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold">Your Search Spaces</h2>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href="/search-spaces">
                <Button className="h-10">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Search Space
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {searchSpaces.map((space) => (
              <motion.div
                key={space.id}
                variants={itemVariants}
                className="aspect-[4/3]"
              >
                <Tilt
                  rotationFactor={6}
                  isRevese
                  springOptions={{
                    stiffness: 26.7,
                    damping: 4.1,
                    mass: 0.2,
                  }}
                  className="group relative rounded-lg h-full"
                >
                  <Spotlight
                    className="z-10 from-blue-500/20 via-blue-300/10 to-blue-200/5 blur-2xl"
                    size={248}
                    springOptions={{
                      stiffness: 26.7,
                      damping: 4.1,
                      mass: 0.2,
                    }}
                  />
                  <div className="flex flex-col h-full overflow-hidden rounded-xl border bg-muted/30 backdrop-blur-sm transition-all hover:border-primary/50">
                    <div className="relative h-32 w-full overflow-hidden">
                      <img
                        src={space.image}
                        alt={space.title}
                        className="h-full w-full object-cover grayscale duration-700 group-hover:grayscale-0"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                      <div className="absolute bottom-2 left-3 flex items-center gap-2">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100/80 dark:bg-blue-950/80">
                          <Search className="h-4 w-4 text-blue-500" />
                        </span>
                      </div>
                      <div className="absolute top-2 right-2">
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              className="h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm hover:bg-destructive/90 hover:text-destructive-foreground"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Delete Search Space</AlertDialogTitle>
                              <AlertDialogDescription>
                                Are you sure you want to delete "{space.title}"? This action cannot be undone.
                                All documents, chats, and podcasts in this search space will be permanently deleted.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction 
                                onClick={() => handleDeleteSearchSpace(space.id)}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                              >
                                Delete
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </div>
                    <div className="flex flex-1 flex-col justify-between p-4">
                      <div>
                        <h3 className="font-medium text-lg">{space.title}</h3>
                        <p className="mt-1 text-sm text-muted-foreground">{space.description}</p>
                      </div>
                      <div className="mt-4 flex justify-between text-xs text-muted-foreground">
                        <span>{space.documents} documents</span>
                        <span>Created {space.createdAt}</span>
                      </div>
                    </div>
                  </div>
                </Tilt>
              </motion.div>
            ))}

            {searchSpaces.length === 0 && (
              <motion.div
                variants={itemVariants}
                className="col-span-full flex flex-col items-center justify-center p-12 text-center"
              >
                <div className="rounded-full bg-muted/50 p-4 mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No search spaces found</h3>
                <p className="text-muted-foreground mb-6">Create your first search space to get started</p>
                <Link href="/search-spaces">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Search Space
                  </Button>
                </Link>
              </motion.div>
            )}

            {searchSpaces.length > 0 && (
              <motion.div 
                variants={itemVariants}
                className="aspect-[4/3]"
              >
                <Tilt
                  rotationFactor={6}
                  isRevese
                  springOptions={{
                    stiffness: 26.7,
                    damping: 4.1,
                    mass: 0.2,
                  }}
                  className="group relative rounded-lg h-full"
                >
                  <Link href="/search-spaces" className="flex h-full">
                    <div className="flex flex-col items-center justify-center h-full w-full rounded-xl border border-dashed bg-muted/10 hover:border-primary/50 transition-colors">
                      <Plus className="h-10 w-10 mb-3 text-muted-foreground" />
                      <span className="text-sm font-medium">Add New Search Space</span>
                    </div>
                  </Link>
                </Tilt>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default DashboardPage