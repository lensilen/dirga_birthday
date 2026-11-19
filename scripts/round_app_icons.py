from pathlib import Path
from shutil import copy2

from PIL import Image, ImageDraw


ICON_DIR = Path(__file__).resolve().parents[1] / "dist" / "assets" / "icons" / "apps"
CORNER_RADIUS_RATIO = 0.225
ANTIALIAS_SCALE = 4


def rounded_mask(size: tuple[int, int]) -> Image.Image:
    width, height = size
    scale = ANTIALIAS_SCALE
    scaled_size = (width * scale, height * scale)
    radius = round(min(width, height) * CORNER_RADIUS_RATIO * scale)
    mask = Image.new("L", scaled_size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle(
        (0, 0, scaled_size[0] - 1, scaled_size[1] - 1),
        radius=radius,
        fill=255,
    )
    return mask.resize(size, Image.Resampling.LANCZOS)


def convert_icon(source: Path) -> Path:
    output = source.with_suffix(".png")

    # Preserve a pre-existing PNG with the same stem before replacing it.
    backup = output.with_name(f"{output.stem}-original.png")
    if output.exists() and not backup.exists():
        copy2(output, backup)

    with Image.open(source) as image:
        rgba = image.convert("RGBA")
        rgba.putalpha(rounded_mask(rgba.size))
        rgba.save(output, format="PNG", optimize=True)

    return output


def main() -> None:
    sources = sorted(ICON_DIR.glob("*.jpg")) + sorted(ICON_DIR.glob("*.jpeg"))
    if not sources:
        raise SystemExit(f"No JPG icons found in {ICON_DIR}")

    for source in sources:
        output = convert_icon(source)
        print(f"{source.name} -> {output.name}")


if __name__ == "__main__":
    main()
