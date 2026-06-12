"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  FileText,
  ShieldAlert,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";
import { Card, CardContent } from "@/app/components/ui/card";
import { Button } from "@/app/components/ui/button";
import { Badge } from "@/app/components/ui/badge";
import { useClaimStore } from "@/app/store/useClaimStore";
import { claimsApi } from "@/app/api/claims";
import { ClaimAUTP } from "@/app/types/claim";
import { MonitoringCard } from "../components/dashboard/MonitoringCard";

export default function DashboardPage() {
  const { fetchClaims } = useClaimStore();
  const [recentClaims, setRecentClaims] = useState<ClaimAUTP[]>([]);
  const [stats, setStats] = useState({ total: 0, pending: 0, surveyed: 0, approved: 0, rejected: 0 });

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const response = await claimsApi.getAll({ pageSize: 1000 });
        const allClaims = response.data;

        const newStats = {
          total: response.meta.total,
          pending: allClaims.filter((c) => c.claimStatus === "Pending").length,
          surveyed: allClaims.filter((c) => c.claimStatus === "Surveyed").length,
          approved: allClaims.filter((c) => c.claimStatus === "Approved").length,
          rejected: allClaims.filter((c) => c.claimStatus === "Rejected").length,
        };
        setStats(newStats);

        const recent = allClaims
          .sort((a, b) => new Date(b.submissionDate).getTime() - new Date(a.submissionDate).getTime())
          .slice(0, 5);
        setRecentClaims(recent);

        await fetchClaims({ page: 1, pageSize: 10 });
      } catch (error) {
        console.error("Failed to load dashboard", error);
      }
    };

    loadDashboard();
  }, [fetchClaims]);

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (hours < 1) return "baru saja";
    if (hours < 24) return `${hours} jam yang lalu`;
    if (days < 7) return `${days} hari yang lalu`;
    return date.toLocaleDateString("id-ID");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">
          Dashboard Monitoring
        </h1>
        <p className="text-muted-foreground mt-1">
          Selamat datang di AUTP Portal Jasindo
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <MonitoringCard title="Total Klaim" sum={stats.total} Icon={FileText} />
        <MonitoringCard
          title="Pending"
          sum={stats.pending}
          Icon={Clock}
          textColor="text-yellow-600"
          bgColor="bg-yellow-50"
          iconColor="text-yellow-600"
        />
        <MonitoringCard
          title="Surveyed"
          sum={stats.surveyed}
          Icon={ShieldAlert}
          textColor="text-blue-600"
          bgColor="bg-blue-50"
          iconColor="text-blue-600"
        />
        <MonitoringCard
          title="Approved"
          sum={stats.approved}
          Icon={CheckCircle2}
          textColor="text-green-600"
          bgColor="bg-green-50"
          iconColor="text-green-600"
        />
        <MonitoringCard
          title="Rejected"
          sum={stats.rejected}
          Icon={FileText}
          textColor="text-red-600"
          bgColor="bg-red-50"
          iconColor="text-red-600"
        />
      </div>

      <Card>
        <div className="px-2 border-b border-border">
          <div className="flex items-center justify-between">
            <h2 className="text-lg mb-2 font-semibold text-foreground">
              Klaim Terbaru
            </h2>
            <Button variant="ghost" size="sm" asChild>
              <Link
                href="/dashboard/claims"
                className="flex items-center gap-2"
              >
                Lihat Semua <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </div>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {recentClaims.length > 0 ? (
              recentClaims.map((claim) => (
                <div
                  key={claim.id}
                  className="flex items-start gap-4 py-3 border-b border-border last:border-0"
                >
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0"></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-foreground truncate">
                        {claim.farmerName}
                      </p>
                      <Badge
                        variant={
                          claim.claimStatus === "Pending"
                            ? "secondary"
                            : claim.claimStatus === "Surveyed"
                              ? "outline"
                              : claim.claimStatus === "Approved"
                                ? "default"
                                : "destructive"
                        }
                        className="text-xs"
                      >
                        {claim.claimStatus}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {claim.certificateNumber} •{" "}
                      {formatDate(claim.submissionDate)}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground py-8">
                Tidak ada klaim
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
