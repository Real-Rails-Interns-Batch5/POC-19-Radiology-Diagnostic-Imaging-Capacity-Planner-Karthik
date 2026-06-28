const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface Hospital {
  id: string;
  name: string;
  region: string;
  lat: number;
  lng: number;
  mri_count: number;
  ct_count: number;
  population_served: number;
  daily_scan_volume: number;
  avg_wait_time_days: number;
  daily_utilization_pct: number;
  maintenance_status: string;
  equipment_age_years: number;
  equipment_type: string;
  capacity_gap_index: number;
  scanners_per_100k: number;
  alert_level: string;
  replacement_priority: string;
}

export interface KPISummary {
  total_mri_scanners: number;
  total_ct_scanners: number;
  avg_utilization_pct: number;
  avg_wait_time_days: number;
  avg_capacity_gap_index: number;
  equipment_older_than_10yr: number;
  daily_imaging_volume: number;
  data_source: string;
}

export async function fetchHospitals(filters: any = {}) {
  const params = new URLSearchParams();
  if (filters.region) params.append("region", filters.region);
  if (filters.modality) params.append("modality", filters.modality);
  if (filters.maintenance_status) params.append("maintenance_status", filters.maintenance_status);
  
  const res = await fetch(`${API_BASE}/api/hospitals?${params.toString()}`);
  return res.json();
}

export async function fetchHospitalDetails(id: string) {
  const res = await fetch(`${API_BASE}/api/hospitals/${id}`);
  return res.json();
}

export async function fetchKPIs(region?: string) {
  const url = region ? `${API_BASE}/api/kpis?region=${region}` : `${API_BASE}/api/kpis`;
  const res = await fetch(url);
  return res.json();
}

export async function fetchAgeDistribution() {
  const res = await fetch(`${API_BASE}/api/equipment/age-distribution`);
  return res.json();
}

export async function fetchCapacityGap() {
  const res = await fetch(`${API_BASE}/api/equipment/capacity-gap`);
  return res.json();
}

export async function fetchRegions() {
  const res = await fetch(`${API_BASE}/api/regions`);
  return res.json();
}
