
export type BusinessType = 
  | 'Wellness Center' 
  | 'Chiropractor' 
  | 'Holistic Therapist' 
  | 'Yoga Studio' 
  | 'Spa & MedSpa' 
  | 'Counseling Service';

export type EntryPoint = 
  | 'Google Maps "Call Now"'
  | 'Website Chat'
  | 'Website Contact Form'
  | 'WhatsApp Message'
  | 'Instagram DM'
  | 'Referral Call';

export type Intent = 
  | 'Book Appointment'
  | 'Ask a Question'
  | 'Get a Quote'
  | 'Pay / Deposit'
  | 'Reschedule / Cancel';

export interface ChatMessage {
  sender: 'customer' | 'ai';
  text: string;
}

export interface SimulationScenario {
  id: string;
  businessType: BusinessType;
  entryPoint: EntryPoint;
  intent: Intent;
  conversation: ChatMessage[];
  aiActions: string[];
  manualTasks: string[];
  metrics: {
    minutesSaved: number;
    missedCallRecovery: boolean;
    revenuePotential: number;
  };
}

export interface UserMetrics {
  avgBookingValue: number;
  leadsPerWeek: number;
  missedCallsPerWeek: number;
  avgSessionsPerClient: number;
}
