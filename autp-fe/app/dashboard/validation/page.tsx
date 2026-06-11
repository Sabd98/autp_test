'use client';

import { useState, useMemo } from 'react';
import { Card } from '@/app/components/ui/card';
import { useClaimStore } from '@/app/store/useClaimStore';
import { ClaimTable } from '@/app/components/claims/ClaimTable';
import { ClaimForm } from '@/app/components/claims/ClaimForm';
import { ClaimDeleteDialog } from '@/app/components/claims/ClaimDeleteDialog';
import { ClaimAUTP } from '@/app/types/claim';

export default function ValidationPage() {
  const updateClaim = useClaimStore((state) => state.updateClaim);
  const deleteClaim = useClaimStore((state) => state.deleteClaim);
  const allClaims = useClaimStore((state) => state.claims);

  const claims = useMemo(
    () => allClaims.filter(
      (c) => c.claimStatus === 'Pending' || c.claimStatus === 'Surveyed'
    ),
    [allClaims]
  );

  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingClaim, setEditingClaim] = useState<ClaimAUTP | null>(null);
  const [deletingClaim, setDeletingClaim] = useState<ClaimAUTP | null>(null);

  const handleEditClick = (claim: ClaimAUTP) => {
    setEditingClaim(claim);
    setFormOpen(true);
  };

  const handleDeleteClick = (claim: ClaimAUTP) => {
    setDeletingClaim(claim);
    setDeleteOpen(true);
  };

  const handleFormSubmit = (data: Omit<ClaimAUTP, 'id' | 'submissionDate'> | Partial<ClaimAUTP>) => {
    if (editingClaim) {
      updateClaim(editingClaim.id, data);
      setFormOpen(false);
      setEditingClaim(null);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingClaim) {
      deleteClaim(deletingClaim.id);
      setDeleteOpen(false);
      setDeletingClaim(null);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Validasi Klaim</h1>
        <p className="text-muted-foreground mt-1">
          Proses validasi klaim yang masih dalam status Pending atau Surveyed
        </p>
      </div>

      {claims.length === 0 ? (
        <Card>
          <div className="p-12 text-center text-muted-foreground">
            <p>Tidak ada klaim yang memerlukan validasi</p>
          </div>
        </Card>
      ) : (
        <>
          <div className="text-sm text-muted-foreground p-4 bg-blue-50 border max-w-[18vw] border-blue-200 rounded-lg">
            <p>
              <span className="font-medium">Total klaim untuk validasi:</span> {claims.length} klaim
            </p>
          </div>

          <Card className="p-0">
            <ClaimTable
              claims={claims}
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
            />
          </Card>
        </>
      )}

      <ClaimForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        initialData={editingClaim || undefined}
        isEdit={!!editingClaim}
      />

      <ClaimDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        claim={deletingClaim}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
