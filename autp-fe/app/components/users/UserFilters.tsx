'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';

interface UserFiltersProps {
  onSearchChange: (search: string) => void;
}

export function UserFilters({ onSearchChange }: UserFiltersProps) {
  const [search, setSearch] = useState('');

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
          placeholder="Cari username atau nama"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-1/4"
        />
      </div>
    </div>
  );
}
