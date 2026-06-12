'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { profileApi } from '@/app/api/profile';
import { useAuthStore } from '@/app/store/useAuthStore';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';

interface ProfileModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ProfileModal({ open, onOpenChange }: ProfileModalProps) {
  const { user, updateUserName } = useAuthStore();
  const [name, setName] = useState(user?.name ?? '');
  const [isLoading, setIsLoading] = useState(false);
  const [nameError, setNameError] = useState<string | undefined>();

  useEffect(() => {
    if (open) {
      setName(user?.name ?? '');
      setNameError(undefined);
    }
  }, [open, user?.name]);

  const handleSave = async () => {
    setNameError(undefined);
    if (!name.trim()) {
      setNameError('Nama tidak boleh kosong');
      return;
    }
    try {
      setIsLoading(true);
      const { message, data } = await profileApi.update(name.trim());
      updateUserName(data.name);
      toast.success(message);
      onOpenChange(false);
    } catch (err: any) {
      const apiErr = err?.response?.data;
      if (apiErr?.errors?.name) {
        setNameError(apiErr.errors.name[0]);
      } else {
        toast.error(apiErr?.message || 'Gagal memperbarui profil');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Profil Saya</DialogTitle>
          <DialogDescription>Lihat dan perbarui informasi akun Anda</DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label className="mb-2" htmlFor="profile-username">Username</Label>
            <Input
              id="profile-username"
              value={user?.username ?? ''}
              disabled
              className="bg-muted text-muted-foreground"
            />
            <p className="text-xs text-muted-foreground mt-1">Username tidak dapat diubah</p>
          </div>

          <div>
            <Label className="mb-2" htmlFor="profile-name">Nama *</Label>
            <Input
              id="profile-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={nameError ? 'border-red-500' : ''}
            />
            {nameError && <p className="text-xs text-red-500 mt-1">{nameError}</p>}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
            Batal
          </Button>
          <Button
            onClick={handleSave}
            disabled={isLoading}
            className="bg-jasindo hover:bg-jasindo-dark text-white"
          >
            {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
