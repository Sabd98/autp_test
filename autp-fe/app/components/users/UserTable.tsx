'use client';

import { Edit, Trash2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { UserAUTP } from '@/app/types/user';

interface UserTableProps {
  users: UserAUTP[];
  onEdit?: (user: UserAUTP) => void;
  onDelete?: (user: UserAUTP) => void;
}

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID');
  };

  if (users.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Tidak ada pengguna ditemukan</p>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead className="w-12 text-center">No.</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Tanggal Dibuat</TableHead>
            <TableHead className="w-24">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user, idx) => (
            <TableRow key={user.id} className="hover:bg-muted/50">
              <TableCell className="text-center text-sm text-muted-foreground">{idx + 1}</TableCell>
              <TableCell className="font-medium">{user.username}</TableCell>
              <TableCell className="text-sm">{user.name}</TableCell>
              <TableCell className="text-sm">{formatDate(user.createdAt)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {onEdit && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onEdit(user)}
                      title="Edit"
                    >
                      <Edit size={16} />
                    </Button>
                  )}
                  {onDelete && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-destructive hover:text-destructive"
                      onClick={() => onDelete(user)}
                      title="Hapus"
                    >
                      <Trash2 size={16} />
                    </Button>
                  )}
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
