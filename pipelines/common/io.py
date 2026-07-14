"""Write validated processed datasets to data/processed/."""
from __future__ import annotations

from pathlib import Path

import pandas as pd

from .schema import CANONICAL_COLUMNS, validate_dataset
from .sources import known_source_ids

REPO_ROOT = Path(__file__).resolve().parents[2]
PROCESSED_DIR = REPO_ROOT / "data" / "processed"


def write_processed(df: pd.DataFrame, name: str) -> Path:
    """Validate `df` against the canonical schema and write it as CSV.

    `name` becomes the filename stem, e.g. name="budget_overview" ->
    data/processed/budget_overview.csv. Returns the output path.
    """
    validated = validate_dataset(df, known_source_ids=known_source_ids(), name=name)
    PROCESSED_DIR.mkdir(parents=True, exist_ok=True)
    out_path = PROCESSED_DIR / f"{name}.csv"
    validated[CANONICAL_COLUMNS].to_csv(out_path, index=False)
    print(f"[{name}] wrote {len(validated)} rows -> {out_path.relative_to(REPO_ROOT)}")
    return out_path
