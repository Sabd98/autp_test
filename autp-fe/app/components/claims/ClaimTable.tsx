'use client';

import Link from 'next/link';
import { Edit, Eye, Trash2 } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import { Badge } from '@/app/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/app/components/ui/table';
import { ClaimAUTP } from '@/app/types/claim';

interface ClaimTableProps {
  claims: ClaimAUTP[];
  onEdit: (claim: ClaimAUTP) => void;
  onDelete: (claim: ClaimAUTP) => void;
}

const statusVariants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  Pending: 'secondary',
  Surveyed: 'outline',
  Approved: 'default',
  Rejected: 'destructive',
};

export function ClaimTable({ claims, onEdit, onDelete }: ClaimTableProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('id-ID');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  if (claims.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <p>Tidak ada klaim ditemukan</p>
      </div>
    );
  }

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted">
            <TableHead className="w-12 text-center">No.</TableHead>
            <TableHead>Nama Petani</TableHead>
            <TableHead>No. Sertifikat</TableHead>
            <TableHead>Wilayah</TableHead>
            <TableHead>Penyebab</TableHead>
            <TableHead className="text-right">Luas Gagal (ha)</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Tanggal Klaim</TableHead>
            <TableHead className="text-right">Ganti Rugi</TableHead>
            <TableHead className="w-24">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {claims.map((claim, idx) => (
            <TableRow key={claim.id} className="hover:bg-muted/50">
              <TableCell className="text-center text-sm text-muted-foreground">{idx + 1}</TableCell>
              <TableCell className="font-medium">{claim.farmerName}</TableCell>
              <TableCell className="text-sm">{claim.certificateNumber}</TableCell>
              <TableCell className="text-sm">
                {claim.plotVillage}, {claim.plotDistrict}
              </TableCell>
              <TableCell className="text-sm">{claim.failureCause}</TableCell>
              <TableCell className="text-right text-sm">{claim.failedLandArea.toFixed(2)}</TableCell>
              <TableCell>
                <Badge
                  variant={statusVariants[claim.claimStatus] || 'default'}
                  className="text-xs"
                >
                  {claim.claimStatus}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">{formatDate(claim.submissionDate)}</TableCell>
              <TableCell className="text-right text-sm font-medium">{formatCurrency(claim.compensationAmount)}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    title="Lihat detail"
                    asChild
                  >
                    <Link href={`/dashboard/claims/${claim.id}`}>
                      <Eye size={16} />
                    </Link>
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => onEdit(claim)}
                    title="Edit"
                  >
                    <Edit size={16} />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-destructive hover:text-destructive"
                    onClick={() => onDelete(claim)}
                    title="Hapus"
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
