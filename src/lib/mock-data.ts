// Shared mock data for UrHealth AI
export type Hospital = {
  id: string;
  name: string;
  type: "Government" | "Private" | "Medical College" | "Trauma Center";
  city: string;
  distanceKm: number;
  etaMin: number;
  status: "Ready" | "Strained" | "Critical" | "Overloaded";
  general: { total: number; available: number };
  icu: { total: number; available: number };
  hdu: { total: number; available: number };
  ventilators: { total: number; available: number };
  bloodUnits: number;
  ot: number;
  traumaCenter: boolean;
  emergencyDoctors: number;
  readiness: number; // 0-100
  trend: number[]; // last 12 datapoints
  prediction: string;
  lat: number;
  lng: number;
};

export const hospitals: Hospital[] = [
  {
    id: "AIIMS-DEL", name: "AIIMS New Delhi", type: "Medical College", city: "New Delhi",
    distanceKm: 4.2, etaMin: 9, status: "Ready",
    general: { total: 2200, available: 340 }, icu: { total: 220, available: 38 },
    hdu: { total: 120, available: 22 }, ventilators: { total: 180, available: 41 },
    bloodUnits: 1240, ot: 24, traumaCenter: true, emergencyDoctors: 62,
    readiness: 94, trend: [72,74,78,80,82,86,88,90,91,92,93,94],
    prediction: "Capacity holds for 6h under current inflow",
    lat: 28.5672, lng: 77.2100,
  },
  {
    id: "SAFDAR-DEL", name: "Safdarjung Hospital", type: "Government", city: "New Delhi",
    distanceKm: 5.6, etaMin: 12, status: "Strained",
    general: { total: 2800, available: 210 }, icu: { total: 180, available: 12 },
    hdu: { total: 90, available: 8 }, ventilators: { total: 140, available: 14 },
    bloodUnits: 860, ot: 18, traumaCenter: true, emergencyDoctors: 44,
    readiness: 71, trend: [82,80,78,76,74,72,70,71,72,70,71,71],
    prediction: "ICU saturation likely in ~90 min",
    lat: 28.5686, lng: 77.2085,
  },
  {
    id: "RML-DEL", name: "Dr. RML Hospital", type: "Government", city: "New Delhi",
    distanceKm: 6.8, etaMin: 15, status: "Ready",
    general: { total: 1500, available: 260 }, icu: { total: 120, available: 24 },
    hdu: { total: 80, available: 16 }, ventilators: { total: 90, available: 22 },
    bloodUnits: 540, ot: 12, traumaCenter: false, emergencyDoctors: 28,
    readiness: 86, trend: [80,82,83,84,85,86,86,85,86,86,86,86],
    prediction: "Stable for next 4h",
    lat: 28.6260, lng: 77.2087,
  },
  {
    id: "APOLLO-DEL", name: "Apollo Hospital", type: "Private", city: "New Delhi",
    distanceKm: 9.1, etaMin: 18, status: "Critical",
    general: { total: 700, available: 40 }, icu: { total: 90, available: 4 },
    hdu: { total: 60, available: 3 }, ventilators: { total: 70, available: 6 },
    bloodUnits: 320, ot: 10, traumaCenter: true, emergencyDoctors: 22,
    readiness: 48, trend: [70,66,62,58,55,52,50,49,48,48,48,48],
    prediction: "Diverting inflow recommended",
    lat: 28.5385, lng: 77.2833,
  },
  {
    id: "MAX-DEL", name: "Max Super Speciality", type: "Private", city: "New Delhi",
    distanceKm: 12.4, etaMin: 22, status: "Ready",
    general: { total: 500, available: 120 }, icu: { total: 70, available: 18 },
    hdu: { total: 40, available: 12 }, ventilators: { total: 55, available: 15 },
    bloodUnits: 290, ot: 9, traumaCenter: false, emergencyDoctors: 18,
    readiness: 88, trend: [84,85,86,86,87,88,88,88,88,88,88,88],
    prediction: "Can absorb up to 40 casualties",
    lat: 28.5417, lng: 77.2119,
  },
  {
    id: "LNJP-DEL", name: "Lok Nayak Hospital", type: "Government", city: "New Delhi",
    distanceKm: 8.0, etaMin: 16, status: "Overloaded",
    general: { total: 2000, available: 30 }, icu: { total: 150, available: 2 },
    hdu: { total: 70, available: 1 }, ventilators: { total: 100, available: 3 },
    bloodUnits: 410, ot: 14, traumaCenter: true, emergencyDoctors: 30,
    readiness: 31, trend: [56,52,48,44,40,38,35,33,32,31,31,31],
    prediction: "Stop new admissions; initiate transfers",
    lat: 28.6398, lng: 77.2381,
  },
];

