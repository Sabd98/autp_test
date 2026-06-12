import { create } from 'zustand';
import { ClaimAUTP } from '@/app/types/claim';
import { claimsApi, ClaimFilters } from '@/app/api/claims';
import { PaginatedMeta } from '@/app/types/api';

interface ClaimState {
  claims: ClaimAUTP[];
  meta: PaginatedMeta | null;
  isLoading: boolean;
  error: string | null;
  filters: ClaimFilters & { page: number; pageSize: number };
  fetchClaims: (filters?: ClaimFilters) => Promise<void>;
  createClaim: (data: Omit<ClaimAUTP, 'id'>) => Promise<ClaimAUTP>;
  updateClaim: (id: number, data: Partial<ClaimAUTP>) => Promise<ClaimAUTP>;
  deleteClaim: (id: number) => Promise<void>;
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
      set((state) => ({ filters: currentFilters }));

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
      const claim = await claimsApi.create(data);
      await get().fetchClaims();
      return claim;
    } catch (err) {
      throw err;
    }
  },

  updateClaim: async (id, data) => {
    try {
      const claim = await claimsApi.update(id, data);
      set((state) => ({
        claims: state.claims.map((c) => (c.id === id ? claim : c)),
      }));
      return claim;
    } catch (err) {
      throw err;
    }
  },

  deleteClaim: async (id) => {
    try {
      await claimsApi.remove(id);
      set((state) => ({
        claims: state.claims.filter((c) => c.id !== id),
      }));
    } catch (err) {
      throw err;
    }
  },

  getClaimById: (id) => {
    return get().claims.find((claim) => claim.id === id);
  },

  setFilters: (partial) => {
    const newFilters = { ...get().filters, ...partial, page: 1 };
    set({ filters: newFilters });
    get().fetchClaims(newFilters);
  },
}));
