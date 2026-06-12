"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/app/components/ui/dialog";
import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import { UserAUTP } from "@/app/types/user";
import { Spinner } from "../ui/spinner";

interface UserFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: any) => Promise<void>;
  initialData?: Partial<UserAUTP>;
  isEdit?: boolean;
  fieldErrors?: Record<string, string[]>;
}

export function UserForm({
  open,
  onOpenChange,
  onSubmit,
  initialData,
  isEdit,
  fieldErrors = {},
}: UserFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<any>({
    username: "",
    name: "",
    password: "",
    password_confirmation: "",
    ...initialData,
  });

  useEffect(() => {
    if (initialData) {
      setFormData((prev: any) => ({
        ...prev,
        ...initialData,
        password: "",
        password_confirmation: "",
      }));
    }
  }, [initialData]);

  const getFieldError = (fieldName: string): string | undefined => {
    const errors = fieldErrors[fieldName];
    return errors?.[0];
  };

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const submitData = { ...formData };
      if (isEdit && !submitData.password) {
        delete submitData.password;
        delete submitData.password_confirmation;
      }
      await onSubmit(submitData);
      setFormData({
        username: "",
        name: "",
        password: "",
        password_confirmation: "",
      });
      onOpenChange(false);
    } catch (error) {
      // Error handling done in parent
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {isEdit ? "Edit Pengguna" : "Tambah Pengguna Baru"}
          </DialogTitle>
          <DialogDescription>
            {isEdit
              ? "Ubah informasi pengguna"
              : "Isi formulir untuk membuat pengguna baru"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <Label className="mb-2" htmlFor="username">
              Username *
            </Label>
            <Input
              id="username"
              value={formData.username || ""}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
              className={getFieldError("username") ? "border-red-500" : ""}
            />
            {getFieldError("username") && (
              <p className="text-xs text-red-500 mt-1">
                {getFieldError("username")}
              </p>
            )}
          </div>

          <div>
            <Label className="mb-2" htmlFor="name">
              Nama *
            </Label>
            <Input
              id="name"
              value={formData.name || ""}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className={getFieldError("name") ? "border-red-500" : ""}
            />
            {getFieldError("name") && (
              <p className="text-xs text-red-500 mt-1">
                {getFieldError("name")}
              </p>
            )}
          </div>

          <div>
            <Label className="mb-2" htmlFor="password">
              {isEdit
                ? "Password (Kosongkan jika tidak ingin mengubah)"
                : "Password"}{" "}
              *
            </Label>
            <Input
              id="password"
              type="password"
              value={formData.password || ""}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              className={getFieldError("password") ? "border-red-500" : ""}
            />
            {getFieldError("password") && (
              <p className="text-xs text-red-500 mt-1">
                {getFieldError("password")}
              </p>
            )}
          </div>

          <div>
            <Label className="mb-2" htmlFor="password_confirmation">
              Konfirmasi Password *
            </Label>
            <Input
              id="password_confirmation"
              type="password"
              value={formData.password_confirmation || ""}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  password_confirmation: e.target.value,
                })
              }
              className={
                getFieldError("password_confirmation") ? "border-red-500" : ""
              }
            />
            {getFieldError("password_confirmation") && (
              <p className="text-xs text-red-500 mt-1">
                {getFieldError("password_confirmation")}
              </p>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Batal
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? (
              <>
                <Spinner data-icon="inline-start" />
                Memproses...
              </>
            ) : isEdit ? (
              "Simpan Perubahan"
            ) : (
              "Buat Pengguna"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
