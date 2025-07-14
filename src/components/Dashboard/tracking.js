// Optimized tracking implementation - Frontend only
import * as UAParser from 'ua-parser-js';

let visitorId = null;
let parser = null;

// Initialize parser once
const getParser = () => {
  if (!parser) {
    parser = new UAParser.UAParser();
  }
  return parser;
};

// Optimize visitor ID generation
const getOrCreateVisitorId = () => {
  if (!visitorId) {
    visitorId = localStorage.getItem('visitorId') || crypto.randomUUID();
    localStorage.setItem('visitorId', visitorId);
  }
  return visitorId;
};

export async function initializeTracking(websiteId) {
  const currentVisitorId = getOrCreateVisitorId();
  const deviceInfo = getParser().getResult();
  
  // Return mock data quickly
  return { 
    success: true, 
    data: {
      website_id: websiteId,
      visitor_id: currentVisitorId,
      ip_address: '127.0.0.1',
      location: { city: 'Demo City', country: 'US', region: 'CA' },
      device_info: deviceInfo,
      is_business: false,
      is_isp: false,
      domain_info: { domain: 'localhost', asn: 'AS00000', network: 'Local Network' }
    }
  };
}

export async function trackPageView({ websiteId, path, referrer }) {
  const currentVisitorId = getOrCreateVisitorId();
  
  // Return mock data quickly
  return { 
    success: true, 
    data: {
      visitor_id: currentVisitorId,
      website_id: websiteId,
      path: path || '/',
      referrer: referrer || 'direct',
      timestamp: new Date().toISOString()
    }
  };
}

export function validateTrackingSetup() {
  const issues = [];
  
  if (!window.localStorage) issues.push('LocalStorage not available');
  if (!crypto.randomUUID) issues.push('crypto.randomUUID not available');

  return { valid: issues.length === 0, issues };
}