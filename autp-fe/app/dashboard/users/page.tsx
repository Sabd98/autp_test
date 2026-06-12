'use client';

import { useState, useEffect, useCallback } from 'react';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import { useUserStore } from '@/app/store/useUserStore';
import { UserFilters } from '@/app/components/users/UserFilters';
import { UserTable } from '@/app/components/users/UserTable';
import { UserForm } from '@/app/components/users/UserForm';
import { UserDeleteDialog } from '@/app/components/users/UserDeleteDialog';
import { Pagination } from '@/app/components/claims/Pagination';
import { UserAUTP } from '@/app/types/user';
import { ApiErrorResponse } from '@/app/types/api';
import axios from 'axios';

export default function UsersPage() {
  const { users, meta, isLoading, fetchUsers, createUser, updateUser, deleteUser, setFilters, filters } = useUserStore();
  const [formOpen, setFormOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserAUTP | null>(null);
  const [deletingUser, setDeletingUser] = useState<UserAUTP | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    fetchUsers(filters);
  }, []);

  const handleAddClick = () => {
    setEditingUser(null);
    setFieldErrors({});
    setFormOpen(true);
  };

  const handleEditClick = (user: UserAUTP) => {
    setEditingUser(user);
    setFieldErrors({});
    setFormOpen(true);
  };

  const handleDeleteClick = (user: UserAUTP) => {
    setDeletingUser(user);
    setDeleteOpen(true);
  };

  const handleFormSubmit = async (data: any) => {
    setFieldErrors({});
    try {
      if (editingUser) {
        const response = await updateUser(editingUser.id, data);
        toast.success(response.message);
        setFormOpen(false);
      } else {
        const response = await createUser(data);
        toast.success(response.message);
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
    if (deletingUser) {
      try {
        const message = await deleteUser(deletingUser.id);
        toast.success(message);
        setDeleteOpen(false);
        setDeletingUser(null);
      } catch (err) {
        const apiErr = err instanceof axios.AxiosError ? (err.response?.data as ApiErrorResponse) : null;
        toast.error(apiErr?.message || 'Terjadi kesalahan saat menghapus');
      }
    }
  };

  const handleSearchChange = useCallback((search: string) => {
    setFilters({ search });
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
          <h1 className="text-3xl font-bold text-foreground">Kelola Pengguna</h1>
          <p className="text-muted-foreground mt-1">Kelola semua pengguna sistem</p>
        </div>
        <Button onClick={handleAddClick} className="gap-2">
          <Plus size={18} />
          Tambah Pengguna
        </Button>
      </div>

      <UserFilters onSearchChange={handleSearchChange} />

      <Card className="p-0">
        <UserTable users={users} onEdit={handleEditClick} onDelete={handleDeleteClick} />
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

      <UserForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        initialData={editingUser || undefined}
        isEdit={!!editingUser}
        fieldErrors={fieldErrors}
      />

      <UserDeleteDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        user={deletingUser}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}
