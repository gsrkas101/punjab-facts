"""Punjab health — NFHS-4 (2015-16) vs NFHS-5 (2019-21).

Values from the National Family Health Survey Punjab factsheet, which reports both
the NFHS-4 and NFHS-5 columns (see data/sources.yml -> `nfhs5_punjab`).

`year` encodes the survey round: 2016 = NFHS-4 (2015-16), 2020 = NFHS-5 (2019-21).
The site maps these to "NFHS-4" / "NFHS-5" axis labels.

Run:  python -m pipelines.health.punjab_health   (from the repo root)
"""
from __future__ import annotations

import pandas as pd

from pipelines.common import write_processed

GEO = "Punjab"
SOURCE_ID = "nfhs5_punjab"
NFHS4, NFHS5 = 2016, 2020

# Percentage indicators, NFHS-4 -> NFHS-5. (year -> value)
NFHS_PCT = {
    "Institutional births":            {NFHS4: 91, NFHS5: 94},
    "Children under 5 stunted":        {NFHS4: 26, NFHS5: 25},
    "Children under 5 wasted":         {NFHS4: 16, NFHS5: 11},
    "Children 6-59 months anaemic":    {NFHS4: 57, NFHS5: 71},
}

# Headline stats with their own units.
KEY_STATS = [
    # (indicator, year, value, unit)
    ("Infant mortality rate", NFHS5, 28, "per 1,000 live births"),
    ("Sex ratio at birth", NFHS4, 860, "females per 1,000 males"),
    ("Sex ratio at birth", NFHS5, 904, "females per 1,000 males"),
]


def _pct_long() -> pd.DataFrame:
    rows = []
    for indicator, by_year in NFHS_PCT.items():
        for year, value in by_year.items():
            rows.append((indicator, GEO, year, value, "%", SOURCE_ID))
    return pd.DataFrame(rows, columns=["indicator", "geography", "year", "value", "unit", "source_id"])


def _stats_long() -> pd.DataFrame:
    rows = [(i, GEO, y, v, u, SOURCE_ID) for (i, y, v, u) in KEY_STATS]
    return pd.DataFrame(rows, columns=["indicator", "geography", "year", "value", "unit", "source_id"])


def main() -> None:
    write_processed(_pct_long(), "health_nfhs_pct")
    write_processed(_stats_long(), "health_key_stats")


if __name__ == "__main__":
    main()
