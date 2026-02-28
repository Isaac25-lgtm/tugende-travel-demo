'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Navbar } from '@/components/layout/navbar';
import { Chip } from '@/components/ui/chip';
import { Badge } from '@/components/ui/badge';
import { X, MapPin, Clock, DollarSign } from 'lucide-react';
import { destinations } from '@/data/seed-destinations';
import { CATEGORY_COLORS, CATEGORY_LABELS, MAPBOX_CENTER, MAPBOX_ZOOM } from '@/lib/utils/constants';
import type { Destination, DestinationCategory } from '@/types/destination';

const CATEGORY_OPTIONS: { value: DestinationCategory | 'all'; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'wildlife', label: 'Wildlife' },
  { value: 'adventure', label: 'Adventure' },
  { value: 'culture', label: 'Culture' },
  { value: 'nature', label: 'Nature' },
  { value: 'relaxation', label: 'Relaxation' },
];

export default function MapPage() {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);
  const [category, setCategory] = useState<DestinationCategory | 'all'>('all');
  const [selected, setSelected] = useState<Destination | null>(null);
  const [mapReady, setMapReady] = useState(false);

  const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

  useEffect(() => {
    if (!mapContainer.current || !token || map.current) return;

    mapboxgl.accessToken = token;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/outdoors-v12',
      center: MAPBOX_CENTER,
      zoom: MAPBOX_ZOOM,
      minZoom: 5,
      maxZoom: 14,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');
    map.current.on('load', () => setMapReady(true));

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [token]);

  useEffect(() => {
    if (!map.current || !mapReady) return;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    const filtered = category === 'all'
      ? destinations
      : destinations.filter(d => d.categories.includes(category));

    filtered.forEach(d => {
      const mainCat = d.categories[0];
      const color = CATEGORY_COLORS[mainCat] || '#1B4332';

      const el = document.createElement('div');
      el.className = 'cursor-pointer';
      el.innerHTML = `
        <div style="
          width: 32px; height: 32px; border-radius: 50%;
          background: ${color}; border: 3px solid white;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          display: flex; align-items: center; justify-content: center;
          transition: transform 0.2s;
        ">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
        </div>
      `;
      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.2)';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([d.coordinates[1], d.coordinates[0]])
        .addTo(map.current!);

      el.addEventListener('click', () => {
        setSelected(d);
        map.current?.flyTo({
          center: [d.coordinates[1], d.coordinates[0]],
          zoom: 10,
          duration: 1500,
        });
      });

      markersRef.current.push(marker);
    });
  }, [category, mapReady]);

  return (
    <>
      <Navbar />
      <main className="h-screen pt-16 relative">
        {/* Map */}
        <div ref={mapContainer} className="w-full h-full" />

        {/* Fallback if no token */}
        {!token && (
          <div className="absolute inset-0 top-16 flex items-center justify-center bg-bg-light">
            <div className="text-center p-8">
              <MapPin className="w-12 h-12 text-text-muted mx-auto mb-4" />
              <h2 className="font-display text-2xl font-bold text-text-primary mb-2">Map Coming Soon</h2>
              <p className="text-text-secondary max-w-md">
                Add your Mapbox token as NEXT_PUBLIC_MAPBOX_TOKEN to enable the interactive Uganda map.
              </p>
            </div>
          </div>
        )}

        {/* Category Filters */}
        <div className="absolute top-20 left-4 right-4 md:left-6 z-10">
          <div className="flex flex-wrap gap-2">
            {CATEGORY_OPTIONS.map(opt => (
              <Chip
                key={opt.value}
                selected={category === opt.value}
                onClick={() => setCategory(opt.value)}
                className="shadow-md bg-surface"
              >
                {opt.label}
              </Chip>
            ))}
          </div>
        </div>

        {/* Selected Destination Panel */}
        <AnimatePresence>
          {selected && (
            <motion.div
              initial={{ y: '100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', bounce: 0.15, duration: 0.5 }}
              className="absolute bottom-0 left-0 right-0 md:bottom-6 md:left-6 md:right-auto md:w-96 z-10"
            >
              <div className="bg-surface rounded-t-2xl md:rounded-xl shadow-elevated overflow-hidden">
                <div className="relative h-40">
                  <img src={selected.heroImage} alt={selected.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <button
                    onClick={() => setSelected(null)}
                    className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/30 flex items-center justify-center text-white hover:bg-black/50 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="font-display text-lg font-bold text-white">{selected.name}</h3>
                    <p className="text-white/70 text-xs">{selected.region} Uganda</p>
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-sm text-text-secondary leading-relaxed">{selected.whyGoHere}</p>
                  <div className="flex items-center gap-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {selected.durationDays[0]}–{selected.durationDays[1]} days
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5" />
                      From ${selected.dailyBudget.budget.min}/day
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.categories.map(cat => (
                      <Badge key={cat} variant="default" className="text-[10px]">
                        {CATEGORY_LABELS[cat] || cat}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </>
  );
}
