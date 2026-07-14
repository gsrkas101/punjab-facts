"""Punjab budget 2026-27 — key aggregates and sector allocations.

Figures transcribed from the PRS Legislative Research "Punjab Budget Analysis
2026-27" (budget estimates), retrieved 2026-07-14. See data/sources.yml ->
`prs_punjab_budget_2026_27`. Numbers are in rupees crore.

`year` uses the starting calendar year of the Indian fiscal year, i.e. FY 2026-27
is represented as 2026. This convention is documented in the About & methodology page.

Run:  python -m pipelines.budget.punjab_budget_2026_27   (from the repo root)
"""
from __future__ import annotations

import pandas as pd

from pipelines.common import write_processed

SOURCE_ID = "prs_punjab_budget_2026_27"
YEAR = 2026  # FY 2026-27
GEO = "Punjab"
UNIT = "₹ crore"

# Key fiscal aggregates (budget estimates, ₹ crore).
OVERVIEW = [
    ("Total expenditure", 166711),
    ("Total receipts", 126740),
    ("Own tax revenue", 70851),
    ("Revenue deficit", 21955),
    ("Fiscal deficit", 39971),
    ("GSDP (current prices)", 980635),
]

# Budgeted expenditure by major sector (₹ crore).
BY_SECTOR = [
    ("Education, Sports, Arts & Culture", 21503),
    ("Social Welfare & Nutrition", 18775),
    ("Agriculture & Allied Activities", 15281),
    ("Police", 9214),
    ("Health & Family Welfare", 7787),
    ("Energy", 5798),
    ("Transport", 5153),
    ("Urban Development", 2945),
    ("Irrigation & Flood Control", 2943),
    ("Rural Development", 2858),
]


def _frame(rows: list[tuple[str, int]]) -> pd.DataFrame:
    df = pd.DataFrame(rows, columns=["indicator", "value"])
    df["geography"] = GEO
    df["year"] = YEAR
    df["unit"] = UNIT
    df["source_id"] = SOURCE_ID
    return df


def main() -> None:
    write_processed(_frame(OVERVIEW), "budget_overview")
    write_processed(_frame(BY_SECTOR), "budget_by_sector")


if __name__ == "__main__":
    main()
