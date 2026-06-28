from fastapi import APIRouter
from mock_data import HOSPITALS

router = APIRouter()

@router.get("/equipment/age-distribution")
def get_age_distribution():
    buckets = [
        {"label": "0–3 yrs", "count": 0},
        {"label": "4–6 yrs", "count": 0},
        {"label": "7–10 yrs", "count": 0},
        {"label": "10+ yrs", "count": 0}
    ]
    
    for h in HOSPITALS:
        age = h["equipment_age_years"]
        if age <= 3:
            buckets[0]["count"] += 1
        elif age <= 6:
            buckets[1]["count"] += 1
        elif age <= 10:
            buckets[2]["count"] += 1
        else:
            buckets[3]["count"] += 1
            
    return {
        "data_source": "synthetic_mock",
        "buckets": buckets
    }

@router.get("/equipment/capacity-gap")
def get_capacity_gap():
    sorted_hospitals = sorted(HOSPITALS, key=lambda x: x["capacity_gap_index"], reverse=True)
    
    mapped_hospitals = [
        {
            "name": h["name"],
            "region": h["region"],
            "capacity_gap_index": h["capacity_gap_index"],
            "avg_wait_time_days": h["avg_wait_time_days"],
            "daily_utilization_pct": h["daily_utilization_pct"]
        }
        for h in sorted_hospitals
    ]
    
    return {
        "data_source": "synthetic_mock",
        "hospitals": mapped_hospitals
    }