export type Incident = {
  id: string;
  title: string;
  type: string;
  severity: "Minor" | "Moderate" | "Major" | "Catastrophic";
  status: "Active" | "Contained" | "Resolved";
  location: string;
  district: string;
  startedAt: string;
  casualties: { red: number; yellow: number; green: number; black: number };
  ambulances: number;
  hospitals: number;
  lat: number; lng: number;
};

export const incidents: Incident[] = [
  {
    id: "MCI-2410-018", title: "NH-48 Multi-vehicle Pile-up", type: "Road Accident",
    severity: "Major", status: "Active", location: "NH-48, Km 23", district: "Gurugram",
    startedAt: "2026-07-13T09:14:00Z",
    casualties: { red: 12, yellow: 34, green: 58, black: 3 },
    ambulances: 14, hospitals: 6, lat: 28.4595, lng: 77.0266,
  },
  {
    id: "MCI-2410-017", title: "Chemical Leak — Manesar Plant", type: "Chemical Leak",
    severity: "Catastrophic", status: "Active", location: "IMT Manesar Sector 3", district: "Gurugram",
    startedAt: "2026-07-13T08:02:00Z",
    casualties: { red: 22, yellow: 61, green: 120, black: 4 },
    ambulances: 22, hospitals: 9, lat: 28.3670, lng: 76.9364,
  },
  {
    id: "MCI-2410-016", title: "Kumbh Stampede — Ghat 14", type: "Festival Stampede",
    severity: "Major", status: "Contained", location: "Sangam Ghat", district: "Prayagraj",
    startedAt: "2026-07-13T05:40:00Z",
    casualties: { red: 9, yellow: 44, green: 210, black: 6 },
    ambulances: 18, hospitals: 7, lat: 25.4358, lng: 81.8463,
  },
  {
    id: "MCI-2410-015", title: "Fire — Textile Warehouse", type: "Fire",
    severity: "Moderate", status: "Resolved", location: "Bhiwandi Industrial", district: "Thane",
    startedAt: "2026-07-12T22:10:00Z",
    casualties: { red: 3, yellow: 12, green: 24, black: 1 },
    ambulances: 8, hospitals: 4, lat: 19.2967, lng: 73.0631,
  },
];

export type Patient = {
  id: string;
  name: string;
  age: number;
  sex: "M" | "F" | "Other";
  triage: "Red" | "Yellow" | "Green" | "Black";
  hospital: string;
  ambulance: string;
  vitals: { hr: number; bp: string; spo2: number; rr: number };
  notes: string;
  status: "Enroute" | "Admitted" | "In OT" | "ICU" | "Discharged" | "Deceased";
  incidentId: string;
};

