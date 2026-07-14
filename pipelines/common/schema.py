"""Canonical tidy schema and validation for processed Punjab Facts datasets.

Every processed dataset is a long/tidy table with exactly these columns, so the
site can treat all indicators uniformly and always render a source link.
"""
from __future__ import annotations

import pandas as pd

# The canonical column order for every processed dataset.
CANONICAL_COLUMNS = ["indicator", "geography", "year", "value", "unit", "source_id"]


def validate_dataset(
    df: pd.DataFrame,
    *,
    known_source_ids: set[str],
    name: str = "dataset",
) -> pd.DataFrame:
    """Validate a processed dataset against the canonical contract.

    Raises ValueError on any violation; returns the (column-ordered) frame on success.
    """
    missing = [c for c in CANONICAL_COLUMNS if c not in df.columns]
    if missing:
        raise ValueError(f"[{name}] missing required columns: {missing}")

    for col in CANONICAL_COLUMNS:
        if df[col].isna().any():
            raise ValueError(f"[{name}] column '{col}' contains null values")

    years = pd.to_numeric(df["year"], errors="coerce")
    if years.isna().any() or not years.between(1900, 2100).all():
        raise ValueError(f"[{name}] 'year' must be integers within 1900-2100")

    if not pd.to_numeric(df["value"], errors="coerce").notna().all():
        raise ValueError(f"[{name}] 'value' must be numeric")

    unknown = set(df["source_id"].astype(str)) - known_source_ids
    if unknown:
        raise ValueError(
            f"[{name}] source_id(s) not registered in data/sources.yml: {sorted(unknown)}"
        )

    return df[CANONICAL_COLUMNS].copy()
