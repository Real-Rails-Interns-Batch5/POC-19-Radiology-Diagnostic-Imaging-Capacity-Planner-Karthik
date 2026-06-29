# 🏥 Radiology & Diagnostic Imaging Capacity Planner

> **POC-19** — A proof-of-concept dashboard for monitoring and planning radiology equipment capacity across hospitals in the GCC region (Saudi Arabia, UAE, Qatar, Kuwait).

---

## 📌 Overview

The **Radiology & Diagnostic Imaging Capacity Planner** is a full-stack web application that provides healthcare administrators and planners with real-time visibility into MRI and CT scanner availability, utilization, wait times, and equipment health across a network of hospitals. It enables data-driven decision making for equipment procurement, maintenance scheduling, and capacity gap analysis.

> ⚠️ **Note:** This is a POC application using **synthetic mock data** — no real patient or hospital data is used.

---

## ✨ Features

| Feature | Description |
|---|---|
| 🗺️ **Interactive Map** | Geospatial visualization of all hospitals, color-coded by alert level (critical / warning / normal) |
| 📊 **KPI Strip** | Key metrics at a glance — total MRI/CT scanners, avg utilization %, avg wait time, daily scan volume |
| 📈 **Charts Panel** | Wait time trends, equipment age distribution, and capacity gap analysis charts |
| 🏥 **Hospitals Table** | Searchable, sortable table of all hospitals with equipment and operational details |
| 🔍 **Sidebar Filters** | Filter hospitals by region, modality (MRI/CT/Both), maintenance status, and alert level |
| 📋 **Hospital Drill-down** | Click any hospital to see its 12-month wait time trend |

---

## 🏗️ Architecture

```
POC-19-Radiology-Capacity-Planner/
├── backend/                  # FastAPI Python backend
│   ├── main.py               # App entry point, CORS config, router registration
│   ├── models.py             # Pydantic data models (Hospital, KPISummary, etc.)
│   ├── mock_data.py          # Synthetic hospital data generator (40 hospitals)
│   ├── requirements.txt      # Python dependencies
│   └── routers/
│       ├── hospitals.py      # GET /api/hospitals — list & filter hospitals
│       ├── regions.py        # GET /api/regions — available regions
│       ├── equipment.py      # GET /api/equipment — age distribution & capacity gap
│       └── kpis.py           # GET /api/kpis — aggregated KPI summary
│
└── frontend/                 # Next.js 16 + TypeScript frontend
    └── src/
        ├── app/
        │   ├── layout.tsx    # Root layout
        │   └── page.tsx      # Main dashboard page
        └── components/
            ├── Map.tsx           # Leaflet interactive map
            ├── KPIStrip.tsx      # Top KPI metric cards
            ├── ChartsPanel.tsx   # Recharts-based chart panel
            ├── HospitalsTable.tsx  # TanStack Table hospital grid
            └── Sidebar.tsx       # Filter sidebar
```

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **FastAPI** | REST API framework |
| **Uvicorn** | ASGI server |
| **Pydantic** | Data validation & serialization |
| **Pandas** | Data manipulation |
| **Python-dotenv** | Environment variable management |

### Frontend
| Technology | Purpose |
|---|---|
| **Next.js 16** | React framework with App Router |
| **TypeScript** | Type safety |
| **Tailwind CSS v4** | Utility-first styling |
| **Recharts** | Charts & data visualization |
| **React-Leaflet** | Interactive map |
| **TanStack Table v8** | Advanced data table |
| **Lucide React** | Icon library |

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `GET` | `/api/hospitals` | List hospitals (supports `?region=`, `?modality=`, `?maintenance_status=`) |
| `GET` | `/api/hospitals/{id}` | Hospital details with 12-month wait trend |
| `GET` | `/api/regions` | List of all unique regions |
| `GET` | `/api/kpis` | KPI summary (supports `?region=` filter) |
| `GET` | `/api/equipment/age-distribution` | Equipment age bucket counts |
| `GET` | `/api/equipment/capacity-gap` | Per-hospital capacity gap index |

---

