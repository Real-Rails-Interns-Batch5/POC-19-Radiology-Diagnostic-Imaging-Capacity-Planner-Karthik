from fastapi import APIRouter, Query
from typing import Optional
from models import KPISummary
from mock_data import HOSPITALS

router = APIRouter()

@router.get("/kpis", response_model=KPISummary)
def get_kpis(region: Optional[str] = None):
    target_hospitals = HOSPITALS
    if region:
        target_hospitals = [h for h in target_hospitals if h["region"].lower() == region.lower()]
        
    total_mri = sum(h["mri_count"] for h in target_hospitals)
    total_ct = sum(h["ct_count"] for h in target_hospitals)
    
    if len(target_hospitals) == 0:
        return {
            "total_mri_scanners": 0,
            "total_ct_scanners": 0,
            "avg_utilization_pct": 0.0,
            "avg_wait_time_days": 0.0,
            "avg_capacity_gap_index": 0.0,
            "equipment_older_than_10yr": 0,
            "daily_imaging_volume": 0,
            "data_source": "synthetic_mock"
        }
        
    avg_utilization = sum(h["daily_utilization_pct"] for h in target_hospitals) / len(target_hospitals)
    avg_wait = sum(h["avg_wait_time_days"] for h in target_hospitals) / len(target_hospitals)
    avg_capacity_gap = sum(h["capacity_gap_index"] for h in target_hospitals) / len(target_hospitals)
    older_than_10 = sum(1 for h in target_hospitals if h["equipment_age_years"] > 10)
    daily_volume = sum(h["daily_scan_volume"] for h in target_hospitals)
    
    return {
        "total_mri_scanners": total_mri,
        "total_ct_scanners": total_ct,
        "avg_utilization_pct": round(avg_utilization, 2),
        "avg_wait_time_days": round(avg_wait, 2),
        "avg_capacity_gap_index": round(avg_capacity_gap, 3),
        "equipment_older_than_10yr": older_than_10,
        "daily_imaging_volume": daily_volume,
        "data_source": "synthetic_mock"
    }
