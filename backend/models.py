from pydantic import BaseModel
from typing import Optional

class Hospital(BaseModel):
    id: str
    name: str
    region: str
    lat: float
    lng: float
    mri_count: int
    ct_count: int
    population_served: int
    daily_scan_volume: int
    avg_wait_time_days: float
    daily_utilization_pct: float
    maintenance_status: str
    equipment_age_years: float
    equipment_type: str
    capacity_gap_index: float
    scanners_per_100k: float
    alert_level: str
    replacement_priority: str

class WaitTimeTrend(BaseModel):
    month: str
    avg_wait_days: float

class KPISummary(BaseModel):
    total_mri_scanners: int
    total_ct_scanners: int
    avg_utilization_pct: float
    avg_wait_time_days: float
    avg_capacity_gap_index: float
    equipment_older_than_10yr: int
    daily_imaging_volume: int
    data_source: str
