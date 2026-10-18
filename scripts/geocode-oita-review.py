"""Create unverified Oita facility coordinate candidates for pre-release review.

Uses the public Nominatim search endpoint once per facility, sequentially,
with a delay, an identifying User-Agent, and a local checkpoint cache.
These results are suggestions only and must be reviewed before publication.
"""

import json
import time
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LINKS_FILE = ROOT / "assets" / "map-source-links.js"
OUTPUT_FILE = ROOT / "assets" / "oita-geocode-review.json"
USER_AGENT = "KumamotoPetNavi/1.0 (Oita prepublication coordinate review)"
DELAY_SECONDS = 1.15


def load_candidates():
    source = (ROOT / "assets" / "oita-hospitals.js").read_text(encoding="utf-8")
    start = source.index("=", source.index("window.oitaHospitals")) + 1
    end = source.index("].map", start) + 1
    rows = json.loads(source[start:end])
    return [
        {"name": row[0], "address": row[3]}
        for row in rows
        if len(row) > 3 and row[3].strip()
    ]


def save(records):
    OUTPUT_FILE.write_text(
        json.dumps(
            {
                "provider": "OpenStreetMap Nominatim",
                "attribution": "© OpenStreetMap contributors",
                "reviewRequired": True,
                "records": records,
            },
            ensure_ascii=False,
            indent=2,
        )
        + "\n",
        encoding="utf-8",
    )


def main():
    candidates = load_candidates()
    existing = {}
    if OUTPUT_FILE.exists():
        try:
            cached = json.loads(OUTPUT_FILE.read_text(encoding="utf-8"))
            existing = {item["name"]: item for item in cached.get("records", [])}
        except (json.JSONDecodeError, KeyError, TypeError):
            existing = {}

    candidate_names = {item["name"] for item in candidates}
    records = [item for name, item in existing.items() if name not in candidate_names]
    completed = {}
    for candidate in candidates:
        old = existing.get(candidate["name"])
        expected_query = f"{candidate['name']}, {candidate['address']}, Oita Prefecture, Japan"
        if old and old.get("query") == expected_query:
            completed[candidate["name"]] = old
    records.extend(completed.values())
    save(records)
    for candidate in candidates:
        name = candidate["name"]
        if name in completed:
            continue
        query = f"{name}, {candidate['address']}, Oita Prefecture, Japan"
        params = urllib.parse.urlencode(
            {"q": query, "format": "jsonv2", "limit": 1, "addressdetails": 1}
        )
        request = urllib.request.Request(
            f"https://nominatim.openstreetmap.org/search?{params}",
            headers={"User-Agent": USER_AGENT, "Accept": "application/json"},
        )
        try:
            with urllib.request.urlopen(request, timeout=20) as response:
                matches = json.load(response)
            match = matches[0] if matches else None
            record = {
                "name": name,
                "officialAddress": candidate["address"],
                "query": query,
                "status": "candidate-unverified" if match else "no-match",
                "lat": float(match["lat"]) if match else None,
                "lng": float(match["lon"]) if match else None,
                "displayName": match.get("display_name") if match else None,
                "osmType": match.get("osm_type") if match else None,
                "osmId": match.get("osm_id") if match else None,
                "matchType": match.get("type") if match else None,
            }
        except Exception as error:  # preserve failures for a safe manual retry
            record = {
                "name": name,
                "query": query,
                "status": "lookup-error",
                "error": type(error).__name__,
                "lat": None,
                "lng": None,
            }
        records.append(record)
        save(records)
        print(f"{len(records)}/{len(candidates)} {name}: {record['status']}", flush=True)
        time.sleep(DELAY_SECONDS)


if __name__ == "__main__":
    main()
