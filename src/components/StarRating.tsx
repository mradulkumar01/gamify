"use client";

import React, { useState } from "react";
import { Skull } from "lucide-react";

interface StarRatingProps {
  value: number; // 1 to 10
  onChange?: (val: number) => void;
  readOnly?: boolean;
  max?: number;
}

export function StarRating({ value, onChange, readOnly = false, max = 10 }: StarRatingProps) {
  const [hoverVal, setHoverVal] = useState<number | null>(null);

  const current = hoverVal !== null ? hoverVal : value;

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }, (_, i) => i + 1).map((idx) => {
        const isFilled = idx <= current;
        return (
          <button
            key={idx}
            type="button"
            disabled={readOnly}
            onClick={() => onChange && onChange(idx)}
            onMouseEnter={() => !readOnly && setHoverVal(idx)}
            onMouseLeave={() => !readOnly && setHoverVal(null)}
            className={`p-0.5 transition-transform ${
              !readOnly ? "hover:scale-125 cursor-pointer" : "cursor-default"
            }`}
            aria-label={`Rate ${idx} out of ${max}`}
          >
            <Skull
              className={`h-4 w-4 transition-colors ${
                isFilled
                  ? "text-blood fill-blood filter drop-shadow-[0_0_6px_rgba(255,28,47,0.6)]"
                  : "text-abyss-700 hover:text-abyss-600"
              }`}
            />
          </button>
        );
      })}
      <span className="ml-2 font-mono text-xs font-bold text-ghost-white">
        {current}/{max}
      </span>
    </div>
  );
}
