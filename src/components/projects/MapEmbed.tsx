export function MapEmbed({ lat, lng, name }: { lat: number; lng: number; name: string }) {
  const d = 0.004;
  const bbox = [lng - d, lat - d * 0.75, lng + d, lat + d * 0.75].join(",");
  const src = `https://www.openstreetmap.org/export/embed.html?bbox=${encodeURIComponent(bbox)}&layer=mapnik&marker=${lat},${lng}`;
  return (
    <div>
      <iframe title={`Map showing ${name}`} src={src} loading="lazy" className="h-[360px] w-full border border-line" />
      <a
        href={`https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=17/${lat}/${lng}`}
        rel="noopener noreferrer"
        className="mt-3 inline-block text-sm underline underline-offset-4"
      >
        Open a larger map
      </a>
    </div>
  );
}
