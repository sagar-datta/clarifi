"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/app/components/ui/dialog/Dialog";
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
} from "@/app/components/ui/alert-dialog/AlertDialog";
import { Button } from "@/app/components/ui/button/Button";
import { Database, Loader2 } from "lucide-react";
import { useTransactionMutations } from "@/app/lib/hooks/useTransactionMutations";
import { useToast } from "@/app/components/ui/toast/use-toast";

export function DatabaseActionsDialog() {
  const [open, setOpen] = React.useState(false);
  const [isPopulating, setIsPopulating] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const { deleteAllTransactions, seedTransactions } = useTransactionMutations();
  const { toast } = useToast();

  // Reset loading states when dialog closes
  React.useEffect(() => {
    if (!open) {
      setIsPopulating(false);
      setIsDeleting(false);
    }
  }, [open]);

  const handlePopulateData = async () => {
    try {
      setIsPopulating(true);
      await seedTransactions();
      toast({
        title: "Success",
        description: "Sample data has been populated successfully",
      });
      setOpen(false);
    } catch (error) {
      console.error("Failed to populate data:", error);
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to populate data. Please try again.",
        variant: "destructive",
      });
      setIsPopulating(false);
    }
  };

  const handleDeleteAll = async () => {
    try {
      setIsDeleting(true);
      await deleteAllTransactions();
      toast({
        title: "Success",
        description: "All transactions have been deleted",
      });
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description:
          error instanceof Error
            ? error.message
            : "Failed to delete transactions",
        variant: "destructive",
      });
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Database className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Database Actions</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Button
            onClick={handlePopulateData}
            disabled={isPopulating || isDeleting}
            className="w-full"
          >
            {isPopulating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Populating...
              </>
            ) : (
              "Populate Sample Data"
            )}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                className="w-full"
                disabled={isPopulating || isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  "Delete All Transactions"
                )}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete all
                  your transactions from the database.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteAll}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    "Delete All"
                  )}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </DialogContent>
    </Dialog>
  );
}
