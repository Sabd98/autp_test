"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { ClaimAUTP } from "@/app/types/claim";
import { Spinner } from "../ui/spinner";

interface ClaimDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  claim: ClaimAUTP | null;
  onConfirm: () => void;
  isLoading?: boolean;
}

export function ClaimDeleteDialog({
  open,
  onOpenChange,
  claim,
  onConfirm,
  isLoading,
}: ClaimDeleteDialogProps) {
  if (!claim) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Hapus Klaim</DialogTitle>
          <DialogDescription>
            Apakah Anda yakin ingin menghapus klaim ini? Tindakan ini tidak
            dapat dibatalkan.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-muted p-4 rounded-lg space-y-2">
          <p className="text-sm">
            <span className="font-medium">Nama Petani:</span> {claim.farmerName}
          </p>
          <p className="text-sm">
            <span className="font-medium">No. Sertifikat:</span>{" "}
            {claim.certificateNumber}
          </p>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Spinner data-icon="inline-start" />
                Menghapus...
              </>
            ) : (
              "Hapus"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
