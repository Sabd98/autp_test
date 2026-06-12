'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { useClaimStore } from '@/app/store/useClaimStore';
import { ClaimFilters } from '@/app/components/claims/ClaimFilters';
import { ClaimTable } from '@/app/components/claims/ClaimTable';
import { ClaimForm } from '@/app/components/claims/ClaimForm';
import { ClaimDeleteDialog } from '@/app/components/claims/ClaimDeleteDialog';
import { Pagination } from '@/app/components/claims/Pagination';
import { ClaimAUTP } from '@/app/types/claim';
import { ApiErrorResponse } from '@/app/types/api';
import axios from 'axios';

export default function ClaimsPage() {
  const { claims, meta, isLoading, fetchClaims, createClaim, updateClaim, deleteClaim, setFilters, filters } = useClaimStore();
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingClaim, setEditingClaim] = useState<ClaimAUTP | null>(null);
  const [deletingClaim, setDeletingClaim] = useState<ClaimAUTP | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    fetchClaims(filters);
  }, []);

  const handleAddClick = () => {
    setEditingClaim(null);
    setFieldErrors({});
    setFormOpen(true);
  };

  const handleEditClick = (claim: ClaimAUTP) => {
    setEditingClaim(claim);
    setFieldErrors({});
    setFormOpen(true);
  };

  const handleDeleteClick = (claim: ClaimAUTP) => {
    setDeletingClaim(claim);
    setDeleteOpen(true);
  };

  const handleFormSubmit = async (data: Omit<ClaimAUTP, 'id' | 'submissionDate'> | Partial<ClaimAUTP>) => {
    setFieldErrors({});
    try {
      if (editingClaim) {
        await updateClaim(editingClaim.id, data);
        toast.success('Klaim berhasil diperbarui');
        setFormOpen(false);
      } else {
        await createClaim(data as Omit<ClaimAUTP, 'id'>);
        toast.success('Klaim berhasil ditambahkan');
        setFormOpen(false);
      }
    } catch (err) {
      const apiErr = err instanceof axios.AxiosError ? (err.response?.data as ApiErrorResponse) : null;
      if (apiErr?.errors) {
        setFieldErrors(apiErr.errors);
      } else {
        toast.error(apiErr?.message || 'Terjadi kesalahan');
      }
      throw err;
    }
  };

  const handleDeleteConfirm = async () => {
    if (deletingClaim) {
      try {
        await deleteClaim(deletingClaim.id);
        toast.success('Klaim berhasil dihapus');
        setDeleteOpen(false);
        setDeletingClaim(null);
      } catch (err) {
        const apiErr = err instanceof axios.AxiosError ? (err.response?.data as ApiErrorResponse) : null;
        toast.error(apiErr?.message || 'Terjadi kesalahan saat menghapus');
      }
    }
  };

  const handleReset = useCallback(() => {
    setFilters({ search: '', status: '', cause: '' });
  }, [setFilters]);

  const handleSearchChange = useCallback((search: string) => {
    setFilters({ search });
  }, [setFilters]);

  const handleStatusChange = useCallback((status: string) => {
    setFilters({ status, page: 1 });
  }, [setFilters]);

  const handleCauseChange = useCallback((cause: string) => {
    setFilters({ cause, page: 1 });
  }, [setFilters]);

  const handlePageChange = useCallback((page: number) => {
    setFilters({ page });
  }, [setFilters]);

  const handlePageSizeChange = useCallback((pageSize: number) => {
    setFilters({ pageSize, page: 1 });
  }, [setFilters]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Data Klaim AUTP</h1>
          <p className="text-muted-foreground mt-1">Kelola semua klaim asuransi usaha tani padi</p>
        </div>
        <Button onClick={handleAddClick} className="gap-2">
          <Plus size={18} />
          Tambah Klaim
        </Button>
      </div>

      <ClaimFilters
        onSearchChange={handleSearchChange}
        onStatusChange={handleStatusChange}
        onCauseChange={handleCauseChange}
        onReset={handleReset}
      />

      <Card className="p-0">
        <ClaimTable
          claims={claims}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </Card>

      {meta && meta.totalPages > 0 && (
        <Pagination
          currentPage={meta.page}
          totalPages={meta.totalPages}
          totalCount={meta.total}
          pageSize={meta.pageSize}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
        />
      )}

      <ClaimForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        initialData={editingClaim || undefined}
        isEdit={!!editingClaim}
        fieldErrors={fieldErrors}
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
