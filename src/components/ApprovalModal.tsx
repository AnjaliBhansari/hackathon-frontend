import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/shadcn/dialog";
import { Button } from "@/components/ui/shadcn/button";

interface ApprovalModalProps {
  open: boolean;
  onClose: () => void;
}

export function ApprovalModal({ open, onClose }: ApprovalModalProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Request Sent for Approval</DialogTitle>
          <DialogDescription>
            Your request to join as a Team Leader has been sent for approval.
            Please try logging in after some time once your request is approved
            by an administrator.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end">
          <Button onClick={onClose}>Close</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
