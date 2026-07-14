"""Punjab agriculture — the granary and the water bill underneath it.

Sources (see data/sources.yml):
  - Wheat procurement RMS 2024-25: FCI via PIB (`fci_wheat_rms_2024_25`).
      Punjab 124.26 lakh tonnes of the 266 lakh-tonne national total;
      "Rest of India" is computed as the difference.
  - Groundwater: CGWB "Dynamic Ground Water Resources of India, 2023"
      (`cgwb_dynamic_2023`): recharge 18.84 bcm, extractable 16.98 bcm,
      extraction 27.8 bcm; stage of extraction 163.76%; 117 of 153 blocks
      over-exploited.
  - Agriculture & allied share of GSVA (~27%, 2023-24 AE): Punjab Economic
      Survey 2023-24 (`punjab_economic_survey_2023_24`).
  - Average operational holding 3.62 ha: Agriculture Census 2015-16
      (`agri_census_2015_16`).

`year` uses the starting calendar year of the relevant period
(RMS 2024-25 -> 2024; CGWB 2023 assessment -> 2023; Ag Census 2015-16 -> 2015).

Run:  python -m pipelines.agriculture.punjab_agriculture   (from the repo root)
"""
from __future__ import annotations

import pandas as pd

from pipelines.common import write_processed

GEO = "Punjab"
COLS = ["indicator", "geography", "year", "value", "unit", "source_id"]

# RMS 2024-25 wheat procurement (lakh tonnes). National total: 266 LMT.
WHEAT_PROCUREMENT = [
    ("Punjab", GEO, 2024, 124.26, "lakh tonnes", "fci_wheat_rms_2024_25"),
    ("Rest of India", "India (excl. Punjab)", 2024, 141.74, "lakh tonnes", "fci_wheat_rms_2024_25"),
]

# CGWB 2023 groundwater balance (billion cubic metres per year).
GROUNDWATER = [
    ("Annual recharge", GEO, 2023, 18.84, "bcm", "cgwb_dynamic_2023"),
    ("Extractable resource", GEO, 2023, 16.98, "bcm", "cgwb_dynamic_2023"),
    ("Actual extraction", GEO, 2023, 27.80, "bcm", "cgwb_dynamic_2023"),
]

# Headline stats.
KEY_STATS = [
    ("Agriculture & allied share of GSVA", GEO, 2023, 27, "% of GSVA", "punjab_economic_survey_2023_24"),
    ("Average operational holding", GEO, 2015, 3.62, "hectares", "agri_census_2015_16"),
    ("Stage of groundwater extraction", GEO, 2023, 163.76, "%", "cgwb_dynamic_2023"),
    ("Over-exploited blocks", GEO, 2023, 117, "of 153 blocks", "cgwb_dynamic_2023"),
    ("Punjab share of wheat procurement", GEO, 2024, 46.7, "% of national", "fci_wheat_rms_2024_25"),
]


def main() -> None:
    write_processed(pd.DataFrame(WHEAT_PROCUREMENT, columns=COLS), "agri_wheat_procurement")
    write_processed(pd.DataFrame(GROUNDWATER, columns=COLS), "agri_groundwater")
    write_processed(pd.DataFrame(KEY_STATS, columns=COLS), "agri_key_stats")


if __name__ == "__main__":
    main()
