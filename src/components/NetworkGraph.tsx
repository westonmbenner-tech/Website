"use client";

import { useState, useCallback, useMemo, useEffect } from "react";
import { networkNodes, networkEdges } from "@/data/networkData";

const GRAPH_MIN_W = 320;
const GRAPH_MAX_W = 720;
const GRAPH_STEP = 48;
const NARROW_MQ = "(max-width: 767px)";

export default function NetworkGraph() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  /** Minimum drawing width (px) on small screens — larger = more zoom; scroll sideways to see edges. */
  const [graphMinWidthPx, setGraphMinWidthPx] = useState(400);
  const [isNarrow, setIsNarrow] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia(NARROW_MQ);
    const read = () => {
      const narrow = mq.matches;
      setIsNarrow(narrow);
      if (narrow) {
        setGraphMinWidthPx(
          Math.max(
            GRAPH_MIN_W,
            Math.min(GRAPH_MAX_W, window.innerWidth - 32),
          ),
        );
      }
    };
    read();
    mq.addEventListener("change", read);
    return () => mq.removeEventListener("change", read);
  }, []);

  const connectedIds = useMemo(() => {
    if (!selectedId) return new Set<string>();
    const ids = new Set<string>([selectedId]);
    networkEdges.forEach((e) => {
      if (e.source === selectedId) ids.add(e.target);
      if (e.target === selectedId) ids.add(e.source);
    });
    return ids;
  }, [selectedId]);

  const selectedNode = useMemo(
    () => networkNodes.find((n) => n.id === selectedId) ?? null,
    [selectedId],
  );

  const handleNodeClick = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const isHighlighted = useCallback(
    (id: string) => !selectedId || connectedIds.has(id),
    [selectedId, connectedIds],
  );

  const isEdgeHighlighted = useCallback(
    (edge: { source: string; target: string }) =>
      !selectedId ||
      (connectedIds.has(edge.source) && connectedIds.has(edge.target)),
    [selectedId, connectedIds],
  );

  const zoomIn = useCallback(() => {
    setGraphMinWidthPx((w) => Math.min(GRAPH_MAX_W, w + GRAPH_STEP));
  }, []);

  const zoomOut = useCallback(() => {
    setGraphMinWidthPx((w) => Math.max(GRAPH_MIN_W, w - GRAPH_STEP));
  }, []);

  const zoomFit = useCallback(() => {
    if (typeof window === "undefined") return;
    setGraphMinWidthPx(
      Math.max(GRAPH_MIN_W, Math.min(GRAPH_MAX_W, window.innerWidth - 32)),
    );
  }, []);

  const graphSvg = (
    <svg
      viewBox="0 0 100 95"
      className="block h-auto w-full max-w-none touch-manipulation md:min-w-0"
      style={{
        aspectRatio: "100 / 95",
        ...(isNarrow ? { minWidth: graphMinWidthPx } : {}),
      }}
      role="img"
      aria-label="Network of themes and experiences"
    >
      <defs>
        <pattern
          id="network-grid"
          width="5"
          height="5"
          patternUnits="userSpaceOnUse"
        >
          <path
            d="M 5 0 L 0 0 0 5"
            fill="none"
            stroke="rgba(255,255,255,0.02)"
            strokeWidth="0.1"
          />
        </pattern>
        <radialGradient id="glow-cyan" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(34,211,238,0.3)" />
          <stop offset="100%" stopColor="rgba(34,211,238,0)" />
        </radialGradient>
        <radialGradient id="glow-violet" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="rgba(167,139,250,0.25)" />
          <stop offset="100%" stopColor="rgba(167,139,250,0)" />
        </radialGradient>
      </defs>
      <rect width="100" height="95" fill="url(#network-grid)" />

      {networkEdges.map((edge, i) => {
        const s = networkNodes.find((n) => n.id === edge.source);
        const t = networkNodes.find((n) => n.id === edge.target);
        if (!s || !t) return null;
        const highlighted = isEdgeHighlighted(edge);
        return (
          <line
            key={i}
            x1={s.x}
            y1={s.y}
            x2={t.x}
            y2={t.y}
            stroke={
              highlighted
                ? "rgba(34,211,238,0.25)"
                : "rgba(255,255,255,0.03)"
            }
            strokeWidth={highlighted ? 0.3 : 0.15}
            className="transition-all duration-300"
          />
        );
      })}

      {networkNodes.map((node) => {
        const highlighted = isHighlighted(node.id);
        const isTheme = node.type === "theme";
        const r = isTheme ? 2.8 : 1.6;
        const isSelected = selectedId === node.id;
        return (
          <g
            key={node.id}
            onClick={() => handleNodeClick(node.id)}
            className="cursor-pointer"
          >
            {(isSelected || (isTheme && highlighted)) && (
              <circle
                cx={node.x}
                cy={node.y}
                r={r * 2.5}
                fill={isTheme ? "url(#glow-cyan)" : "url(#glow-violet)"}
                className="transition-all duration-300"
              />
            )}
            <circle
              cx={node.x}
              cy={node.y}
              r={r}
              fill={
                highlighted
                  ? isTheme
                    ? "rgba(34,211,238,0.15)"
                    : "rgba(167,139,250,0.12)"
                  : "rgba(255,255,255,0.03)"
              }
              stroke={
                highlighted
                  ? isTheme
                    ? "rgba(34,211,238,0.5)"
                    : "rgba(167,139,250,0.4)"
                  : "rgba(255,255,255,0.06)"
              }
              strokeWidth={isSelected ? 0.35 : 0.2}
              className="transition-all duration-300"
            />
            <text
              x={node.x}
              y={node.y + r + 2}
              textAnchor="middle"
              fontSize={isTheme ? 2 : 1.5}
              fontWeight={isTheme ? 600 : 400}
              fill={
                highlighted
                  ? isTheme
                    ? "rgba(34,211,238,0.9)"
                    : "rgba(228,228,231,0.8)"
                  : "rgba(161,161,170,0.3)"
              }
              className="pointer-events-none transition-all duration-300 select-none"
            >
              {node.label}
            </text>
          </g>
        );
      })}
    </svg>
  );

  const selectionPanel = (
    <div className="w-full shrink-0 md:absolute md:right-4 md:top-4 md:z-20 md:w-72">
      {selectedNode ? (
        <div className="rounded-xl border border-white/[0.08] bg-zinc-900/90 p-4 shadow-xl backdrop-blur-lg">
          <div className="mb-2 flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-full ${
                selectedNode.type === "theme" ? "bg-cyan-400" : "bg-violet-400"
              }`}
            />
            <span className="text-xs uppercase tracking-wider text-zinc-500">
              {selectedNode.type === "theme" ? "Theme" : "Experience"}
            </span>
          </div>
          <h4 className="text-sm font-semibold text-white">{selectedNode.label}</h4>
          <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
            {selectedNode.description}
          </p>
          <button
            type="button"
            onClick={() => setSelectedId(null)}
            className="mt-3 text-xs text-zinc-500 transition-colors hover:text-white"
          >
            Clear selection
          </button>
        </div>
      ) : (
        <div className="rounded-xl border border-white/[0.05] bg-zinc-900/60 p-3 backdrop-blur">
          <p className="text-xs text-zinc-500">
            <span className="md:hidden">Tap a node below. </span>
            <span className="hidden md:inline">Click a node </span>
            to explore connections.
          </p>
        </div>
      )}
    </div>
  );

  return (
    <div className="mt-16">
      <h3 className="mb-2 text-lg font-semibold text-white">How it connects</h3>
      <p className="mb-2 text-sm text-zinc-500 md:mb-6">
        Themes and experiences link across the graph.
        <span className="md:hidden">
          {" "}
          On a phone, scroll the graph sideways and use zoom to fit the full
          picture.
        </span>
      </p>

      {/* Narrow screens: zoom controls (desktop uses native graph size) */}
      <div className="mb-3 flex flex-wrap items-center gap-2 md:hidden">
        <span className="text-xs text-zinc-500">Graph size</span>
        <div className="flex items-center gap-1 rounded-full border border-white/[0.08] bg-zinc-900/50 p-0.5">
          <button
            type="button"
            onClick={zoomOut}
            disabled={graphMinWidthPx <= GRAPH_MIN_W}
            className="rounded-full px-2.5 py-1 text-xs font-medium text-zinc-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Zoom graph out to see more at once"
          >
            −
          </button>
          <button
            type="button"
            onClick={zoomFit}
            className="rounded-full px-2.5 py-1 text-xs font-medium text-cyan-300/90 transition hover:bg-white/10"
            aria-label="Reset graph zoom to fit screen"
          >
            Fit
          </button>
          <button
            type="button"
            onClick={zoomIn}
            disabled={graphMinWidthPx >= GRAPH_MAX_W}
            className="rounded-full px-2.5 py-1 text-xs font-medium text-zinc-300 transition hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
            aria-label="Zoom graph in for larger nodes and labels"
          >
            +
          </button>
        </div>
      </div>

      <div className="relative mx-auto w-full max-w-[720px] rounded-2xl border border-white/[0.06] bg-zinc-950/60">
        {/* Vertical on mobile: panel then graph; desktop overlays panel */}
        <div className="flex flex-col gap-4 p-4 md:block md:p-0 md:pt-4">
          {selectionPanel}

          <div
            className="relative min-h-[200px] w-full overflow-x-auto overflow-y-hidden overscroll-x-contain rounded-xl md:min-h-0 md:overflow-visible md:rounded-none [-webkit-overflow-scrolling:touch]"
            style={{ touchAction: "pan-x pan-y pinch-zoom" }}
          >
            <div className="mx-auto w-max max-w-none md:w-full md:max-w-full">
              {graphSvg}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
