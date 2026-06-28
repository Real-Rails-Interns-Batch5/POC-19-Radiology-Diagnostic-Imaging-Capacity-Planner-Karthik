from fastapi import APIRouter, HTTPException, Query
from typing import Optional, List
from models import Hospital, WaitTimeTrend
from mock_data import HOSPITALS, WAIT_TRENDS

router = APIRouter()

@router.get("/hospitals")
def get_hospitals(
    region: Optional[str] = None,
    modality: Optional[str] = None,
    maintenance_status: Optional[str] = None,
    min_utilization: Optional[float] = None,
    max_wait_time: Optional[float] = None
):
    filtered_hospitals = HOSPITALS
    
    if region:
        filtered_hospitals = [h for h in filtered_hospitals if h["region"].lower() == region.lower()]
    if modality:
        filtered_hospitals = [h for h in filtered_hospitals if h["equipment_type"].lower() == modality.lower()]
    if maintenance_status:
        filtered_hospitals = [h for h in filtered_hospitals if h["maintenance_status"].lower() == maintenance_status.lower()]
    if min_utilization is not None:
        filtered_hospitals = [h for h in filtered_hospitals if h["daily_utilization_pct"] >= min_utilization]
    if max_wait_time is not None:
        filtered_hospitals = [h for h in filtered_hospitals if h["avg_wait_time_days"] <= max_wait_time]
        
    return {
        "data_source": "synthetic_mock",
        "hospitals": filtered_hospitals
    }

@router.get("/hospitals/{id}")
def get_hospital(id: str):
    hospital = next((h for h in HOSPITALS if h["id"] == id), None)
    if not hospital:
        raise HTTPException(status_code=404, detail="Hospital not found")
        
    wait_trend = WAIT_TRENDS.get(id, [])
    
    return {
        "data_source": "synthetic_mock",
        "hospital": hospital,
        "wait_trend": wait_trend
    }
