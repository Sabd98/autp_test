'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Card } from '@/app/components/ui/card';
import { useClaimStore } from '@/app/store/useClaimStore';
import { claimsApi } from '@/app/api/claims';
import { ClaimTable } from '@/app/components/claims/ClaimTable';
import { ClaimForm } from '@/app/components/claims/ClaimForm';
import { ClaimDeleteDialog } from '@/app/components/claims/ClaimDeleteDialog';
import { ClaimAUTP } from '@/app/types/claim';
import { ApiErrorResponse } from '@/app/types/api';
import axios from 'axios';

export default function ValidationPage() {
  const { updateClaim, deleteClaim } = useClaimStore();
  const [claims, setClaims] = useState<ClaimAUTP[]>([]);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingClaim, setEditingClaim] = useState<ClaimAUTP | null>(null);
  const [deletingClaim, setDeletingClaim] = useState<ClaimAUTP | null>(null);

  useEffect(() => {
    const loadClaims = async () => {
      try {
        const pending = await claimsApi.getAll({ status: 'Pending', pageSize: 1000 });
        const surveyed = await claimsApi.getAll({ status: 'Surveyed', pageSize: 1000 });
        setClaims([...pending.data, ...surveyed.data]);
      } catch (error) {
        console.error('Failed to load claims', error);
      }
    };

    loadClaims();
  }, []);

  const handleEditClick = (claim: ClaimAUTP) => {
    setEditingClaim(claim);
    setFormOpen(true);
  };

  const handleDeleteClick = (claim: ClaimAUTP) => {
    setDeletingClaim(claim);
    setDeleteOpen(true);
  };

  const handleFormSubmit = async (data: Omit<ClaimAUTP, 'id' | 'submissionDate'> | Partial<ClaimAUTP>) => {
    if (editingClaim) {
      try {
        await updateClaim(editingClaim.id, data);
        setClaims(claims.map(c => c.id === editingClaim.id ? { ...c, ...data } : c));
        toast.success('Klaim berhasil diperbarui');
        setFormOpen(false);
        setEditingClaim(null);
      } catch (err) {
        const apiErr = err instanceof axios.AxiosError ? (err.response?.data as ApiErrorResponse) : null;
        toast.error(apiErr?.message || 'Terjadi kesalahan');
      }
    }
  };

  const handleDeleteConfirm = async () => {
    if (deletingClaim) {
      try {
        await deleteClaim(deletingClaim.id);
        setClaims(claims.filter(c => c.id !== deletingClaim.id));
        toast.success('Klaim berhasil dihapus');
        setDeleteOpen(false);
        setDeletingClaim(null);
      } catch (err) {
        const apiErr = err instanceof axios.AxiosError ? (err.response?.data as ApiErrorResponse) : null;
        toast.error(apiErr?.message || 'Terjadi kesalahan saat menghapus');
      }
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
