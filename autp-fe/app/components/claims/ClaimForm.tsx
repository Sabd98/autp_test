'use client';

import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/app/components/ui/dialog';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/app/components/ui/select';
import { Textarea } from '@/app/components/ui/textarea';
import { Separator } from '@/app/components/ui/separator';
import { ClaimAUTP } from '@/app/types/claim';
import { FAILURE_CAUSES, FORM_CLAIM_STATUSES, PLANTING_PERIODS } from '@/app/lib/constants';

interface ClaimFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: Omit<ClaimAUTP, 'id' | 'submissionDate'> | Partial<ClaimAUTP>) => void;
  initialData?: Partial<ClaimAUTP>;
  isEdit?: boolean;
}

export function ClaimForm({ open, onOpenChange, onSubmit, initialData, isEdit }: ClaimFormProps) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState<Partial<ClaimAUTP>>({
    farmerName: '',
    farmerNIK: '',
    certificateNumber: '',
    plantingPeriod: 'MT1',
    plotVillage: '',
    plotDistrict: '',
    plotRegency: '',
    totalInsuredArea: 0,
    failedLandArea: 0,
    failureCause: 'Banjir',
    claimStatus: 'Pending',
    surveyorName: '',
    surveyDate: '',
    surveyNotes: '',
    compensationAmount: 0,
    ...initialData,
  });

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.farmerName?.trim()) newErrors.farmerName = 'Nama petani diperlukan';
    if (!formData.farmerNIK?.trim()) newErrors.farmerNIK = 'NIK petani diperlukan';
    if (!formData.certificateNumber?.trim()) newErrors.certificateNumber = 'Nomor sertifikat diperlukan';
    if (!formData.plotVillage?.trim()) newErrors.plotVillage = 'Desa diperlukan';
    if (!formData.plotDistrict?.trim()) newErrors.plotDistrict = 'Kecamatan diperlukan';
    if (!formData.plotRegency?.trim()) newErrors.plotRegency = 'Kabupaten diperlukan';
    if (!formData.totalInsuredArea || formData.totalInsuredArea <= 0) {
      newErrors.totalInsuredArea = 'Luas lahan harus > 0';
    }
    if (!formData.failedLandArea || formData.failedLandArea <= 0) {
      newErrors.failedLandArea = 'Luas gagal harus > 0';
    }
    if (formData.failedLandArea! > formData.totalInsuredArea!) {
      newErrors.failedLandArea = 'Luas gagal tidak boleh melebihi luas lahan diasuransikan';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validate()) {
      onSubmit(formData);
      setFormData({
        farmerName: '',
        farmerNIK: '',
        certificateNumber: '',
        plantingPeriod: 'MT1',
        plotVillage: '',
        plotDistrict: '',
        plotRegency: '',
        totalInsuredArea: 0,
        failedLandArea: 0,
        failureCause: 'Banjir',
        claimStatus: 'Pending',
        surveyorName: '',
        surveyDate: '',
        surveyNotes: '',
        compensationAmount: 0,
      });
      setErrors({});
      onOpenChange(false);
    } else {
      toast.error('Harap lengkapi semua field yang diperlukan');
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{isEdit ? 'Edit Klaim' : 'Tambah Klaim Baru'}</DialogTitle>
          <DialogDescription>
            {isEdit ? 'Ubah informasi klaim' : 'Isi formulir untuk membuat klaim baru'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div>
            <h3 className="font-semibold text-sm mb-3">Data Petani</h3>
            <div className="space-y-3">
              <div>
                <Label className='mb-2' htmlFor="farmerName">Nama Petani *</Label>
                <Input
                  id="farmerName"
                  value={formData.farmerName || ''}
                  onChange={(e) => setFormData({ ...formData, farmerName: e.target.value })}
                  className={errors.farmerName ? 'border-red-500' : ''}
                />
                {errors.farmerName && <p className="text-xs text-red-500 mt-1">{errors.farmerName}</p>}
              </div>
              <div>
                <Label className='mb-2' htmlFor="farmerNIK">NIK Petani *</Label>
                <Input
                  id="farmerNIK"
                  value={formData.farmerNIK || ''}
                  onChange={(e) => setFormData({ ...formData, farmerNIK: e.target.value })}
                  className={errors.farmerNIK ? 'border-red-500' : ''}
                />
                {errors.farmerNIK && <p className="text-xs text-red-500 mt-1">{errors.farmerNIK}</p>}
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-sm mb-3">Data Polis</h3>
            <div className="space-y-3">
              <div>
                <Label className='mb-2' htmlFor="certificateNumber">Nomor Sertifikat *</Label>
                <Input
                  id="certificateNumber"
                  value={formData.certificateNumber || ''}
                  onChange={(e) => setFormData({ ...formData, certificateNumber: e.target.value })}
                  className={errors.certificateNumber ? 'border-red-500' : ''}
                />
                {errors.certificateNumber && <p className="text-xs text-red-500 mt-1">{errors.certificateNumber}</p>}
              </div>
              <div>
                <Label className='mb-2' htmlFor="plantingPeriod">Musim Tanam</Label>
                <Select value={formData.plantingPeriod} onValueChange={(val) => setFormData({ ...formData, plantingPeriod: val as 'MT1' | 'MT2' })}>
                  <SelectTrigger id="plantingPeriod">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {PLANTING_PERIODS.map((period) => (
                      <SelectItem key={period} value={period}>
                        {period}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-sm mb-3">Data Lokasi Lahan</h3>
            <div className="space-y-3">
              <div>
                <Label className='mb-2' htmlFor="plotVillage">Desa/Kelurahan *</Label>
                <Input
                  id="plotVillage"
                  value={formData.plotVillage || ''}
                  onChange={(e) => setFormData({ ...formData, plotVillage: e.target.value })}
                  className={errors.plotVillage ? 'border-red-500' : ''}
                />
                {errors.plotVillage && <p className="text-xs text-red-500 mt-1">{errors.plotVillage}</p>}
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className='mb-2' htmlFor="plotDistrict">Kecamatan *</Label>
                  <Input
                    id="plotDistrict"
                    value={formData.plotDistrict || ''}
                    onChange={(e) => setFormData({ ...formData, plotDistrict: e.target.value })}
                    className={errors.plotDistrict ? 'border-red-500' : ''}
                  />
                  {errors.plotDistrict && <p className="text-xs text-red-500 mt-1">{errors.plotDistrict}</p>}
                </div>
                <div>
                  <Label className='mb-2' htmlFor="plotRegency">Kabupaten/Kota *</Label>
                  <Input
                    id="plotRegency"
                    value={formData.plotRegency || ''}
                    onChange={(e) => setFormData({ ...formData, plotRegency: e.target.value })}
                    className={errors.plotRegency ? 'border-red-500' : ''}
                  />
                  {errors.plotRegency && <p className="text-xs text-red-500 mt-1">{errors.plotRegency}</p>}
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h3 className="font-semibold text-sm mb-3">Informasi Klaim</h3>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className='mb-2' htmlFor="totalInsuredArea">Luas Diasuransikan (ha) *</Label>
                  <Input
                    id="totalInsuredArea"
                    type="number"
                    step="0.01"
                    value={formData.totalInsuredArea || ''}
                    onChange={(e) => setFormData({ ...formData, totalInsuredArea: parseFloat(e.target.value) || 0 })}
                    className={errors.totalInsuredArea ? 'border-red-500' : ''}
                  />
                  {errors.totalInsuredArea && <p className="text-xs text-red-500 mt-1">{errors.totalInsuredArea}</p>}
                </div>
                <div>
                  <Label className='mb-2' htmlFor="failedLandArea">Luas Gagal Panen (ha) *</Label>
                  <Input
                    id="failedLandArea"
                    type="number"
                    step="0.01"
                    value={formData.failedLandArea || ''}
                    onChange={(e) => setFormData({ ...formData, failedLandArea: parseFloat(e.target.value) || 0 })}
                    className={errors.failedLandArea ? 'border-red-500' : ''}
                  />
                  {errors.failedLandArea && <p className="text-xs text-red-500 mt-1">{errors.failedLandArea}</p>}
                </div>
              </div>
              <div>
                <Label className='mb-2' htmlFor="failureCause">Penyebab Kegagalan</Label>
                <Select value={formData.failureCause} onValueChange={(val) => setFormData({ ...formData, failureCause: val as any })}>
                  <SelectTrigger id="failureCause">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FAILURE_CAUSES.map((cause) => (
                      <SelectItem key={cause} value={cause}>
                        {cause}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className='mb-2' htmlFor="claimStatus">Status Klaim</Label>
                <Select value={formData.claimStatus} onValueChange={(val) => setFormData({ ...formData, claimStatus: val as any })}>
                  <SelectTrigger id="claimStatus">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {FORM_CLAIM_STATUSES.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {isEdit && formData.claimStatus === 'Surveyed' && (
            <>
              <Separator />
              <div>
                <h3 className="font-semibold text-sm mb-3">Data Survey</h3>
                <div className="space-y-3">
                  <div>
                    <Label className='mb-2' htmlFor="surveyorName">Nama Surveyor</Label>
                    <Input
                      id="surveyorName"
                      value={formData.surveyorName || ''}
                      onChange={(e) => setFormData({ ...formData, surveyorName: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className='mb-2' htmlFor="surveyDate">Tanggal Survey</Label>
                    <Input
                      id="surveyDate"
                      type="date"
                      value={formData.surveyDate || ''}
                      onChange={(e) => setFormData({ ...formData, surveyDate: e.target.value })}
                    />
                  </div>
                  <div>
                    <Label className='mb-2' htmlFor="surveyNotes">Catatan Survey</Label>
                    <Textarea
                      id="surveyNotes"
                      value={formData.surveyNotes || ''}
                      onChange={(e) => setFormData({ ...formData, surveyNotes: e.target.value })}
                      rows={3}
                    />
                  </div>
                </div>
              </div>
            </>
          )}

          <div>
            <Label className='mb-2' htmlFor="compensationAmount">Jumlah Ganti Rugi (IDR)</Label>
            <Input
              id="compensationAmount"
              type="number"
              value={formData.compensationAmount || ''}
              onChange={(e) => setFormData({ ...formData, compensationAmount: parseInt(e.target.value) || 0 })}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button onClick={handleSubmit}>{isEdit ? 'Simpan Perubahan' : 'Buat Klaim'}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
