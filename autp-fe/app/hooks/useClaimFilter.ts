import { useMemo } from 'react';
import { ClaimAUTP } from '@/app/types/claim';
import { useClaimStore } from '@/app/store/useClaimStore';

interface FilterParams {
  search: string;
  status: string;
  cause: string;
  page: number;
  pageSize: number;
}

interface FilterResult {
  paginatedClaims: ClaimAUTP[];
  totalCount: number;
  totalPages: number;
}

export function useClaimFilter(params: FilterParams): FilterResult {
  const claims = useClaimStore((state) => state.claims);

  return useMemo(() => {
    const filtered = claims.filter((claim) => {
      const searchLower = params.search.toLowerCase();

      const matchesSearch =
        !params.search ||
        claim.farmerName.toLowerCase().includes(searchLower) ||
        claim.certificateNumber.toLowerCase().includes(searchLower) ||
        claim.farmerNIK.includes(searchLower);

      const matchesStatus = !params.status || claim.claimStatus === params.status;
      const matchesCause = !params.cause || claim.failureCause === params.cause;

      return matchesSearch && matchesStatus && matchesCause;
    });

    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / params.pageSize);
    const startIndex = (params.page - 1) * params.pageSize;
    const paginatedClaims = filtered.slice(
      startIndex,
      startIndex + params.pageSize
    );

    return {
      paginatedClaims,
      totalCount,
      totalPages,
    };
  }, [claims, params]);
}
