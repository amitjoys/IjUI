import UAParser from 'ua-parser-js';
import { supabase } from './supabase';

export async function initializeTracking(websiteId) {
  const visitorId = getOrCreateVisitorId();
  const parser = new UAParser();
  const deviceInfo = parser.getResult();
  
  try {
    console.debug('[Analytics] Initializing tracking for website:', websiteId);

    if (!websiteId) {
      throw new Error('Website ID is required');
    }

    const ipResponse = await fetch('https://api.ipify.org?format=json');
    if (!ipResponse.ok) {
      throw new Error('Failed to fetch IP address');
    }
    const { ip } = await ipResponse.json();
    
    const locationResponse = await fetch(`https://ipapi.co/${ip}/json/`);
    if (!locationResponse.ok) {
      throw new Error('Failed to fetch location data');
    }
    const locationData = await locationResponse.json();
    
    const { data: visitor, error } = await supabase
      .from('visitors')
      .insert({
        website_id: websiteId,
        visitor_id: visitorId,
        ip_address: ip,
        location: locationData,
        device_info: deviceInfo,
        is_business: locationData.org ? true : false,
        is_isp: locationData.org?.toLowerCase().includes('isp'),
        domain_info: {
          domain: locationData.org,
          asn: locationData.asn,
          network: locationData.network
        }
      })
      .select()
      .single();

    if (error) throw error;

    console.debug('[Analytics] Tracking initialized successfully for website:', websiteId);
    return { success: true, data: visitor };

  } catch (error) {
    console.error('[Analytics] Initialization failed for website:', websiteId, error);
    return { 
      success: false, 
      error: error.message || 'Failed to initialize tracking'
    };
  }
}

export async function trackPageView({ websiteId, path, referrer }) {
  const visitorId = getVisitorId();
  
  try {
    console.debug('[Analytics] Tracking page view for website:', websiteId, { path });

    if (!visitorId) {
      throw new Error('Visitor ID not found. Please initialize tracking first.');
    }
    if (!websiteId) {
      throw new Error('Website ID is required');
    }
    if (!path) {
      throw new Error('Path is required');
    }

    const { data, error } = await supabase
      .from('page_views')
      .insert({
        visitor_id: visitorId,
        website_id: websiteId,
        path,
        referrer
      })
      .select()
      .single();

    if (error) throw error;

    console.debug('[Analytics] Page view tracked successfully for website:', websiteId);
    return { success: true, data };

  } catch (error) {
    console.error('[Analytics] Page view tracking failed for website:', websiteId, error);
    return { 
      success: false, 
      error: error.message || 'Failed to track page view'
    };
  }
}

export function validateTrackingSetup() {
  const issues = [];

  if (!import.meta.env.VITE_SUPABASE_URL) {
    issues.push('Supabase URL is not configured');
  }
  if (!import.meta.env.VITE_SUPABASE_ANON_KEY) {
    issues.push('Supabase anonymous key is not configured');
  }

  if (!window.localStorage) {
    issues.push('LocalStorage is not available');
  }
  if (!window.fetch) {
    issues.push('Fetch API is not available');
  }
  if (!crypto.randomUUID) {
    issues.push('crypto.randomUUID is not available');
  }

  return {
    valid: issues.length === 0,
    issues
  };
}

function getOrCreateVisitorId() {
  let visitorId = localStorage.getItem('visitorId');
  if (!visitorId) {
    visitorId = crypto.randomUUID();
    localStorage.setItem('visitorId', visitorId);
  }
  return visitorId;
}

function getVisitorId() {
  return localStorage.getItem('visitorId');
}
