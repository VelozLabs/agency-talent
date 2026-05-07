#!/usr/bin/env bash
# Mid Tier Legends — clip.sh
# Usage: bash clip.sh <URL> <START> <END> <CROP_X>
#   URL     YouTube URL
#   START   timestamp like 00:01:23.5
#   END     timestamp like 00:01:43.5
#   CROP_X  horizontal crop offset for 1080p source (0=left, 236=center, 472=right)
#           For 720p source, swap crop=608:1080 to crop=405:720 below.

set -euo pipefail

URL="$1"
START="$2"
END="$3"
CROP_X="$4"
OUT="clip_$(date +%s).mp4"

# Grab best <=1080p mp4 segment (avoids re-downloading on tweaks)
yt-dlp -f 'bv*[height<=1080][ext=mp4]+ba[ext=m4a]/b[height<=1080]' \
       --download-sections "*${START}-${END}" \
       --force-keyframes-at-cuts \
       -o "src.mp4" "$URL"

# Crop 16:9 -> 9:16. For 1920x1080 source, output is 608x1080 (9:16).
# crop=W:H:X:Y  — width 608, full height 1080, X offset variable, Y=0
ffmpeg -y -i src.mp4 \
  -vf "crop=608:1080:${CROP_X}:0,scale=1080:1920:flags=lanczos" \
  -c:v libx264 -preset slow -crf 18 -pix_fmt yuv420p \
  -an -movflags +faststart "$OUT"

echo "Wrote $OUT — AirDrop/Drive to phone, open in CapCut."