export const patients: Patient[] = [
  { id: "HL-8842-A1", name: "Rajesh Kumar", age: 42, sex: "M", triage: "Red",
    hospital: "AIIMS New Delhi", ambulance: "DL-01-EA-2201",
    vitals: { hr: 132, bp: "88/54", spo2: 89, rr: 26 }, notes: "Blunt chest trauma; suspected tension pneumothorax",
    status: "Enroute", incidentId: "MCI-2410-018" },
  { id: "HL-8842-A2", name: "Priya Sharma", age: 29, sex: "F", triage: "Yellow",
    hospital: "Safdarjung Hospital", ambulance: "DL-01-EA-2214",
    vitals: { hr: 108, bp: "112/72", spo2: 96, rr: 20 }, notes: "Femur fracture, stable",
    status: "Admitted", incidentId: "MCI-2410-018" },
  { id: "HL-8842-A3", name: "Mohammed Aslam", age: 55, sex: "M", triage: "Red",
    hospital: "Apollo Hospital", ambulance: "DL-01-EA-2233",
    vitals: { hr: 145, bp: "76/48", spo2: 84, rr: 30 }, notes: "Chemical burns 38% TBSA",
    status: "In OT", incidentId: "MCI-2410-017" },
  { id: "HL-8842-A4", name: "Sunita Devi", age: 63, sex: "F", triage: "Yellow",
    hospital: "Dr. RML Hospital", ambulance: "DL-01-EA-2240",
    vitals: { hr: 96, bp: "128/80", spo2: 94, rr: 18 }, notes: "Smoke inhalation",
    status: "ICU", incidentId: "MCI-2410-017" },
  { id: "HL-8842-A5", name: "Arjun Nair", age: 8, sex: "M", triage: "Green",
    hospital: "Max Super Speciality", ambulance: "DL-01-EA-2255",
    vitals: { hr: 102, bp: "104/64", spo2: 98, rr: 22 }, notes: "Minor abrasions",
    status: "Admitted", incidentId: "MCI-2410-018" },
  { id: "HL-8842-A6", name: "Unknown Male", age: 0, sex: "M", triage: "Black",
    hospital: "LNJP Hospital", ambulance: "DL-01-EA-2201",
    vitals: { hr: 0, bp: "0/0", spo2: 0, rr: 0 }, notes: "Declared at scene",
    status: "Deceased", incidentId: "MCI-2410-018" },
  { id: "HL-8842-A7", name: "Lakshmi R", age: 34, sex: "F", triage: "Red",
    hospital: "AIIMS New Delhi", ambulance: "DL-01-EA-2260",
    vitals: { hr: 128, bp: "92/58", spo2: 90, rr: 24 }, notes: "Head injury, GCS 9",
    status: "Enroute", incidentId: "MCI-2410-017" },
  { id: "HL-8842-A8", name: "Vikram Singh", age: 47, sex: "M", triage: "Yellow",
    hospital: "Safdarjung Hospital", ambulance: "DL-01-EA-2266",
    vitals: { hr: 100, bp: "118/76", spo2: 95, rr: 19 }, notes: "Right forearm fracture",
    status: "Admitted", incidentId: "MCI-2410-018" },
];

export type Ambulance = {
  id: string;
  driver: string;
  patient: string | null;
  status: "Available" | "Enroute" | "At Scene" | "Transporting" | "Returning" | "Offline";
  destination: string;
  etaMin: number;
  fuel: number;
  equipment: string[];
  lat: number; lng: number;
};

export const ambulances: Ambulance[] = [
  { id: "DL-01-EA-2201", driver: "Ramesh Yadav", patient: "HL-8842-A1", status: "Transporting",
    destination: "AIIMS New Delhi", etaMin: 6, fuel: 62, equipment: ["ALS", "Ventilator", "Defib"],
    lat: 28.51, lng: 77.15 },
  { id: "DL-01-EA-2214", driver: "Kartik Rao", patient: "HL-8842-A2", status: "Transporting",
    destination: "Safdarjung Hospital", etaMin: 11, fuel: 44, equipment: ["BLS"],
    lat: 28.54, lng: 77.18 },
  { id: "DL-01-EA-2233", driver: "Sameer Khan", patient: "HL-8842-A3", status: "Transporting",
    destination: "Apollo Hospital", etaMin: 4, fuel: 71, equipment: ["ALS", "Burns Kit"],
    lat: 28.53, lng: 77.28 },
  { id: "DL-01-EA-2240", driver: "Ajay Menon", patient: null, status: "Returning",
    destination: "Base Sector 22", etaMin: 18, fuel: 28, equipment: ["BLS"],
    lat: 28.60, lng: 77.22 },
  { id: "DL-01-EA-2255", driver: "Neha Iyer", patient: "HL-8842-A5", status: "Transporting",
    destination: "Max Super Speciality", etaMin: 14, fuel: 55, equipment: ["ALS", "Peds Kit"],
    lat: 28.55, lng: 77.21 },
  { id: "DL-01-EA-2260", driver: "Farah Ali", patient: "HL-8842-A7", status: "Enroute",
    destination: "AIIMS New Delhi", etaMin: 9, fuel: 80, equipment: ["ALS", "Ventilator"],
    lat: 28.52, lng: 77.19 },
  { id: "DL-01-EA-2266", driver: "Deepak Verma", patient: "HL-8842-A8", status: "At Scene",
    destination: "Safdarjung Hospital", etaMin: 0, fuel: 66, equipment: ["BLS"],
    lat: 28.46, lng: 77.03 },
  { id: "DL-01-EA-2280", driver: "Sunil Pillai", patient: null, status: "Available",
    destination: "Base Sector 4", etaMin: 0, fuel: 92, equipment: ["ALS"],
    lat: 28.63, lng: 77.10 },
];

