'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Card } from '@/app/components/ui/card';
import { useClaimStore } from '@/app/store/useClaimStore';
import { claimsApi } from '@/app/api/claims';
import { ClaimTable } from '@/app/components/claims/ClaimTable';
import { ClaimValidationDialog } from '@/app/components/claims/ClaimValidationDialog';
import { ClaimAUTP } from '@/app/types/claim';
import { ApiErrorResponse } from '@/app/types/api';
import axios from 'axios';

export default function ValidationPage() {
  const { updateClaim } = useClaimStore();
  const [claims, setClaims] = useState<ClaimAUTP[]>([]);
  const [validatingClaim, setValidatingClaim] = useState<ClaimAUTP | null>(null);
  const [validationAction, setValidationAction] = useState<'approve' | 'reject' | null>(null);
  const [validationOpen, setValidationOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleApproveClick = (claim: ClaimAUTP) => {
    setValidatingClaim(claim);
    setValidationAction('approve');
    setValidationOpen(true);
  };

  const handleRejectClick = (claim: ClaimAUTP) => {
    setValidatingClaim(claim);
    setValidationAction('reject');
    setValidationOpen(true);
  };

  const handleValidationConfirm = async () => {
    if (!validatingClaim || !validationAction) return;

    try {
      setIsLoading(true);
      const newStatus = validationAction === 'approve' ? 'Approved' : 'Rejected';
      await updateClaim(validatingClaim.id, { claimStatus: newStatus });
      setClaims(claims.filter(c => c.id !== validatingClaim.id));
      toast.success(`Klaim berhasil ${validationAction === 'approve' ? 'disetujui' : 'ditolak'}`);
      setValidationOpen(false);
      setValidatingClaim(null);
      setValidationAction(null);
    } catch (err) {
      const apiErr = err instanceof axios.AxiosError ? (err.response?.data as ApiErrorResponse) : null;
      toast.error(apiErr?.message || 'Terjadi kesalahan');
    } finally {
      setIsLoading(false);
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
              onApprove={handleApproveClick}
              onReject={handleRejectClick}
            />
          </Card>
        </>
      )}

      <ClaimValidationDialog
        open={validationOpen}
        onOpenChange={setValidationOpen}
        claim={validatingClaim}
        type={validationAction || 'approve'}
        onConfirm={handleValidationConfirm}
        isLoading={isLoading}
      />
    </div>
  );
}
