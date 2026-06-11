import { create } from 'zustand';
import { ClaimAUTP } from '@/app/types/claim';
import { DUMMY_CLAIMS } from '@/app/data/claims';

interface ClaimState {
  claims: ClaimAUTP[];
  addClaim: (data: Omit<ClaimAUTP, 'id' | 'submissionDate'>) => void;
  updateClaim: (id: string, data: Partial<ClaimAUTP>) => void;
  deleteClaim: (id: string) => void;
  getClaimById: (id: string) => ClaimAUTP | undefined;
}

const generateId = () => {
  return String(Math.max(...DUMMY_CLAIMS.map((c) => parseInt(c.id) || 0)) + 1);
};

export const useClaimStore = create<ClaimState>((set, get) => ({
  claims: DUMMY_CLAIMS,
  addClaim: (data) => {
    const newClaim: ClaimAUTP = {
      ...data,
      id: generateId(),
      submissionDate: new Date().toISOString().split('T')[0],
    };
    set((state) => ({
      claims: [newClaim, ...state.claims],
    }));
  },
  updateClaim: (id, data) => {
    set((state) => ({
      claims: state.claims.map((claim) =>
        claim.id === id ? { ...claim, ...data } : claim
      ),
    }));
  },
  deleteClaim: (id) => {
    set((state) => ({
      claims: state.claims.filter((claim) => claim.id !== id),
    }));
  },
  getClaimById: (id) => {
    return get().claims.find((claim) => claim.id === id);
  },
}));
