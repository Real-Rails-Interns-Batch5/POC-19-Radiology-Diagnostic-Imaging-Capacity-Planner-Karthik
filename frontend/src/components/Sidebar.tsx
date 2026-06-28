"use client";

import React from 'react';
import Papa from 'papaparse';
import { Hospital } from '@/lib/api';

interface SidebarProps {
  hospitals: Hospital[];
  regions: string[];
  filters: any;
  setFilters: (f: any) => void;
}

export function Sidebar({ hospitals, regions, filters, setFilters }: SidebarProps) {

  const handleDownload = () => {
    if (hospitals.length === 0) return;
    const csv = Papa.unparse(hospitals);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'capacity_planner_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const activeRegion = filters.region || "Gulf Region — All";

  return (
    <div className="w-full h-full flex flex-col gap-6 px-5 pt-5 pb-6 overflow-y-auto">

      {/* Title block */}
      <div>
        <h1 className="text-lg font-bold tracking-tight text-[#38BDF8] uppercase mb-1">
          Radiology Capacity Planner
        </h1>
        <h2 className="text-base font-medium text-white mb-2">{activeRegion}</h2>
        {/* FIX 4 — cyan count */}
        <p className="text-sm text-slate-400">
          Active Hospitals: <span className="text-[#38BDF8] font-bold">{hospitals.length}</span>
        </p>
      </div>

      {/* Why This Matters */}
      <div className="bg-[#0B1117] border border-[#1F2937] rounded-lg p-4">
        <h3 className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">
          Why This Matters
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Gulf region hospitals face growing diagnostic imaging pressure with population growth
          outpacing scanner infrastructure. Critical facilities operating above 90% utilization
          risk delayed diagnoses and adverse patient outcomes.
        </p>
      </div>

      {/* Who Controls the Rail */}
      <div className="bg-[#0B1117] border border-[#1F2937] rounded-lg p-4">
        <h3 className="text-xs font-semibold tracking-widest text-slate-400 uppercase mb-2">
          Who Controls the Rail
        </h3>
        <p className="text-sm text-slate-300 leading-relaxed">
          Governed by national MOH bodies: Saudi MOH, UAE HAAD, Qatar MOH, Kuwait MOH.
          Equipment procurement follows COCIR standards. WHO benchmarks 6 MRI units per
          million population.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-[#0B1117] border border-[#1F2937] rounded-lg p-4 flex flex-col gap-4">
        <h3 className="text-xs font-semibold tracking-widest text-slate-400 uppercase">Filters</h3>

        {/* Region */}
        <div>
          <label className="block text-[10px] font-medium tracking-widest text-slate-500 uppercase mb-1">
            Region
          </label>
          <select
            className="w-full bg-[#030712] border border-[#1F2937] text-white text-sm rounded p-2 outline-none focus:border-[#38BDF8] transition-colors"
            value={filters.region || ""}
            onChange={e => setFilters({ ...filters, region: e.target.value })}
          >
            <option value="">All Regions</option>
            {regions.map(r => <option key={r} value={r}>{r}</option>)}
          </select>
        </div>

        {/* Modality */}
        <div>
          <label className="block text-[10px] font-medium tracking-widest text-slate-500 uppercase mb-1">
            Modality
          </label>
          <div className="flex gap-2 text-sm">
            {["", "MRI", "CT"].map(val => (
              <button
                key={val}
                className={`flex-1 py-1.5 rounded border transition-colors text-xs font-medium ${
                  filters.modality === val
                    ? 'bg-[#38BDF8]/20 border-[#38BDF8] text-[#38BDF8]'
                    : 'bg-[#030712] border-[#1F2937] text-slate-400 hover:text-white hover:border-slate-500'
                }`}
                onClick={() => setFilters({ ...filters, modality: val })}
              >
                {val || "All"}
              </button>
            ))}
          </div>
        </div>

        {/* Maintenance Status */}
        <div>
          <label className="block text-[10px] font-medium tracking-widest text-slate-500 uppercase mb-1">
            Maintenance Status
          </label>
          <div className="grid grid-cols-2 gap-2">
            {["", "operational", "partial", "under_maintenance"].map(val => (
              <button
                key={val}
                className={`py-1.5 px-2 rounded border capitalize transition-colors text-[10px] font-medium text-center ${
                  filters.maintenance_status === val
                    ? 'bg-[#38BDF8]/20 border-[#38BDF8] text-[#38BDF8]'
                    : 'bg-[#030712] border-[#1F2937] text-slate-400 hover:text-white hover:border-slate-500'
                }`}
                onClick={() => setFilters({ ...filters, maintenance_status: val })}
              >
                {val ? val.replace('_', ' ') : "All"}
              </button>
            ))}
          </div>
        </div>

        {/* Alert Level */}
        <div>
          <label className="block text-[10px] font-medium tracking-widest text-slate-500 uppercase mb-1">
            Alert Level
          </label>
          <div className="flex gap-2">
            {["", "critical", "warning", "normal"].map(val => (
              <button
                key={val}
                className={`flex-1 py-1.5 rounded border capitalize transition-colors text-xs font-medium ${
                  filters.alert_level === val
                    ? 'bg-[#38BDF8]/20 border-[#38BDF8] text-[#38BDF8]'
                    : 'bg-[#030712] border-[#1F2937] text-slate-400 hover:text-white hover:border-slate-500'
                }`}
                onClick={() => setFilters({ ...filters, alert_level: val })}
              >
                {val || "All"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* FIX 3 — Download button pinned at bottom, outline style */}
      <div className="mt-auto pt-4 border-t border-[#1F2937]">
        <button
          onClick={handleDownload}
          className="w-full flex items-center justify-center gap-2
                     px-4 py-2.5 rounded-lg text-xs font-semibold tracking-widest uppercase
                     border border-[#38BDF8]/40 text-[#38BDF8] bg-[#38BDF8]/5
                     hover:bg-[#38BDF8]/10 hover:border-[#38BDF8]
                     hover:shadow-[0_0_12px_rgba(56,189,248,0.2)]
                     transition-all duration-200"
        >
          ↓ Download Sample Data
        </button>
      </div>

    </div>
  );
}
