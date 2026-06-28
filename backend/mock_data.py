import uuid
import random

# Regions and their approximate lat/lng
REGIONS = {
    "Riyadh": {"lat": 24.7136, "lng": 46.6753},
    "Jeddah": {"lat": 21.4858, "lng": 39.1925},
    "Dubai": {"lat": 25.2048, "lng": 55.2708},
    "Abu Dhabi": {"lat": 24.4539, "lng": 54.3773},
    "Doha": {"lat": 25.2854, "lng": 51.5310},
    "Kuwait City": {"lat": 29.3759, "lng": 47.9774}
}

MAINTENANCE_STATUSES = ["operational", "partial", "under_maintenance"]
EQUIPMENT_TYPES = ["MRI", "CT", "Both"]

def generate_hospitals(count=40):
    hospitals = []
    regions_list = list(REGIONS.keys())
    for i in range(count):
        region = random.choice(regions_list)
        base_lat = REGIONS[region]["lat"]
        base_lng = REGIONS[region]["lng"]
        
        # Add slight variation to lat/lng for different hospitals in the same region
        lat = base_lat + random.uniform(-0.05, 0.05)
        lng = base_lng + random.uniform(-0.05, 0.05)
        
        mri_count = random.randint(1, 6)
        ct_count = random.randint(1, 8)
        population_served = random.randint(50000, 500000)
        daily_scan_volume = random.randint(40, 300)
        avg_wait_time_days = round(random.uniform(1.5, 21.0), 1)
        daily_utilization_pct = round(random.uniform(45.0, 98.0), 1)
        maintenance_status = random.choice(MAINTENANCE_STATUSES)
        equipment_age_years = round(random.uniform(1.0, 18.0), 1)
        equipment_type = random.choice(EQUIPMENT_TYPES)
        
        capacity_gap_index = round((avg_wait_time_days / 21) * (daily_utilization_pct / 100), 3)
        scanners_per_100k = round(((mri_count + ct_count) / population_served) * 100000, 2)
        
        if daily_utilization_pct > 90 or avg_wait_time_days > 14 or equipment_age_years > 12:
            alert_level = "critical"
        elif daily_utilization_pct > 75 or avg_wait_time_days > 7 or equipment_age_years > 8:
            alert_level = "warning"
        else:
            alert_level = "normal"
            
        if equipment_age_years > 12 and maintenance_status == "under_maintenance":
            replacement_priority = "immediate"
        elif equipment_age_years > 8:
            replacement_priority = "scheduled"
        else:
            replacement_priority = "monitor"

        hospitals.append({
            "id": str(uuid.uuid4()),
            "name": f"{region} {random.choice(['National', 'General', 'University', 'Specialist', 'City'])} Hospital {i+1}",
            "region": region,
            "lat": round(lat, 6),
            "lng": round(lng, 6),
            "mri_count": mri_count,
            "ct_count": ct_count,
            "population_served": population_served,
            "daily_scan_volume": daily_scan_volume,
            "avg_wait_time_days": avg_wait_time_days,
            "daily_utilization_pct": daily_utilization_pct,
            "maintenance_status": maintenance_status,
            "equipment_age_years": equipment_age_years,
            "equipment_type": equipment_type,
            "capacity_gap_index": capacity_gap_index,
            "scanners_per_100k": scanners_per_100k,
            "alert_level": alert_level,
            "replacement_priority": replacement_priority,
        })
    return hospitals

HOSPITALS = generate_hospitals(40)

def generate_wait_trends(hospitals):
    trends = {}
    months = ["Jan 2024", "Feb 2024", "Mar 2024", "Apr 2024", "May 2024", "Jun 2024", 
              "Jul 2024", "Aug 2024", "Sep 2024", "Oct 2024", "Nov 2024", "Dec 2024"]
    for h in hospitals:
        base_wait = h["avg_wait_time_days"]
        trends[h["id"]] = [
            {"month": month, "avg_wait_days": round(max(1.0, base_wait + random.uniform(-3.0, 3.0)), 1)}
            for month in months
        ]
    return trends

WAIT_TRENDS = generate_wait_trends(HOSPITALS)
