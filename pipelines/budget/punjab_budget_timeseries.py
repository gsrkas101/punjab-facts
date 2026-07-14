"""Punjab budget — multi-year time series (2024-25 to 2026-27).

Figures transcribed from PRS Legislative Research, "Punjab Budget Analysis 2026-27",
retrieved 2026-07-14 (see data/sources.yml -> `prs_punjab_budget_2026_27`).

`year` uses the starting calendar year of the Indian fiscal year (FY 2026-27 -> 2026).
Per-year estimate basis (documented on the site's About page):
  2024 = Actuals · 2025 = Revised Estimate (RE) · 2026 = Budget Estimate (BE).

Run:  python -m pipelines.budget.punjab_budget_timeseries   (from the repo root)
"""
from __future__ import annotations

import pandas as pd

from pipelines.common import write_processed

SOURCE_ID = "prs_punjab_budget_2026_27"
GEO = "Punjab"
YEARS = [2024, 2025, 2026]

# ₹ crore. (year -> value), one dict per indicator.
RECEIPTS_EXPENDITURE = {
    "Revenue receipts":     {2024: 93207, 2025: 116516, 2026: 126190},
    "Revenue expenditure":  {2024: 125776, 2025: 143523, 2026: 148146},
}

# % of GSDP.
DEFICIT_GSDP = {
    "Fiscal deficit":   {2024: 4.7, 2025: 4.2, 2026: 4.1},
    "Revenue deficit":  {2024: 3.9, 2025: 3.0, 2026: 2.2},
}

# ₹ crore, current prices.
GSDP = {2024: 838637, 2025: 891487, 2026: 980635}


def _long(series: dict[str, dict[int, float]], unit: str) -> pd.DataFrame:
    rows = []
    for indicator, by_year in series.items():
        for year in YEARS:
            rows.append((indicator, GEO, year, by_year[year], unit, SOURCE_ID))
    return pd.DataFrame(rows, columns=["indicator", "geography", "year", "value", "unit", "source_id"])


def main() -> None:
    write_processed(_long(RECEIPTS_EXPENDITURE, "₹ crore"), "budget_receipts_expenditure")
    write_processed(_long(DEFICIT_GSDP, "% of GSDP"), "budget_deficit_gsdp")
    write_processed(
        _long({"GSDP (current prices)": GSDP}, "₹ crore"),
        "budget_gsdp_trend",
    )


if __name__ == "__main__":
    main()
