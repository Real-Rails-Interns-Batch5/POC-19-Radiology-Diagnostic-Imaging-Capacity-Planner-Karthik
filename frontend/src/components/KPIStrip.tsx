import React from 'react';
import { KPISummary } from '@/lib/api';

export function KPIStrip({ kpis }: { kpis: KPISummary | null }) {
  if (!kpis) return null;

  const items = [
    { label: "Total MRI",          value: kpis.total_mri_scanners },
    { label: "Total CT",           value: kpis.total_ct_scanners },
    { label: "Avg Utilization",    value: `${kpis.avg_utilization_pct}%` },
    { label: "Avg Wait Time",      value: `${kpis.avg_wait_time_days}d` },
    { label: "Capacity Gap Idx",   value: kpis.avg_capacity_gap_index },
    { label: "Equipment 10yr+",    value: kpis.equipment_older_than_10yr },
    { label: "Daily Volume",       value: kpis.daily_imaging_volume },
  ];

  return (
    <div className="grid grid-cols-7 gap-3 w-full">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="relative bg-[#0B1117] border border-[#1F2937] rounded-lg p-4
                     flex flex-col items-start gap-1 min-h-[90px]
                     shadow-[0_0_12px_rgba(56,189,248,0.06)]
                     hover:border-[#38BDF8] hover:shadow-[0_0_16px_rgba(56,189,248,0.15)]
                     transition-all duration-200"
        >
          {/* Synthetic badge */}
          <span className="text-[8px] font-semibold tracking-wider text-amber-400
                           bg-amber-400/10 border border-amber-400/20 rounded
                           px-1 py-0.5">
            ⚠ SYNTHETIC
          </span>
          {/* Label */}
          <p className="text-[10px] font-medium tracking-widest text-slate-500 uppercase mt-1 leading-tight">
            {item.label}
          </p>
          {/* Value — FIX 8: whitespace-nowrap prevents wrapping */}
          <p className="text-2xl font-bold text-white tracking-tight whitespace-nowrap">
            {item.value}
          </p>
          {/* Accent underline */}
          <div className="h-[2px] w-8 bg-[#38BDF8] rounded-full mt-1" />
        </div>
      ))}
    </div>
  );
}
