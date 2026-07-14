"""Punjab education — literacy (Census 2011) and schools/enrolment (UDISE+ 2024-25).

Sources (see data/sources.yml):
  - Literacy: Census of India 2011 (`census_2011`).
  - Schools & enrolment: UDISE+ 2024-25 (`udise_plus`).

`year` uses the starting calendar year (UDISE+ 2024-25 -> 2024).

Run:  python -m pipelines.education.punjab_education   (from the repo root)
"""
from __future__ import annotations

import pandas as pd

from pipelines.common import write_processed

GEO = "Punjab"

# Census 2011 literacy (%).
LITERACY = [
    ("Overall", 75.84),
    ("Male", 80.44),
    ("Female", 70.73),
]

# UDISE+ 2024-25 — recognised schools by management (count).
SCHOOLS = [
    ("Government", 19243),
    ("Private unaided", 7589),
    ("Government-aided", 437),
]

# UDISE+ 2024-25 — students enrolled (lakh).
ENROLMENT = [
    ("Government schools", 26.69),
    ("Private unaided schools", 30.63),
]


def _frame(rows, *, year, unit, source_id):
    df = pd.DataFrame(rows, columns=["indicator", "value"])
    df["geography"] = GEO
    df["year"] = year
    df["unit"] = unit
    df["source_id"] = source_id
    return df


def main() -> None:
    write_processed(_frame(LITERACY, year=2011, unit="%", source_id="census_2011"),
                    "education_literacy")
    write_processed(_frame(SCHOOLS, year=2024, unit="schools", source_id="udise_plus"),
                    "education_schools")
    write_processed(_frame(ENROLMENT, year=2024, unit="lakh students", source_id="udise_plus"),
                    "education_enrolment")


if __name__ == "__main__":
    main()
