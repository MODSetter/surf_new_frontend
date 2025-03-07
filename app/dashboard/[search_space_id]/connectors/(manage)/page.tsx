"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Edit, Plus, Search, Trash2, ExternalLink } from "lucide-react";

import { ConnectorService, Connector, getConnectorTypeDisplay } from "@/hooks/use-connectors";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

export default function ConnectorsPage() {
  const router = useRouter();
  const params = useParams();
  const searchSpaceId = params.search_space_id as string;
  
  const [connectors, setConnectors] = useState<Connector[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [connectorToDelete, setConnectorToDelete] = useState<number | null>(null);

  // Fetch connectors on page load
  useEffect(() => {
    const fetchConnectors = async () => {
      try {
        const data = await ConnectorService.getConnectors();
        setConnectors(data);
      } catch (error) {
        console.error("Error fetching connectors:", error);
        toast.error("Failed to load connectors");
      } finally {
        setIsLoading(false);
      }
    };

    fetchConnectors();
  }, []);

  // Handle connector deletion
  const handleDeleteConnector = async () => {
    if (connectorToDelete === null) return;
    
    try {
      await ConnectorService.deleteConnector(connectorToDelete);
      setConnectors(connectors.filter(c => c.id !== connectorToDelete));
      toast.success("Connector deleted successfully");
    } catch (error) {
      console.error("Error deleting connector:", error);
      toast.error("Failed to delete connector");
    } finally {
      setConnectorToDelete(null);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Connectors</h1>
          <p className="text-muted-foreground mt-2">
            Manage your connected services and data sources.
          </p>
        </div>
        <Button onClick={() => router.push(`/dashboard/${searchSpaceId}/connectors/add`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Connector
        </Button>
      </motion.div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>Your Connectors</CardTitle>
          <CardDescription>
            View and manage all your connected services.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="flex justify-center py-8">
              <div className="animate-pulse text-center">
                <div className="h-6 w-32 bg-muted rounded mx-auto mb-2"></div>
                <div className="h-4 w-48 bg-muted rounded mx-auto"></div>
              </div>
            </div>
          ) : connectors.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No connectors found</h3>
              <p className="text-muted-foreground mb-6">
                You haven't added any connectors yet. Add one to enhance your search capabilities.
              </p>
              <Button onClick={() => router.push(`/dashboard/${searchSpaceId}/connectors/add`)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Your First Connector
              </Button>
            </div>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {connectors.map((connector) => (
                    <TableRow key={connector.id}>
                      <TableCell className="font-medium">{connector.name}</TableCell>
                      <TableCell>{getConnectorTypeDisplay(connector.connector_type)}</TableCell>
                      <TableCell>
                        {new Date(connector.created_at).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => router.push(`/dashboard/${searchSpaceId}/connectors/${connector.id}`)}
                          >
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-destructive-foreground hover:bg-destructive/10"
                                onClick={() => setConnectorToDelete(connector.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                                <span className="sr-only">Delete</span>
                              </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                              <AlertDialogHeader>
                                <AlertDialogTitle>Delete Connector</AlertDialogTitle>
                                <AlertDialogDescription>
                                  Are you sure you want to delete this connector? This action cannot be undone.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel onClick={() => setConnectorToDelete(null)}>
                                  Cancel
                                </AlertDialogCancel>
                                <AlertDialogAction
                                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                  onClick={handleDeleteConnector}
                                >
                                  Delete
                                </AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 