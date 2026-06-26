export const PRICES = {
  qualified_nurse: 4000,
  attendant: 3000,
};

export const QUALIFIED_NURSE_SERVICES = [
  { id: 'post_op_care',    label: 'Post-op Care',    urdu: 'آپریشن کے بعد دیکھ بھال', icon: 'Activity',    description: 'Wound care, dressing changes, and recovery support after surgery' },
  { id: 'elderly_care',    label: 'Elderly Care',    urdu: 'بزرگوں کی دیکھ بھال',    icon: 'Heart',        description: 'Help with medicines, movement, and day-to-day health monitoring for elderly patients' },
  { id: 'paediatric_care', label: 'Paediatric Care', urdu: 'بچوں کی دیکھ بھال',      icon: 'Baby',         description: 'Nursing care for newborns, infants, and young children at home' },
  { id: 'icu_stepdown',    label: 'ICU Step-down',   urdu: 'آئی سی یو کے بعد',       icon: 'HeartPulse',   description: 'Care for patients coming home after a stay in ICU or HDU' },
  { id: 'night_duty',      label: 'Night Duty',      urdu: 'رات کی ڈیوٹی',           icon: 'Moon',         description: 'A nurse stays through the night to monitor and care for your patient' },
  { id: 'diabetic_care',   label: 'Diabetic Care',   urdu: 'ذیابیطس کی دیکھ بھال',   icon: 'Droplets',     description: 'Blood sugar checks, insulin injections, and diet guidance for diabetic patients' },
  { id: 'mother_baby_care', label: 'Mother & Baby Care', urdu: 'ماں اور بچے کی دیکھ بھال', icon: 'Baby',     description: 'Newborn care plus postnatal support for new mothers — feeding, recovery, and hygiene at home' },
  { id: 'dementia_care',   label: "Dementia & Alzheimer's Care", urdu: 'ڈیمنشیا کی دیکھ بھال', icon: 'Brain', description: "Patient, specialised care for dementia and Alzheimer's patients — routine, safety, and companionship" },
  { id: 'palliative_care', label: 'Palliative & Long-term Care', urdu: 'آرام دہ نگہداشت', icon: 'HandHeart', description: 'Comfort-focused nursing for cancer, stroke, and long-term patients, including pain and symptom management' },
];

export const ATTENDANT_SERVICES = [
  { id: 'elderly_care',    label: 'Elderly Care',    urdu: 'بزرگوں کی دیکھ بھال',  icon: 'Heart',    description: 'Helping elderly patients with feeding, hygiene, movement, and daily routines' },
  { id: 'paediatric_care', label: 'Paediatric Care', urdu: 'بچوں کی دیکھ بھال',    icon: 'Baby',     description: 'Non-clinical care and support for children at home' },
  { id: 'night_duty',      label: 'Night Duty',      urdu: 'رات کی ڈیوٹی',         icon: 'Moon',     description: 'An attendant stays through the night to keep your patient comfortable and safe' },
];

export const CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
];

export const SHIFTS = [
  { id: 'morning', label: 'Day',   time: '8:00 AM – 8:00 PM' },
  { id: 'night',   label: 'Night', time: '8:00 PM – 8:00 AM' },
];

export const WHATSAPP_NUMBER = '923288489988';
export const CONTACT_PHONE_DISPLAY = '0328-8489988';
export const CONTACT_PHONE_TEL = '+923288489988';

export const FAQ_ITEMS = [
  {
    q: 'Are all nurses Pakistan Nursing Council registered?',
    a: 'Yes. Every Qualified Nurse on our platform holds a valid PNC registration number, which is verified by our team before onboarding. Attendants are trained non-clinical caregivers with background verification.',
  },
  {
    q: 'Can I request a specific nurse again?',
    a: 'Absolutely. Once you have worked with a nurse you trust, you can request them by name when booking and we will do our best to accommodate.',
  },
  {
    q: 'What is the difference between a Qualified Nurse and an Attendant?',
    a: 'A Qualified Nurse is PNC registered and can perform clinical tasks such as wound dressing, IV care, and medication administration. An Attendant provides non-clinical support — feeding, hygiene, companionship, and general patient comfort.',
  },
  {
    q: 'How do I pay?',
    a: 'We currently accept cash on visit. Easypaisa and JazzCash payments are coming soon.',
  },
  {
    q: 'What if I need to cancel or reschedule?',
    a: 'You can cancel or reschedule up to 4 hours before the shift at no charge via your dashboard or by calling/WhatsApp-ing our support team.',
  },
  {
    q: 'Is the service available outside major cities?',
    a: 'We currently serve Lahore, Karachi, Islamabad, Rawalpindi, and Faisalabad. We are expanding — contact us to check availability in your city.',
  },
  {
    q: 'Can I request a female nurse specifically?',
    a: 'Yes. Gender preference is a first-class feature on our platform. Simply select Female when searching or booking and only female caregivers will be shown.',
  },
  {
    q: 'What happens if the nurse doesn\'t arrive on time?',
    a: 'Our nurses are GPS-tracked. If your nurse is running late you will receive an SMS update. If arrival is delayed beyond 30 minutes, contact our support line and we will resolve it immediately.',
  },
];
