'use client';

import { cn } from '@/lib/utils/cn';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
  formatValue?: (value: number) => string;
  className?: string;
}

export function Slider({ label, value, min, max, step = 1, onChange, formatValue, className }: SliderProps) {
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className={cn('w-full', className)}>
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-text-secondary">{label}</label>
        <span className="text-sm font-semibold text-primary">
          {formatValue ? formatValue(value) : value}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={value}
          aria-valuetext={formatValue ? formatValue(value) : String(value)}
          className="w-full h-2 rounded-full appearance-none cursor-pointer
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5
            [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-primary
            [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:cursor-pointer
            [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white
            [&::-webkit-slider-thumb]:relative [&::-webkit-slider-thumb]:z-10
            [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5
            [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-primary
            [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:cursor-pointer
            [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white"
          style={{
            background: `linear-gradient(to right, #1B4332 0%, #1B4332 ${percentage}%, #E5E7EB ${percentage}%, #E5E7EB 100%)`,
          }}
        />
      </div>
    </div>
  );
}
