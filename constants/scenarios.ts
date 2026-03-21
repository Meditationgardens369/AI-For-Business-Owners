
import { SimulationScenario, BusinessType, EntryPoint, Intent } from '../types';

export const SCENARIOS: SimulationScenario[] = [
  {
    id: 'wellness-q',
    businessType: 'Wellness Center',
    entryPoint: 'WhatsApp Message',
    intent: 'Ask a Question',
    conversation: [
      { sender: 'customer', text: 'Do you have any packages for the full detox program? Also, do you provide towels?' },
      { sender: 'ai', text: 'Hi there! Yes, our Vitality Detox includes a 3-step infrared session and a nutritional consultation. We provide organic cotton towels and robes for all guests. Would you like a price list for our 3, 5, or 10-day packages?' },
      { sender: 'customer', text: '5-day sounds good. What is the cost?' },
      { sender: 'ai', text: 'The 5-day package is €450 (saving you €50). I can send over the schedule and a secure booking link if you like?' },
      { sender: 'customer', text: 'Yes, please.' },
      { sender: 'ai', text: 'Perfect. Sent! Once you book, I will send you the pre-detox preparation guide. See you soon!' }
    ],
    aiActions: [
      'WhatsApp Auto-Reply triggered',
      'Facility FAQ bot answered "Towels"',
      'Package pricing lookup',
      'Secure payment link generated',
      'Prep-guide PDF sent via SMS'
    ],
    manualTasks: [
      'Answering phone during sessions',
      'Manually explaining towel policy',
      'Calculating multi-day discounts',
      'Emailing PDF files manually',
      'Checking bank for transfers'
    ],
    metrics: { minutesSaved: 18, missedCallRecovery: false, revenuePotential: 450 }
  },
  {
    id: 'generic-cancel',
    businessType: 'Wellness Center',
    entryPoint: 'WhatsApp Message',
    intent: 'Reschedule / Cancel',
    conversation: [
      { sender: 'customer', text: 'Hi, I have a session tomorrow at 10am but I woke up with a fever. Can I move it to next week?' },
      { sender: 'ai', text: 'I am so sorry to hear you are not feeling well! Please rest up. I have cancelled your slot for tomorrow. Would you like to see what we have open for next Thursday or Friday instead?' },
      { sender: 'customer', text: 'Next Thursday afternoon works.' },
      { sender: 'ai', text: 'Perfect. I have moved your 10am session to Thursday at 3:00 PM. You should receive a confirmation SMS in a moment. Get well soon!' },
      { sender: 'customer', text: 'Thank you so much!' }
    ],
    aiActions: [
      'Cancellation policy verification',
      'Calendar slot released instantly',
      'Re-booking availability search',
      'SMS confirmation dispatched',
      'Internal staff notification'
    ],
    manualTasks: [
      'Checking phone while with clients',
      'Manual calendar deletion',
      'Back-and-forth availability texts',
      'Updating paper scheduling book',
      'Manually sending new confirmation'
    ],
    metrics: { minutesSaved: 15, missedCallRecovery: false, revenuePotential: 0 }
  },
  {
    id: 'generic-pay',
    businessType: 'Wellness Center',
    entryPoint: 'Website Chat',
    intent: 'Pay / Deposit',
    conversation: [
      { sender: 'customer', text: 'Hi, I want to pay the deposit for the weekend retreat. Can I do it over the phone?' },
      { sender: 'ai', text: 'Hello! To keep your details secure, I can send you a 1-click payment link instead. It supports Apple Pay, Google Pay, and all major cards. Shall I send it to your mobile?' },
      { sender: 'customer', text: 'Yes, that is much easier. Send it over.' },
      { sender: 'ai', text: 'Sent! I have also applied the Early Bird discount we discussed. You will get an automated invoice as soon as it clears.' }
    ],
    aiActions: [
      'Secure payment link generation',
      'Mobile wallet (Apple/Google) integration',
      'Auto-invoice generation',
      'CRM deposit tracking',
      'Discount logic application'
    ],
    manualTasks: [
      'Taking credit card over phone',
      'PCI compliance paperwork',
      'Manually typing in card numbers',
      'Emailing manual receipts',
      'Reconciling bank statements'
    ],
    metrics: { minutesSaved: 20, missedCallRecovery: false, revenuePotential: 150 }
  },
  {
    id: 'chiro-book',
    businessType: 'Chiropractor',
    entryPoint: 'Google Maps "Call Now"',
    intent: 'Book Appointment',
    conversation: [
      { sender: 'customer', text: 'My lower back is killing me, do you have any emergency slots today?' },
      { sender: 'ai', text: 'I am sorry to hear that! We actually had a cancellation for 4:15 PM today. Would you like to take that "Fast-Track" assessment slot?' },
      { sender: 'customer', text: 'Yes! Thank God. I will be there.' },
      { sender: 'ai', text: 'Great. I have reserved 4:15 PM for you. Since it is your first time, I am sending a digital intake form now. If you fill it out before you arrive, the doctor can see you immediately.' },
      { sender: 'customer', text: 'Forms done. See you at 4.' },
      { sender: 'ai', text: 'Received! I have also sent the Google Maps directions to your phone. Drive safe!' }
    ],
    aiActions: [
      'Missed call text-back (Instant)',
      'Calendar cancellation sync',
      'Priority slot detection',
      'Digital intake form automation',
      'GPS location auto-shared'
    ],
    manualTasks: [
      'Hand-writing intake forms',
      'Giving directions over phone',
      'Scanning paper files',
      'Empty time-slots from no-shows',
      'Calling back missed inquiries'
    ],
    metrics: { minutesSaved: 22, missedCallRecovery: true, revenuePotential: 95 }
  },
  {
    id: 'holistic-quote',
    businessType: 'Holistic Therapist',
    entryPoint: 'Website Chat',
    intent: 'Get a Quote',
    conversation: [
      { sender: 'customer', text: 'I am looking for a custom plan for chronic stress. Do you do bespoke aromatherapy blends?' },
      { sender: 'ai', text: 'Hello! Yes, our Holistic Balance plan includes a customized essential oil blend based on your consultation. For a 90-minute initial session plus a custom 30ml oil, it is €125. Would you like to see my availability for this week?' },
      { sender: 'customer', text: 'That sounds fair. What about next Tuesday?' },
      { sender: 'ai', text: 'Tuesday at 11:00 AM or 2:30 PM are open. Should I pencil you in?' }
    ],
    aiActions: [
      '24/7 Service inquiry handling',
      'Custom pricing lookup',
      'Live availability search',
      'CRM lead auto-entry',
      'Automatic follow-up scheduled'
    ],
    manualTasks: [
      'Repetitive pricing emails',
      'Checking paper diary for gaps',
      'Typing out client preferences',
      'Chasing unconfirmed leads'
    ],
    metrics: { minutesSaved: 15, missedCallRecovery: false, revenuePotential: 125 }
  }
];

