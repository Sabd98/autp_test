'use client';

import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Edit } from 'lucide-react';
import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Button } from '@/app/components/ui/button';
import { Card, CardContent } from '@/app/components/ui/card';
import { Badge } from '@/app/components/ui/badge';
import { Separator } from '@/app/components/ui/separator';
import { useClaimStore } from '@/app/store/useClaimStore';
import { claimsApi } from '@/app/api/claims';
import { ClaimForm } from '@/app/components/claims/ClaimForm';
import { ClaimAUTP } from '@/app/types/claim';
import { ApiErrorResponse } from '@/app/types/api';
import axios from 'axios';
import { Spinner } from '@/app/components/ui/spinner';

const statusVariants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  Pending: 'secondary',
  Surveyed: 'outline',
  Approved: 'default',
  Rejected: 'destructive',
};

export default function ClaimDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = Number(params.id as string);
  const { updateClaim } = useClaimStore();
  const [claim, setClaim] = useState<ClaimAUTP | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    const loadClaim = async () => {
      try {
        const data = await claimsApi.getById(id);
        setClaim(data);
      } catch (error) {
        console.error('Failed to load claim', error);
        toast.error('Klaim tidak ditemukan');
        router.push('/dashboard/claims');
      } finally {
        setIsLoading(false);
      }
    };

    loadClaim();
  }, [id, router]);

  if (isLoading) {
    return (
      <div className="space-y-6">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft size={16} className="mr-2" /> Kembali
        </Button>
        <div className="text-center py-12 text-muted-foreground">
          <Spinner data-icon="inline" className="mx-auto mb-4" />
        </div>
      </div>
    );
  }

  if (!claim) {
    return (
      <div className="space-y-6">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft size={16} className="mr-2" /> Kembali
        </Button>
        <div className="text-center py-12 text-muted-foreground">
          <p>Klaim tidak ditemukan</p>
        </div>
      </div>
    );
  }

  const formatDate = (dateStr: string | undefined) => {
    if (!dateStr) return '-';
    return new Date(dateStr).toLocaleDateString('id-ID');
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const handleFormSubmit = async (data: Omit<ClaimAUTP, 'id' | 'submissionDate'> | Partial<ClaimAUTP>) => {
    try {
      const response = await updateClaim(id, data);
      setClaim(response.data);
      toast.success(response.message);
      setFormOpen(false);
    } catch (err) {
      const apiErr = err instanceof axios.AxiosError ? (err.response?.data as ApiErrorResponse) : null;
      if (apiErr?.errors) {
        Object.entries(apiErr.errors).forEach(([field, msgs]) => {
          toast.error(`${field}: ${msgs[0]}`);
        });
      } else {
        toast.error(apiErr?.message || 'Terjadi kesalahan');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" size="sm" onClick={() => router.back()}>
          <ArrowLeft size={16} className="mr-2" /> Kembali
        </Button>
        <Button onClick={() => setFormOpen(true)} className="gap-2">
          <Edit size={16} /> Edit
        </Button>
      </div>

      <Card>
        <CardContent className="pt-1 space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-foreground">{claim.farmerName}</h2>
              <Badge
                variant={statusVariants[claim.claimStatus] || 'default'}
                className="text-sm px-3 py-1"
              >
                {claim.claimStatus}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground">No. Sertifikat: {claim.certificateNumber}</p>
          </div>

          <Separator />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-sm mb-4 text-foreground">Data Petani</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Nama Petani</p>
                  <p className="font-medium">{claim.farmerName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">NIK</p>
                  <p className="font-medium">{claim.farmerNIK}</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-sm mb-4 text-foreground">Data Polis</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-muted-foreground">Nomor Sertifikat</p>
                  <p className="font-medium">{claim.certificateNumber}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Musim Tanam</p>
                  <p className="font-medium">{claim.plantingPeriod}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-sm mb-4 text-foreground">Informasi Lokasi Lahan</h3>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <p className="text-muted-foreground">Desa/Kelurahan</p>
                  <p className="font-medium">{claim.plotVillage}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Kecamatan</p>
                  <p className="font-medium">{claim.plotDistrict}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Kabupaten/Kota</p>
                  <p className="font-medium">{claim.plotRegency}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-sm mb-4 text-foreground">Informasi Klaim</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
              <div>
                <p className="text-muted-foreground">Luas Diasuransikan</p>
                <p className="font-medium">{claim.totalInsuredArea.toFixed(2)} ha</p>
              </div>
              <div>
                <p className="text-muted-foreground">Luas Gagal Panen</p>
                <p className="font-medium">{claim.failedLandArea.toFixed(2)} ha</p>
              </div>
              <div>
                <p className="text-muted-foreground">Penyebab Kegagalan</p>
                <p className="font-medium">{claim.failureCause}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Tanggal Pengajuan</p>
                <p className="font-medium">{formatDate(claim.submissionDate)}</p>
              </div>
            </div>
          </div>

          {(claim.claimStatus === 'Surveyed' || claim.claimStatus === 'Approved' || claim.claimStatus === 'Rejected') && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold text-sm mb-4 text-foreground">Hasil Survey</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <p className="text-muted-foreground">Nama Surveyor</p>
                    <p className="font-medium">{claim.surveyorName || '-'}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Tanggal Survey</p>
                    <p className="font-medium">{formatDate(claim.surveyDate)}</p>
                  </div>
                </div>
                {claim.surveyNotes && (
                  <div className="mt-4">
                    <p className="text-muted-foreground text-sm">Catatan Survey</p>
                    <p className="font-medium text-sm mt-2 p-3 bg-muted rounded">{claim.surveyNotes}</p>
                  </div>
                )}
              </div>
            </>
          )}

          <Separator />

          <div>
            <h3 className="font-semibold text-sm mb-4 text-foreground">Informasi Keuangan</h3>
            <div className="text-sm">
              <p className="text-muted-foreground">Jumlah Ganti Rugi</p>
              <p className="font-bold text-lg text-primary">{formatCurrency(claim.compensationAmount)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <ClaimForm
        open={formOpen}
        onOpenChange={setFormOpen}
        onSubmit={handleFormSubmit}
        initialData={claim}
        isEdit={true}
      />
    </div>
  );
}
