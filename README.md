# Stock-Studio

Auto-generate aset stock (video Remotion + metadata CSV) untuk upload ke Adobe Stock Contributor.

**Upload ke Adobe Stock tetap manual** lewat portal (Adobe tidak menyediakan API/SFTP contributor).

## Isi
- `AGENTS-CONTEXT.json` — konteks lengkap untuk agent (baca ini di percakapan baru)
- `skills/` — skill yang dipasang (Remotion + stock-metadata)
- `projects/stock-video/` — starter project Remotion (StockScene, variations.json, batch.mjs)
- `metadata/` — CSV metadata
- `.github/workflows/` — render batch di CI

## Mulai
Di percakapan OpenCode baru:
> Baca /storage/emulated/0/Stock-Studio/AGENTS-CONTEXT.json dan lanjutkan sesuai isinya.

## Pipeline
1. Install skill Remotion → `skills/remotion-*/`
2. Skill custom `stock-metadata` → `skills/stock-metadata/`
3. Project Remotion starter → `projects/stock-video/`
4. Batch render + generate `metadata/metadata.csv`
5. Upload manual via portal contributor.
