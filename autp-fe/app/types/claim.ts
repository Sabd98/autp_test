export interface ClaimAUTP {
  id: string;
  farmerName: string;
  farmerNIK: string;
  certificateNumber: string;
  plantingPeriod: "MT1" | "MT2";
  plotVillage: string;
  plotDistrict: string;
  plotRegency: string;
  totalInsuredArea: number;
  failedLandArea: number;
  failureCause: "Banjir" | "Kekeringan" | "Hama Wereng" | "Penyakit Tanaman" | "OPT Lainnya";
  claimStatus: "Pending" | "Surveyed" | "Approved" | "Rejected";
  submissionDate: string;
  surveyorName?: string;
  surveyDate?: string;
  surveyNotes?: string;
  compensationAmount: number;
}