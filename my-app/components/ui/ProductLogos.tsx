"use client";
import React from "react";

type GoogleProductName =
  | "Compute Engine"
  | "Kubernetes Engine (GKE)"
  | "BigQuery"
  | "Cloud Storage"
  | "Cloud Run"
  | "Cloud SQL";

type ZohoAppName =
  | "Zoho CRM"
  | "Zoho Books"
  | "Zoho Projects"
  | "Zoho Desk"
  | "Zoho Mail"
  | "Zoho Analytics"
  | "WorkDrive";

function Badge({
  label,
  gradient,
  className,
}: {
  label: string;
  gradient: string;
  className?: string;
}) {
  return (
    <div
      className={
        `inline-flex items-center justify-center rounded-xl text-white font-bold shadow-sm bg-gradient-to-br ${gradient} ` +
        (className ? className : "w-10 h-10")
      }
      aria-label={label}
    >
      <span className="text-xs tracking-wide">{label}</span>
    </div>
  );
}

export function GoogleLogoBadge({
  name,
  className,
}: {
  name: GoogleProductName;
  className?: string;
}) {
  const map: Record<GoogleProductName, { abbr: string; gradient: string }> = {
    "Compute Engine": { abbr: "CE", gradient: "from-blue-500 to-blue-600" },
    "Kubernetes Engine (GKE)": {
      abbr: "GKE",
      gradient: "from-indigo-500 to-indigo-600",
    },
    BigQuery: { abbr: "BQ", gradient: "from-sky-500 to-sky-600" },
    "Cloud Storage": { abbr: "CS", gradient: "from-emerald-500 to-emerald-600" },
    "Cloud Run": { abbr: "CR", gradient: "from-red-500 to-red-600" },
    "Cloud SQL": { abbr: "SQL", gradient: "from-purple-500 to-purple-600" },
  };
  const { abbr, gradient } = map[name];
  return <Badge label={abbr} gradient={gradient} className={className} />;
}

export function ZohoLogoBadge({
  name,
  className,
}: {
  name: ZohoAppName;
  className?: string;
}) {
  const map: Record<ZohoAppName, { abbr: string; gradient: string }> = {
    "Zoho CRM": { abbr: "CRM", gradient: "from-red-500 to-red-600" },
    "Zoho Books": { abbr: "Books", gradient: "from-emerald-500 to-emerald-600" },
    "Zoho Projects": {
      abbr: "Proj",
      gradient: "from-blue-500 to-blue-600",
    },
    "Zoho Desk": { abbr: "Desk", gradient: "from-amber-500 to-orange-600" },
    "Zoho Mail": { abbr: "Mail", gradient: "from-cyan-500 to-teal-600" },
    "Zoho Analytics": {
      abbr: "BI",
      gradient: "from-fuchsia-500 to-purple-600",
    },
    WorkDrive: { abbr: "WD", gradient: "from-slate-500 to-slate-600" },
  };
  const { abbr, gradient } = map[name];
  return <Badge label={abbr} gradient={gradient} className={className} />;
}

export default function ProductLogos() {
  return null;
}