export type Alert = {
  id: string; priority: "Critical" | "Warning" | "Information";
  title: string; source: string; time: string; body: string;
};

export const alerts: Alert[] = [
  { id: "AL-901", priority: "Critical", title: "LNJP ICU saturation at 99%", source: "AI Commander",
    time: "1 min ago", body: "Recommend immediate diversion of Red-triage inflow to AIIMS & Max." },
  { id: "AL-902", priority: "Critical", title: "O- blood shortage — Gurugram cluster", source: "Blood Bank Network",
    time: "4 min ago", body: "Only 18 units available across 4 hospitals. Trigger inter-district transfer." },
  { id: "AL-903", priority: "Warning", title: "NH-48 traffic congestion +9 min ETA", source: "Traffic Feed",
    time: "6 min ago", body: "Ambulance ETAs increasing; consider chopper transfer for Red patients." },
  { id: "AL-904", priority: "Warning", title: "Chemical plume drift southwest", source: "Weather + Sensors",
    time: "9 min ago", body: "Evacuation radius extended to 2.4 km. Notify Sector 3-5 residents." },
  { id: "AL-905", priority: "Information", title: "12 ambulances dispatched to MCI-018", source: "Dispatch",
    time: "12 min ago", body: "All units acknowledged. Median response time 6.4 min." },
];

export type Resource = {
  id: string; type: "Blood" | "Ventilator" | "Doctor" | "ICU" | "Ambulance" | "Oxygen";
  requester: string; provider: string; quantity: string; status: "Requested" | "Matched" | "In Transit" | "Fulfilled";
  aiConfidence: number;
};

export const resources: Resource[] = [
  { id: "RX-501", type: "Blood", requester: "LNJP Hospital", provider: "AIIMS New Delhi",
    quantity: "24 units O-", status: "In Transit", aiConfidence: 96 },
  { id: "RX-502", type: "Ventilator", requester: "Apollo Hospital", provider: "Max Super Speciality",
    quantity: "3 units", status: "Matched", aiConfidence: 91 },
  { id: "RX-503", type: "Doctor", requester: "Safdarjung Hospital", provider: "AIIMS New Delhi",
    quantity: "2 Trauma Surgeons", status: "Requested", aiConfidence: 78 },
  { id: "RX-504", type: "Oxygen", requester: "LNJP Hospital", provider: "INOX Air (Faridabad)",
    quantity: "600 L LMO", status: "In Transit", aiConfidence: 88 },
  { id: "RX-505", type: "ICU", requester: "Apollo Hospital", provider: "Dr. RML Hospital",
    quantity: "4 beds", status: "Fulfilled", aiConfidence: 94 },
  { id: "RX-506", type: "Ambulance", requester: "MCI-2410-017", provider: "CATS Fleet",
    quantity: "6 ALS units", status: "In Transit", aiConfidence: 99 },
];

export const kpi = {
  hospitalsConnected: 1284,
  activeIncidents: 3,
  patientsCoordinated: 12480,
  aiDecisions: 84520,
  ambulances: 3620,
};