export const getScenario = (business: BusinessType, entry: EntryPoint, intent: Intent): SimulationScenario => {
  // Try exact match first
  let match = SCENARIOS.find(s => s.businessType === business && s.intent === intent);
  
  // If no business-specific match, try intent-specific match (generic)
  if (!match) {
    match = SCENARIOS.find(s => s.intent === intent);
  }

  // If still no match, fallback to first for that business or total fallback
  if (!match) {
    match = SCENARIOS.find(s => s.businessType === business) || SCENARIOS[0];
  }

  const refined = JSON.parse(JSON.stringify(match)) as SimulationScenario;
  refined.businessType = business; // Ensure the label matches even if it's a generic intent scenario
  refined.entryPoint = entry;
  refined.intent = intent;

  const firstMsg = refined.conversation[0];
  if (firstMsg) {
    const coreText = firstMsg.text.replace(/^Hi, I found you on Maps\. |^Hey! Saw your latest post\. |^Hi! I found your number\. |^Hello! I'm on your website\. /g, "");
    
    switch (entry) {
      case 'Instagram DM':
        firstMsg.text = `Hey! Just saw your latest post. ${coreText}`;
        break;
      case 'WhatsApp Message':
        firstMsg.text = `Hi! I found your business on WhatsApp. ${coreText}`;
        break;
      case 'Website Chat':
        firstMsg.text = `Hello! I'm browsing your website right now. ${coreText}`;
        break;
      case 'Website Contact Form':
        firstMsg.text = `[Form Submission] Message: ${coreText}`;
        break;
      case 'Referral Call':
        firstMsg.text = `Hi, my friend Sarah recommended I call you. ${coreText}`;
        break;
      case 'Google Maps "Call Now"':
        firstMsg.text = `Hi, I found you on Google Maps. ${coreText}`;
        break;
    }
  }

  return refined;
};
