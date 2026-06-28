"use client";

import React, { useEffect } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

export function ChartsPanel({ waitTrend, ageDist, capacityGap }: any) {
  useEffect(() => {
    // Debug age distribution if needed
    // console.log('Age Distribution Data:', ageDist);
  }, [ageDist]);

  const panelClass = "bg-[#0B1117]/80 backdrop-blur-sm border border-[#1F2937] rounded-xl p-4 shadow-[0_0_24px_rgba(56,189,248,0.04)] flex flex-col";
  const headerClass = "text-xs font-semibold tracking-widest text-slate-400 uppercase";

  return (
    <div className="grid grid-cols-3 gap-4 min-h-[250px]">
      <div className={panelClass}>
        <div className="flex justify-between items-center mb-3">
          <h3 className={headerClass}>Wait-Time Trend (12m)</h3>
          <span className="text-[8px] font-semibold tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded px-1 py-0.5">
            ⚠ SYNTHETIC
          </span>
        </div>
        <div className="flex-grow">
          {waitTrend && waitTrend.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={waitTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
                <XAxis dataKey="month" stroke="#9CA3AF" fontSize={10} tickMargin={5} />
                <YAxis stroke="#9CA3AF" fontSize={10} tickMargin={5} />
                <Tooltip contentStyle={{ backgroundColor: '#0B1117', borderColor: '#1F2937', color: '#fff' }} />
                <Line type="monotone" dataKey="avg_wait_days" stroke="#38BDF8" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-xs text-gray-500">No data available</div>
          )}
        </div>
      </div>

      <div className={panelClass}>
        <div className="flex justify-between items-center mb-3">
          <h3 className={headerClass}>Equipment Age Dist</h3>
          <span className="text-[8px] font-semibold tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded px-1 py-0.5">
            ⚠ SYNTHETIC
          </span>
        </div>
        <div className="flex-grow">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ageDist || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" vertical={false} />
              <XAxis dataKey="label" stroke="#9CA3AF" fontSize={10} tickMargin={5} />
              <YAxis stroke="#9CA3AF" fontSize={10} tickMargin={5} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1117', borderColor: '#1F2937', color: '#fff' }} cursor={{fill: '#1F2937'}} />
              <Bar dataKey="count" fill="#818CF8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className={panelClass}>
        <div className="flex justify-between items-center mb-3">
          <h3 className={headerClass}>Top Capacity Gaps</h3>
          <span className="text-[8px] font-semibold tracking-wider text-amber-400 bg-amber-400/10 border border-amber-400/20 rounded px-1 py-0.5">
            ⚠ SYNTHETIC
          </span>
        </div>
        <div className="flex-grow overflow-hidden min-h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={(capacityGap || []).slice(0, 10)} layout="vertical" margin={{ left: 20, right: 10, top: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1F2937" horizontal={false} />
              <XAxis type="number" stroke="#9CA3AF" fontSize={10} hide />
              <YAxis dataKey="name" type="category" width={80} stroke="#9CA3AF" fontSize={10} tickFormatter={(val: string) => val.substring(0, 10) + '...'} />
              <Tooltip contentStyle={{ backgroundColor: '#0B1117', borderColor: '#1F2937', color: '#fff' }} cursor={{fill: '#1F2937'}} />
              <Bar dataKey="capacity_gap_index" fill="#38BDF8" radius={[0, 4, 4, 0]} barSize={12} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