## 🗺️ Regions Covered

- 🇸🇦 **Riyadh** (Saudi Arabia)
- 🇸🇦 **Jeddah** (Saudi Arabia)
- 🇦🇪 **Dubai** (UAE)
- 🇦🇪 **Abu Dhabi** (UAE)
- 🇶🇦 **Doha** (Qatar)
- 🇰🇼 **Kuwait City** (Kuwait)

---

## 🚀 Getting Started

### Prerequisites

- **Python** 3.10+
- **Node.js** 18+ and **npm**

---

### 1. Clone the Repository

```bash
git clone https://github.com/your-org/POC-19-Radiology-Diagnostic-Imaging-Capacity-Planner-Karthik.git
cd POC-19-Radiology-Diagnostic-Imaging-Capacity-Planner-Karthik
```

---

### 2. Backend Setup

```bash
cd backend

# Create and activate a virtual environment
python -m venv venv

# Windows
venv\Scripts\activate

# macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start the backend server
uvicorn main:app --reload --port 8000
```

The backend API will be available at: **http://localhost:8000**

Interactive API docs (Swagger UI): **http://localhost:8000/docs**

---

### 3. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at: **http://localhost:3000**

---

## 📊 Data Model

### Hospital

```python
Hospital:
  id                    # Unique UUID
  name                  # e.g. "Dubai General Hospital 5"
  region                # One of the 6 GCC regions
  lat, lng              # Geographic coordinates
  mri_count             # Number of MRI scanners (1-6)
  ct_count              # Number of CT scanners (1-8)
  population_served     # 50,000 - 500,000
  daily_scan_volume     # 40 - 300 scans/day
  avg_wait_time_days    # 1.5 - 21.0 days
  daily_utilization_pct # 45% - 98%
  maintenance_status    # operational | partial | under_maintenance
  equipment_age_years   # 1 - 18 years
  equipment_type        # MRI | CT | Both
  capacity_gap_index    # Computed: (wait_days/21) x (utilization/100)
  scanners_per_100k     # Computed: scanners per 100,000 population
  alert_level           # critical | warning | normal
  replacement_priority  # immediate | scheduled | monitor
```

### Alert Level Logic

| Condition | Alert Level |
|---|---|
| Utilization > 90% OR Wait > 14 days OR Age > 12 yrs | 🔴 Critical |
| Utilization > 75% OR Wait > 7 days OR Age > 8 yrs | 🟡 Warning |
| Otherwise | 🟢 Normal |

### Replacement Priority Logic

| Condition | Priority |
|---|---|
| Age > 12 yrs AND under maintenance | ⚡ Immediate |
| Age > 8 yrs | 📅 Scheduled |
| Otherwise | 👁️ Monitor |

---

## 🧪 Running the Full Stack

Make sure both servers are running simultaneously:

| Service | URL | Command |
|---|---|---|
| Backend API | http://localhost:8000 | `uvicorn main:app --reload` (in `/backend`) |
| Frontend App | http://localhost:3000 | `npm run dev` (in `/frontend`) |
| API Docs | http://localhost:8000/docs | (auto-generated by FastAPI) |

---

## 📁 Environment Variables

The backend uses `python-dotenv`. Create a `.env` file in the `backend/` directory if needed:

```env
# backend/.env (optional, currently no required variables for POC)
# Future: DATABASE_URL, API_KEYS, etc.
```

---

## 🔮 Future Enhancements

- [ ] Connect to a real PostgreSQL / Azure SQL database
- [ ] Add authentication (Azure AD / SAML)
- [ ] Enable CSV/Excel data import for real hospital data
- [ ] Procurement workflow integration
- [ ] Email/SMS alerting for critical hospitals
- [ ] Role-based access control (admin, planner, viewer)
- [ ] Historical data storage and trend analysis
- [ ] Integration with hospital management systems (HIS/RIS/PACS)

---

## 👨‍💻 Author

**Karthik** — POC-19, Real Rails Interns Batch 5

---

## 📄 License

This project is a proof-of-concept built for internal evaluation purposes. All data is synthetic.
