import { create } from 'zustand';
import { ClaimAUTP } from '@/app/types/claim';
import { claimsApi, ClaimFilters } from '@/app/api/claims';
import { PaginatedMeta } from '@/app/types/api';

interface ClaimResponse {
  message: string;
  data: ClaimAUTP;
}

interface ClaimState {
  claims: ClaimAUTP[];
  meta: PaginatedMeta | null;
  isLoading: boolean;
  error: string | null;
  filters: ClaimFilters & { page: number; pageSize: number };
  fetchClaims: (filters?: ClaimFilters) => Promise<void>;
  createClaim: (data: Omit<ClaimAUTP, 'id'>) => Promise<ClaimResponse>;
  updateClaim: (id: number, data: Partial<ClaimAUTP>) => Promise<ClaimResponse>;
  deleteClaim: (id: number) => Promise<string>;
  getClaimById: (id: number) => ClaimAUTP | undefined;
  setFilters: (partial: Partial<ClaimFilters>) => void;
}

export const useClaimStore = create<ClaimState>((set, get) => ({
  claims: [],
  meta: null,
  isLoading: false,
  error: null,
  filters: {
    page: 1,
    pageSize: 10,
  },

  fetchClaims: async (filters = {}) => {
    set({ isLoading: true, error: null });
    try {
      const currentFilters = { ...get().filters, ...filters };
      set({ filters: currentFilters });

      const response = await claimsApi.getAll(currentFilters);
      set({
        claims: response.data,
        meta: response.meta,
      });
    } catch (err: unknown) {
      const error = err instanceof Error ? err.message : 'Failed to fetch claims';
      set({ error });
    } finally {
      set({ isLoading: false });
    }
  },

  createClaim: async (data) => {
    try {
      const response = await claimsApi.create(data);
      await get().fetchClaims();
      return response;
    } catch (err) {
      throw err;
    }
  },

  updateClaim: async (id, data) => {
    try {
      const response = await claimsApi.update(id, data);
      set((state) => ({
        claims: state.claims.map((c) => (c.id === id ? response.data : c)),
      }));
      return response;
    } catch (err) {
      throw err;
    }
  },

  deleteClaim: async (id) => {
    try {
      const response = await claimsApi.remove(id);
      set((state) => ({
        claims: state.claims.filter((c) => c.id !== id),
      }));
      return response.message;
    } catch (err) {
      throw err;
    }
  },

  getClaimById: (id) => {
    return get().claims.find((claim) => claim.id === id);
  },

  setFilters: (partial) => {
    const currentFilters = get().filters;
    // Reset to page 1 only if filter values change (search, status, cause), not on pagination
    const isFilterChange = Boolean(
      partial.search !== undefined ||
      partial.status !== undefined ||
      partial.cause !== undefined
    );
    const newFilters = {
      ...currentFilters,
      ...partial,
      ...(isFilterChange && { page: 1 }),
    };
    set({ filters: newFilters });
    get().fetchClaims(newFilters);
  },
}));
