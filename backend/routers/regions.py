from fastapi import APIRouter
from mock_data import REGIONS

router = APIRouter()

@router.get("/regions")
def get_regions():
    return {
        "data_source": "synthetic_mock",
        "regions": list(REGIONS.keys())
    }
