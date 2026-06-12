'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import axios from 'axios';
import { profileApi } from '@/app/api/profile';
import { ApiErrorResponse } from '@/app/types/api';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

interface ResetPasswordModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface FormState {
  currentPassword: string;
  newPassword: string;
  newPassword_confirmation: string;
}

const EMPTY_FORM: FormState = {
  currentPassword: '',
  newPassword: '',
  newPassword_confirmation: '',
};

export function ResetPasswordModal({ open, onOpenChange }: ResetPasswordModalProps) {
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (open) {
      setForm(EMPTY_FORM);
      setFieldErrors({});
    }
  }, [open]);

  const getError = (field: string) => fieldErrors[field]?.[0];

  const handleSubmit = async () => {
    setFieldErrors({});
    try {
      setIsLoading(true);
      await profileApi.resetPassword(
        form.currentPassword,
        form.newPassword,
        form.newPassword_confirmation
      );
      toast.success('Password berhasil diubah');
      onOpenChange(false);
    } catch (err) {
      const apiErr = err instanceof axios.AxiosError
        ? (err.response?.data as ApiErrorResponse)
        : null;
      if (apiErr?.errors) {
        setFieldErrors(apiErr.errors);
      } else {
        toast.error(apiErr?.message || 'Gagal mengubah password');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const setField = (field: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>Ubah password akun Anda</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label className="mb-2" htmlFor="current-password">Password Saat Ini *</Label>
            <Input
              id="current-password"
              type="password"
              value={form.currentPassword}
              onChange={setField('currentPassword')}
              className={getError('currentPassword') ? 'border-red-500' : ''}
            />
            {getError('currentPassword') && (
              <p className="text-xs text-red-500 mt-1">{getError('currentPassword')}</p>
            )}
          </div>

          <div>
            <Label className="mb-2" htmlFor="new-password">Password Baru *</Label>
            <Input
              id="new-password"
              type="password"
              value={form.newPassword}
              onChange={setField('newPassword')}
              className={getError('newPassword') ? 'border-red-500' : ''}
            />
            {getError('newPassword') && (
              <p className="text-xs text-red-500 mt-1">{getError('newPassword')}</p>
            )}
          </div>

          <div>
            <Label className="mb-2" htmlFor="confirm-password">Konfirmasi Password Baru *</Label>
            <Input
              id="confirm-password"
              type="password"
              value={form.newPassword_confirmation}
              onChange={setField('newPassword_confirmation')}
              className={getError('newPassword_confirmation') ? 'border-red-500' : ''}
            />
            {getError('newPassword_confirmation') && (
              <p className="text-xs text-red-500 mt-1">{getError('newPassword_confirmation')}</p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Batal
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-jasindo hover:bg-jasindo-dark text-white"
          >
            {isLoading ? 'Memproses...' : 'Ubah Password'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
