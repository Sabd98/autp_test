'use client';

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { ClaimAUTP } from '@/app/types/claim';

interface ClaimValidationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  claim: ClaimAUTP | null;
  type: 'approve' | 'reject';
  onConfirm: () => void;
  isLoading?: boolean;
}

export function ClaimValidationDialog({ open, onOpenChange, claim, type, onConfirm, isLoading }: ClaimValidationDialogProps) {
  if (!claim) return null;

  const isApprove = type === 'approve';
  const title = isApprove ? 'Setujui Klaim' : 'Tolak Klaim';
  const message = isApprove ? 'Apakah Anda yakin ingin menyetujui klaim ini?' : 'Apakah Anda yakin ingin menolak klaim ini?';
  const buttonText = isApprove ? 'Setujui' : 'Tolak';
  const buttonVariant = isApprove ? 'default' : 'destructive' as const;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{message}</DialogDescription>
        </DialogHeader>

        <div className="bg-muted p-4 rounded-lg space-y-2">
          <p className="text-sm">
            <span className="font-medium">Nama Petani:</span> {claim.farmerName}
          </p>
          <p className="text-sm">
            <span className="font-medium">No. Sertifikat:</span> {claim.certificateNumber}
          </p>
          <p className="text-sm">
            <span className="font-medium">Status Klaim:</span> {claim.claimStatus}
          </p>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Batal
          </Button>
          <Button variant={buttonVariant} onClick={onConfirm} disabled={isLoading}>
            {isLoading ? (isApprove ? 'Menyetujui...' : 'Menolak...') : buttonText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
