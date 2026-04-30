"use client";

import { useState, useCallback, useMemo } from "react";
import { networkNodes, networkEdges } from "@/data/networkData";
import SectionHeading from "./SectionHeading";

export default function NetworkGraph() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

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
    [selectedId]
  );

  const handleNodeClick = useCallback((id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  }, []);

  const isHighlighted = useCallback(
    (id: string) => !selectedId || connectedIds.has(id),
    [selectedId, connectedIds]
  );

  const isEdgeHighlighted = useCallback(
    (edge: { source: string; target: string }) =>
      !selectedId ||
      (connectedIds.has(edge.source) && connectedIds.has(edge.target)),
    [selectedId, connectedIds]
  );

  return (
    <section id="connected" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading
          title="Connected Work"
          subtitle="My experiences aren't isolated — they connect across recurring themes."
        />

        {/* Desktop graph */}
        <div className="hidden md:block">
          <div className="relative rounded-2xl border border-white/[0.06] bg-zinc-950/60 overflow-hidden">
            {/* Detail panel */}
            <div className="absolute top-4 right-4 z-20 w-72">
              {selectedNode ? (
                <div className="rounded-xl border border-white/[0.08] bg-zinc-900/90 backdrop-blur-lg p-4 shadow-xl">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`h-2.5 w-2.5 rounded-full ${
                        selectedNode.type === "theme"
                          ? "bg-cyan-400"
                          : "bg-violet-400"
                      }`}
                    />
                    <span className="text-xs uppercase tracking-wider text-zinc-500">
                      {selectedNode.type === "theme"
                        ? "Theme"
                        : "Experience"}
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold text-white">
                    {selectedNode.label}
                  </h4>
                  <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                    {selectedNode.description}
                  </p>
                  <button
                    onClick={() => setSelectedId(null)}
                    className="mt-3 text-xs text-zinc-500 hover:text-white transition-colors"
                  >
                    Clear selection
                  </button>
                </div>
              ) : (
                <div className="rounded-xl border border-white/[0.05] bg-zinc-900/60 backdrop-blur p-3">
                  <p className="text-xs text-zinc-500">
                    Click a node to explore connections
                  </p>
                </div>
              )}
            </div>

            <svg
              viewBox="0 0 100 95"
              className="w-full"
              style={{ aspectRatio: "100/95" }}
            >
              {/* Subtle grid background */}
              <defs>
                <pattern
                  id="grid"
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
              <rect width="100" height="95" fill="url(#grid)" />

              {/* Edges */}
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

              {/* Nodes */}
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
                    {/* Glow */}
                    {(isSelected || (isTheme && highlighted)) && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={r * 2.5}
                        fill={
                          isTheme
                            ? "url(#glow-cyan)"
                            : "url(#glow-violet)"
                        }
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
                      className="transition-all duration-300 select-none"
                    >
                      {node.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Mobile fallback: relationship cards */}
        <div className="md:hidden space-y-4">
          {networkNodes
            .filter((n) => n.type === "theme")
            .map((theme) => {
              const connected = networkEdges
                .filter(
                  (e) => e.source === theme.id || e.target === theme.id
                )
                .map((e) =>
                  e.source === theme.id ? e.target : e.source
                )
                .map((id) => networkNodes.find((n) => n.id === id))
                .filter(Boolean);

              return (
                <div
                  key={theme.id}
                  className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-5"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" />
                    <h3 className="text-sm font-semibold text-white">
                      {theme.label}
                    </h3>
                  </div>
                  <p className="text-xs text-zinc-400 mb-3">
                    {theme.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {connected.map((n) => (
                      <span
                        key={n!.id}
                        className="rounded-full bg-violet-500/10 border border-violet-500/10 px-2.5 py-0.5 text-xs text-violet-300/70"
                      >
                        {n!.label}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
