'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { FAILURE_CAUSES, CLAIM_STATUSES } from '@/app/lib/constants';

interface ClaimFiltersProps {
  onSearchChange: (search: string) => void;
  onStatusChange: (status: string) => void;
  onCauseChange: (cause: string) => void;
  onReset: () => void;
}

export function ClaimFilters({
  onSearchChange,
  onStatusChange,
  onCauseChange,
  onReset,
}: ClaimFiltersProps) {
  const [search, setSearch] = useState('');
  const [statusValue, setStatusValue] = useState('all');
  const [causeValue, setCauseValue] = useState('all');

  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search, onSearchChange]);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between p-4 bg-card border border-border rounded-lg">
      <div className="flex-1">
        <Input
          placeholder="Cari nama petani"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex gap-2">
        <Select value={statusValue} onValueChange={(val) => {
          setStatusValue(val);
          onStatusChange(val === 'all' ? '' : val);
        }}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Status</SelectItem>
            {CLAIM_STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={causeValue} onValueChange={(val) => {
          setCauseValue(val);
          onCauseChange(val === 'all' ? '' : val);
        }}>
          <SelectTrigger className="w-[150px]">
            <SelectValue placeholder="Penyebab" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Penyebab</SelectItem>
            {FAILURE_CAUSES.map((cause) => (
              <SelectItem key={cause} value={cause}>
                {cause}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => {
            setSearch('');
            setStatusValue('all');
            setCauseValue('all');
            onStatusChange('');
            onCauseChange('');
            onReset();
          }}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}
