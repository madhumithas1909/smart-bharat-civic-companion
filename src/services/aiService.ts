import type { ChatMessage } from '../types';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001';

export async function sendChatMessage(messages: ChatMessage[]): Promise<string> {
  try {
    const response = await fetch(`${API_BASE}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages }),
    });

    if (!response.ok) throw new Error('API request failed');

    const data = await response.json();
    return data.reply || 'Sorry, I could not process your request.';
  } catch {
    return getFallbackResponse(messages[messages.length - 1]?.content || '');
  }
}

function getFallbackResponse(query: string): string {
  const q = query.toLowerCase();
  const responses: Record<string, string> = {
    passport: `## How to Apply for a Passport\n\n1. **Register** on the Passport Seva portal (passportindia.gov.in)\n2. **Fill** the online application form\n3. **Pay** the fee online (₹1,500 normal / ₹3,500 Tatkal)\n4. **Book** an appointment at your nearest Passport Seva Kendra\n5. **Visit** with original documents: Aadhaar, PAN, Address Proof, Birth Proof\n6. **Police Verification** will be initiated after your visit\n7. **Dispatch** in 30-45 days (normal) or 7-14 days (Tatkal)\n\n> **Tip:** Keep all documents ready before your appointment to avoid delays.`,
    aadhaar: `## How to Get an Aadhaar Card\n\n1. **Locate** an Aadhaar enrollment center near you\n2. **Book** an appointment online at uidai.gov.in (optional)\n3. **Visit** with Proof of Identity, Address, and Date of Birth\n4. **Biometric capture**: fingerprints, iris scan, and photograph\n5. **Acknowledgement** slip with 28-digit enrollment ID\n6. **Download** e-Aadhaar after verification (30-90 days)\n\n> **Note:** Aadhaar is free of cost. Children can also enroll.`,
    pan: `## How to Apply for a PAN Card\n\n1. **Visit** the NSDL or UTIITSL portal\n2. **Fill** Form 49A (Indian citizens) online\n3. **Submit** documents: Aadhaar, Address Proof, Birth Proof\n4. **Pay** the fee (₹107 for physical, ₹72 for e-PAN)\n5. **Aadhaar OTP** verification\n6. **e-PAN** is delivered to email within 15-20 days\n\n> **Tip:** Link your PAN with Aadhaar to keep it active.`,
    'driving license': `## How to Get a Driving License\n\n1. **Apply** for a Learner License on parivahan.gov.in\n2. **Pass** the learner's test (traffic signs & rules)\n3. **Wait** 30 days after learner license\n4. **Book** a driving test slot\n5. **Visit** RTO with vehicle and documents\n6. **Pass** the driving test\n7. **Receive** your permanent DL in 7-30 days\n\n**Required:** Aadhaar, Age Proof, Address Proof, Learner License`,
    vote: `## How to Register to Vote\n\n1. **Visit** voters.eci.gov.in\n2. **Fill** Form 6 for new voter registration\n3. **Upload** photo, Aadhaar, and address proof\n4. **Submit** online or visit your BLO/ERO office\n5. **Verification** by Booth Level Officer\n6. **EPIC** (Voter ID) delivered in 30-60 days\n\n> **Eligibility:** Indian citizen, 18+ years as of qualifying date.`,
    'birth certificate': `## How to Get a Birth Certificate\n\n1. **Register** birth within 21 days at the municipal corporation\n2. **Visit** crsorgi.gov.in for online registration\n3. **Submit** hospital discharge summary and parents' documents\n4. **Verification** by local registrar\n5. **Download** the certificate in 7-21 days\n\n> **Note:** Late registration (after 21 days) requires additional affidavit.`,
    pmay: `## How to Apply for PMAY\n\n1. **Check eligibility** at pmaymis.gov.in\n2. **Register** with Aadhaar and mobile number\n3. **Fill** the application with income and family details\n4. **Upload** documents: Aadhaar, Income Proof, Bank Passbook\n5. **Submit** at your nearest CSC or online\n6. **Beneficiary list** is published after verification\n\n> **Eligibility:** Annual income up to ₹18 lakh, no pucca house, no prior housing aid.`,
    ayushman: `## How to Apply for Ayushman Bharat (PM-JAY)\n\n1. **Check** if your family is in the SECC 2011 list at pmjay.gov.in\n2. **Visit** a Common Service Center (CSC) or empanelled hospital\n3. **Provide** Aadhaar and Ration Card for verification\n4. **Get** your Ayushman Bharat Card (same day)\n5. **Use** at any empanelled hospital for cashless treatment up to ₹5 lakh\n\n> **Note:** No fee required. The card is completely free.`,
    farmer: `## How to Get Farmer Schemes (PM-KISAN)\n\n1. **Check eligibility** at pmkisan.gov.in\n2. **Register** with Aadhaar, land records, and bank details\n3. **Visit** your local CSC or agriculture office\n4. **Verification** by Patwari/Village Officer\n5. **Approval** by state government\n6. **₹6,000/year** transferred in 3 installments to your bank\n\n> **Eligibility:** Small/marginal farmer with cultivable land.`,
    scholarship: `## How to Get Scholarships\n\n1. **Visit** scholarships.gov.in (National Scholarship Portal)\n2. **Register** with Aadhaar and mobile number\n3. **Fill** the application for your scholarship scheme\n4. **Upload** documents: Income Certificate, Caste Certificate, Mark sheets, Bank Passbook\n5. **Institution verification** by your school/college\n6. **Amount** credited directly to your bank account\n\n> **Tip:** Apply early as deadlines vary by scheme.`,
  };

  for (const key of Object.keys(responses)) {
    if (q.includes(key)) return responses[key];
  }

  return `I'm here to help with government services and civic queries. You can ask me about:\n\n- **Passport, Aadhaar, PAN, Driving License** applications\n- **Voter registration** and **Birth Certificate**\n- **PMAY** housing and **Ayushman Bharat** health insurance\n- **Farmer schemes** (PM-KISAN) and **Scholarships**\n- **Senior Citizen Pension** and more\n\n> Try asking: *"How to apply for a Passport?"* for a detailed step-by-step guide.`;
}
