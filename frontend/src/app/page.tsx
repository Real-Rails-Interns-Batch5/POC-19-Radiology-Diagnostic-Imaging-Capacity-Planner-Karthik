"use client";

import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { fetchHospitals, fetchKPIs, fetchAgeDistribution, fetchCapacityGap, fetchRegions, fetchHospitalDetails } from '@/lib/api';
import { KPIStrip } from '@/components/KPIStrip';
import { ChartsPanel } from '@/components/ChartsPanel';
import { HospitalsTable } from '@/components/HospitalsTable';
import { Sidebar } from '@/components/Sidebar';

const MapComponent = dynamic(() => import('@/components/Map'), { ssr: false });

export default function Home() {
  const [filters, setFilters] = useState({ region: "", modality: "", maintenance_status: "", alert_level: "" });
  const [regions, setRegions] = useState<string[]>([]);
  const [filteredHospitals, setFilteredHospitals] = useState<any[]>([]);
  const [kpis, setKpis] = useState<any>(null);
  const [ageDist, setAgeDist] = useState<any>(null);
  const [capacityGap, setCapacityGap] = useState<any>(null);
  const [waitTrend, setWaitTrend] = useState<any>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    fetchRegions().then(res => setRegions(res.regions));
    fetchAgeDistribution().then(res => setAgeDist(res.buckets));
    fetchCapacityGap().then(res => setCapacityGap(res.hospitals));
  }, []);

  useEffect(() => {
    fetchHospitals(filters).then(res => {
      let data = res.hospitals;
      if (filters.alert_level) {
        data = data.filter((h: any) => h.alert_level === filters.alert_level);
      }
      setFilteredHospitals(data);
    });
    fetchKPIs(filters.region).then(res => setKpis(res));
  }, [filters]);

  useEffect(() => {
    if (selectedId) {
      fetchHospitalDetails(selectedId).then(res => setWaitTrend(res.wait_trend));
    } else {
      // Calculate region average when no hospital is selected
      if (filteredHospitals.length > 0) {
        const avgWait = filteredHospitals.reduce((acc, h) => acc + h.avg_wait_time_days, 0) / filteredHospitals.length;
        const months = ["Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024", "May 2024", "Jun 2024", 
                        "Jul 2024", "Aug 2024", "Sep 2024", "Oct 2024", "Nov 2024", "Dec 2024"];
        const regionTrend = months.map(month => ({
          month,
          avg_wait_days: Number(avgWait.toFixed(1))
        }));
        setWaitTrend(regionTrend);
      } else {
        setWaitTrend([]);
      }
    }
  }, [selectedId, filteredHospitals]);

  return (
    <main className="flex flex-row h-screen overflow-hidden bg-[#030712]">
      {/* Main Stage — 70% */}
      <div className="w-[70%] flex flex-col overflow-y-auto p-4 gap-4">
        <MapComponent hospitals={filteredHospitals} onSelectHospital={setSelectedId} selectedId={selectedId} />
        <KPIStrip kpis={kpis} />
        <ChartsPanel waitTrend={waitTrend} ageDist={ageDist} capacityGap={capacityGap} />
        <HospitalsTable data={filteredHospitals} onRowClick={setSelectedId} selectedId={selectedId} />
      </div>

      {/* Sidebar — 30% */}
      <div className="w-[30%] h-screen overflow-y-auto border-l border-[#1F2937] flex flex-col">
        <Sidebar hospitals={filteredHospitals} regions={regions} filters={filters} setFilters={setFilters} />
      </div>
    </main>
  );
}
