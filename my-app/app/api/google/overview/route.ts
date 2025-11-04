import { NextResponse } from 'next/server';

function parseAtomFeed(xml: string) {
  const entries: { title: string; region: string; status: string; duration?: string }[] = [];
  const parts = xml.split('<entry>').slice(1);
  for (const part of parts.slice(0, 5)) {
    const titleMatch = part.match(/<title>([^<]+)<\/title>/);
    const summaryMatch = part.match(/<summary>([\s\S]*?)<\/summary>/);
    const title = titleMatch ? titleMatch[1] : 'Incident';
    const summary = summaryMatch ? summaryMatch[1] : '';
    const regionMatch = summary.match(/Region:([^<]+)/i);
    const statusMatch = summary.match(/Status:([^<]+)/i);
    const durationMatch = summary.match(/Duration:([^<]+)/i);
    entries.push({
      title,
      region: regionMatch ? regionMatch[1].trim() : 'Unknown',
      status: statusMatch ? statusMatch[1].trim() : 'Info',
      duration: durationMatch ? durationMatch[1].trim() : undefined,
    });
  }
  return entries;
}

export async function GET() {
  try {
    const projectId = process.env.GCP_PROJECT_ID;
    const googleAccessToken = process.env.GOOGLE_ACCESS_TOKEN;

    // Public incidents feed (real-time, no auth)
    let incidents: any[] = [];
    try {
      const feedRes = await fetch('https://status.cloud.google.com/feed.atom');
      const feedText = await feedRes.text();
      incidents = parseAtomFeed(feedText);
    } catch {
      incidents = [];
    }

    let connected = Boolean(projectId && googleAccessToken);
    let projects: any[] = [];
    let regions: number | null = null;
    let zones: number | null = null;

    if (connected) {
      try {
        // List active projects
        const projRes = await fetch(
          'https://cloudresourcemanager.googleapis.com/v1/projects?filter=lifecycleState%3AACTIVE',
          {
            headers: { Authorization: `Bearer ${googleAccessToken}` },
          }
        );
        const projJson = await projRes.json();
        if (projJson.projects && Array.isArray(projJson.projects)) {
          projects = projJson.projects.map((p: any) => ({
            name: p.name || p.projectId,
            desc: `${p.projectId} • ${p.createTime || '—'}`,
            status: 'Healthy',
          }));
        }

        // Regions and zones from Compute API (best-effort)
        try {
          const regionsRes = await fetch(
            `https://compute.googleapis.com/compute/v1/projects/${projectId}/regions`,
            { headers: { Authorization: `Bearer ${googleAccessToken}` } }
          );
          const regionsJson = await regionsRes.json();
          regions = Array.isArray(regionsJson.items) ? regionsJson.items.length : null;

          const zonesRes = await fetch(
            `https://compute.googleapis.com/compute/v1/projects/${projectId}/zones`,
            { headers: { Authorization: `Bearer ${googleAccessToken}` } }
          );
          const zonesJson = await zonesRes.json();
          zones = Array.isArray(zonesJson.items) ? zonesJson.items.length : null;
        } catch {
          // Leave regions/zones as null if permission missing
        }
      } catch {
        connected = false; // token might be invalid
      }
    }

    const payload = {
      connected,
      compute_utilization: null,
      storage_latency_ms: null,
      network_throughput_gbps: null,
      health_summary: incidents.length === 0 ? 'All systems nominal' : 'Incidents reported',
      services: null,
      regions,
      zones,
      deployments: projects.length || null,
      cost: null,
      projects,
      incidents,
    };

    return NextResponse.json(payload, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to load Google overview' }, { status: 500 });
  }
}