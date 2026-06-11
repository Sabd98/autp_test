'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { useClaimStore } from '@/app/store/useClaimStore';
import { useClaimFilter } from '@/app/hooks/useClaimFilter';
import { ClaimFilters } from '@/app/components/claims/ClaimFilters';
import { ClaimTable } from '@/app/components/claims/ClaimTable';
import { ClaimForm } from '@/app/components/claims/ClaimForm';
import { ClaimDeleteDialog } from '@/app/components/claims/ClaimDeleteDialog';
import { Pagination } from '@/app/components/claims/Pagination';
import { ClaimAUTP } from '@/app/types/claim';

export default function ClaimsPage() {
  const { addClaim, updateClaim, deleteClaim } = useClaimStore();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [cause, setCause] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingClaim, setEditingClaim] = useState<ClaimAUTP | null>(null);
  const [deletingClaim, setDeletingClaim] = useState<ClaimAUTP | null>(null);

  const { paginatedClaims, totalCount, totalPages } = useClaimFilter({
    search,
    status,
    cause,
    page,
    pageSize,
  });

  const handleAddClick = () => {
    setEditingClaim(null);
    setFormOpen(true);
  };

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
    } else {
      addClaim(data as Omit<ClaimAUTP, 'id' | 'submissionDate'>);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingClaim) {
      deleteClaim(deletingClaim.id);
      setDeleteOpen(false);
      setDeletingClaim(null);
    }
  };

  const handleReset = () => {
    setSearch('');
    setStatus('');
    setCause('');
    setPage(1);
  };

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
        onSearchChange={setSearch}
        onStatusChange={(val) => {
          setStatus(val);
          setPage(1);
        }}
        onCauseChange={(val) => {
          setCause(val);
          setPage(1);
        }}
        onReset={handleReset}
      />

      <Card className="p-0">
        <ClaimTable
          claims={paginatedClaims}
          onEdit={handleEditClick}
          onDelete={handleDeleteClick}
        />
      </Card>

      {totalPages > 0 && (
        <Pagination
          currentPage={page}
          totalPages={totalPages}
          totalCount={totalCount}
          pageSize={pageSize}
          onPageChange={setPage}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setPage(1);
          }}
        />
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
