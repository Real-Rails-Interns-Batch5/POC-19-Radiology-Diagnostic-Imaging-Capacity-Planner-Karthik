"use client";

import React, { useEffect } from 'react';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { Hospital } from '@/lib/api';

const center: [number, number] = [24.0, 50.0];

function Recenter({ lat, lng }: { lat?: number; lng?: number }) {
  const map = useMap();
  useEffect(() => {
    if (lat && lng) {
      map.flyTo([lat, lng], 10);
    }
  }, [lat, lng, map]);
  return null;
}

const COLORS: Record<string, string> = {
  critical: '#ef4444',
  warning:  '#f59e0b',
  normal:   '#38BDF8',
};

const getRadius = (hospital: Hospital) => {
  const base = 6;
  const scale = Math.min(hospital.scanners_per_100k * 1.5, 10);
  return base + scale;
};

function createPulseIcon(alertLevel: string, color: string, isCritical: boolean): L.DivIcon {
  if (isCritical) {
    const html = `
      <div style="position:relative;width:12px;height:12px;">
        <div style="position:absolute;inset:0;border-radius:50%;background:${color};opacity:0.9;"></div>
        <div style="position:absolute;inset:-4px;border-radius:50%;border:2px solid ${color};animation:pulse 1.8s ease-out infinite;opacity:0.5;"></div>
      </div>`;
    return L.divIcon({
      className: '',
      html,
      iconSize: [12, 12],
      iconAnchor: [6, 6],
    });
  }

  return L.divIcon({
    className: '',
    html: `<div style="position:relative;"><div style="position:absolute;inset:0;border-radius:50%;background:${color};opacity:0.9;"></div></div>`,
    iconSize: [0, 0], // overridden per-marker via radius
    iconAnchor: [0, 0],
  });
}

export default function MapComponent({
  hospitals,
  onSelectHospital,
  selectedId,
}: {
  hospitals: Hospital[];
  onSelectHospital: (id: string) => void;
  selectedId: string | null;
}) {
  const selectedHospital = hospitals.find(h => h.id === selectedId);

  return (
    <div
      className="w-full relative z-0 overflow-hidden rounded-xl border border-[#1F2937]"
      style={{ height: '560px', minHeight: '560px' }}
    >
      <MapContainer center={center} zoom={5} style={{ height: '560px', width: '100%', background: '#0B1117' }}>
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        {hospitals.map(h => {
          const radius = getRadius(h);
          const color = COLORS[h.alert_level] ?? COLORS.normal;
          const isCritical = h.alert_level === 'critical';
          const size = isCritical ? 12 : radius * 2;
          const icon = isCritical
            ? createPulseIcon(h.alert_level, color, true)
            : L.divIcon({
                className: '',
                html: `<div style="width:${size}px;height:${size}px;border-radius:50%;background:${color};opacity:0.9;"></div>`,
                iconSize: [size, size],
                iconAnchor: [size / 2, size / 2],
              });
          const isSelected = h.id === selectedId;

          return (
            <Marker
              key={h.id}
              position={[h.lat, h.lng]}
              icon={icon}
              eventHandlers={{ click: () => onSelectHospital(h.id) }}
            >
              <Popup>
                <div style={{ color: '#f8fafc', fontSize: '12px', minWidth: '160px' }}>
                  <strong style={{ display: 'block', marginBottom: '4px', fontSize: '13px' }}>
                    {isSelected ? '▶ ' : ''}{h.name}
                  </strong>
                  <div>Region: {h.region}</div>
                  <div>Alert: <span style={{ textTransform: 'uppercase' }}>{h.alert_level}</span></div>
                  <div>Utilization: {h.daily_utilization_pct}%</div>
                  <div>Wait: {h.avg_wait_time_days} days</div>
                  <div>Scanners/100k: {h.scanners_per_100k}</div>
                </div>
              </Popup>
            </Marker>
          );
        })}

        {selectedHospital && (
          <Recenter lat={selectedHospital.lat} lng={selectedHospital.lng} />
        )}
      </MapContainer>

      <style jsx global>{`
        .leaflet-container { font-family: inherit; }
        .leaflet-popup-content-wrapper {
          background: #0B1117;
          color: #f8fafc;
          border: 1px solid #1F2937;
          border-radius: 6px;
          box-shadow: 0 0 16px rgba(56,189,248,0.15);
        }
        .leaflet-popup-tip { background: #0B1117; }
        .leaflet-popup-close-button { color: #9CA3AF !important; }
        .leaflet-popup-close-button:hover { color: #38BDF8 !important; }
      `}</style>
    </div>
  );
}
