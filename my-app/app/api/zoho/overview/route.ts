import { NextResponse } from 'next/server';

function dcHost(dc?: string) {
  const suffix = dc && ['com','eu','in','cn','jp','au'].includes(dc) ? dc : 'com';
  return `https://www.zohoapis.${suffix}`;
}

export async function GET() {
  try {
    const token = process.env.ZOHO_OAUTH_TOKEN;
    const dc = process.env.ZOHO_DC || 'com';
    const base = dcHost(dc);

    let connected = Boolean(token);
    let suite_apps: any[] = [];

    if (connected) {
      try {
        // Fetch CRM modules as a proxy for installed apps/features
        const modulesRes = await fetch(`${base}/crm/v3/settings/modules`, {
          headers: { Authorization: `Zoho-oauthtoken ${token}` },
        });
        const modulesJson = await modulesRes.json();
        if (modulesJson.modules && Array.isArray(modulesJson.modules)) {
          suite_apps = modulesJson.modules.slice(0, 8).map((m: any) => ({
            key: m.api_name,
            short: (m.api_name || 'App').slice(0, 4),
            name: m.module_name || m.api_name,
            subtitle: m.api_supported ? 'Enabled' : 'Unavailable',
          }));
        }
      } catch {
        connected = false; // token might be invalid or wrong DC
      }
    }

    const payload = {
      connected,
      crm_conversion_rate: null,
      projects_velocity_pct: null,
      books_collections_amount: null,
      suite_apps,
      integrations: null,
      workflows: null,
      active_rules: null,
      executions_per_day: null,
      success_rate: null,
      tickets_today: null,
      avg_response: null,
      csat: null,
      backlog: null,
    };

    return NextResponse.json(payload, { status: 200 });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to load Zoho overview' }, { status: 500 });
  }
}