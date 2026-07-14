"""Load the provenance registry (data/sources.yml)."""
from __future__ import annotations

from pathlib import Path

import yaml

REPO_ROOT = Path(__file__).resolve().parents[2]
SOURCES_PATH = REPO_ROOT / "data" / "sources.yml"


def load_sources() -> dict[str, dict]:
    """Return the mapping of source_id -> source metadata."""
    with open(SOURCES_PATH, encoding="utf-8") as f:
        doc = yaml.safe_load(f) or {}
    return doc.get("sources", {})


def known_source_ids() -> set[str]:
    """Return the set of registered source_ids."""
    return set(load_sources().keys())
