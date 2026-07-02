// Live deployment domain — used for canonical URLs, sitemap, and JSON-LD.
// The live site is lucaintel.com (the old mysehatconnect.com is not deployed).
export const SITE_URL = "https://lucaintel.com";

export const PRICES = {
  qualified_nurse: 4000,
  attendant: 3000,
};

export const QUALIFIED_NURSE_SERVICES = [
  { id: 'post_op_care',    label: 'Post-op Care',    urdu: 'آپریشن کے بعد دیکھ بھال', icon: 'Activity',    description: 'Wound care, dressing changes, and recovery support after surgery', descriptionUrdu: 'زخم کی دیکھ بھال، ڈریسنگ کی تبدیلی، اور آپریشن کے بعد صحت یابی میں مدد' },
  { id: 'elderly_care',    label: 'Elderly Care',    urdu: 'بزرگوں کی دیکھ بھال',    icon: 'Heart',        description: 'Help with medicines, movement, and day-to-day health monitoring for elderly patients', descriptionUrdu: 'بزرگ مریضوں کے لیے دوائی، چلنے پھرنے، اور روزمرہ صحت کی نگرانی میں مدد' },
  { id: 'paediatric_care', label: 'Paediatric Care', urdu: 'بچوں کی دیکھ بھال',      icon: 'Baby',         description: 'Nursing care for newborns, infants, and young children at home', descriptionUrdu: 'نوزائیدہ بچوں اور کم عمر بچوں کے لیے گھر پر نرسنگ دیکھ بھال' },
  { id: 'icu_stepdown',    label: 'ICU Step-down',   urdu: 'آئی سی یو کے بعد',       icon: 'HeartPulse',   description: 'Care for patients coming home after a stay in ICU or HDU', descriptionUrdu: 'آئی سی یو یا ایچ ڈی یو سے گھر آنے والے مریضوں کی دیکھ بھال' },
  { id: 'night_duty',      label: 'Night Duty',      urdu: 'رات کی ڈیوٹی',           icon: 'Moon',         description: 'A nurse stays through the night to monitor and care for your patient', descriptionUrdu: 'ایک نرس رات بھر آپ کے مریض کی نگرانی اور دیکھ بھال کے لیے موجود رہتی ہے' },
  { id: 'diabetic_care',   label: 'Diabetic Care',   urdu: 'ذیابیطس کی دیکھ بھال',   icon: 'Droplets',     description: 'Blood sugar checks, insulin injections, and diet guidance for diabetic patients', descriptionUrdu: 'ذیابیطس کے مریضوں کے لیے بلڈ شوگر چیک، انسولین انجیکشن، اور خوراک سے متعلق رہنمائی' },
  { id: 'mother_baby_care', label: 'Mother & Baby Care', urdu: 'ماں اور بچے کی دیکھ بھال', icon: 'Baby',     description: 'Newborn care plus postnatal support for new mothers — feeding, recovery, and hygiene at home', descriptionUrdu: 'نوزائیدہ بچے کی دیکھ بھال کے ساتھ نئی ماؤں کے لیے زچگی کے بعد کی مدد — گھر پر فیڈنگ، صحت یابی، اور صفائی' },
  { id: 'dementia_care',   label: "Dementia & Alzheimer's Care", urdu: 'ڈیمنشیا کی دیکھ بھال', icon: 'Brain', description: "Patient, specialised care for dementia and Alzheimer's patients — routine, safety, and companionship", descriptionUrdu: 'ڈیمنشیا اور الزائمر کے مریضوں کے لیے صبر اور مہارت سے دیکھ بھال — معمول، حفاظت، اور ساتھ' },
  { id: 'palliative_care', label: 'Palliative & Long-term Care', urdu: 'آرام دہ نگہداشت', icon: 'HandHeart', description: 'Comfort-focused nursing for cancer, stroke, and long-term patients, including pain and symptom management', descriptionUrdu: 'کینسر، فالج، اور طویل المدتی مریضوں کے لیے آرام پر مرکوز نرسنگ، جس میں درد اور علامات کا انتظام بھی شامل ہے' },
];

export const ATTENDANT_SERVICES = [
  { id: 'elderly_care',    label: 'Elderly Care',    urdu: 'بزرگوں کی دیکھ بھال',  icon: 'Heart',    description: 'Helping elderly patients with feeding, hygiene, movement, and daily routines', descriptionUrdu: 'بزرگ مریضوں کی فیڈنگ، صفائی، چلنے پھرنے، اور روزمرہ کاموں میں مدد' },
  { id: 'paediatric_care', label: 'Paediatric Care', urdu: 'بچوں کی دیکھ بھال',    icon: 'Baby',     description: 'Non-clinical care and support for children at home', descriptionUrdu: 'گھر پر بچوں کے لیے غیر طبی دیکھ بھال اور مدد' },
  { id: 'night_duty',      label: 'Night Duty',      urdu: 'رات کی ڈیوٹی',         icon: 'Moon',     description: 'An attendant stays through the night to keep your patient comfortable and safe', descriptionUrdu: 'ایک اٹینڈنٹ رات بھر آپ کے مریض کو آرام دہ اور محفوظ رکھنے کے لیے موجود رہتا ہے' },
];

export const CITIES = [
  'Lahore',
  'Karachi',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
];

export const LIVE_CITIES = ['Lahore'];

export const SHIFTS = [
  { id: 'morning', label: 'Day',   time: '8:00 AM – 8:00 PM' },
  { id: 'night',   label: 'Night', time: '8:00 PM – 8:00 AM' },
];

export const WHATSAPP_NUMBER = '923288489988';
export const CONTACT_PHONE_DISPLAY = '0328-8489988';
export const CONTACT_PHONE_TEL = '+923288489988';
export const OFFICE_ADDRESS = '132/2, Block-B, Model Town, Lahore, Pakistan';
export const CONTACT_EMAIL = 'care@mysehatconnect.com';

export const FAQ_ITEMS = [
  {
    q: 'Are all nurses Pakistan Nursing Council registered?',
    a: 'Yes. Every Qualified Nurse we send holds a valid PNC registration number, which is verified by our team before onboarding. Attendants are trained non-clinical caregivers with background verification.',
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
    a: 'Just call or WhatsApp us up to 4 hours before the shift and we will cancel or reschedule it at no charge.',
  },
  {
    q: 'Is the service available outside major cities?',
    a: 'Right now we serve all of Lahore — DHA, Gulberg, Johar Town, Model Town, Bahria Town, Cantt and more. We are expanding to other cities soon — call or WhatsApp us to check your area.',
  },
  {
    q: 'Can I request a female nurse specifically?',
    a: 'Yes, of course. Many families prefer a female caregiver for a female patient. Just tell us when we call and we will send a female nurse or attendant.',
  },
  {
    q: 'What happens if the nurse doesn\'t arrive on time?',
    a: 'We confirm the arrival time with you in advance and message you when your caregiver is on the way. If anyone is running late, our team calls you and sorts it out right away — a real person is always just a call or WhatsApp away.',
  },
];
