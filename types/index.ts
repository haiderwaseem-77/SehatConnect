export type Gender = 'male' | 'female';
export type Category = 'qualified_nurse' | 'attendant';
export type ShiftType = 'morning' | 'night';
export type DurationType = 'one_time' | 'daily' | 'weekly' | 'monthly';
export type BookingStatus = 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'cancelled';
export type AvailabilityStatus = 'available_now' | 'available_today' | 'unavailable';

export interface Caregiver {
  id: string;
  name: string;
  gender: Gender;
  category: Category;
  pnc_number?: string;
  city: string;
  experience_years?: number;
  bio: string;
  photo_url?: string;
  is_available: boolean;
  availability_status: AvailabilityStatus;
  is_verified: boolean;
  rating_avg?: number;
  review_count?: number;
  services: string[];
  specialisations?: string[];
}

export interface Booking {
  id: string;
  booking_ref: string;
  user_id: string;
  caregiver_id?: string;
  service_type: string;
  category: Category;
  gender_preference?: Gender;
  shift: ShiftType;
  booking_date: string;
  duration_type: DurationType;
  patient_name: string;
  patient_age: number;
  patient_condition: string;
  address: string;
  city: string;
  // Optional as of 2026-07-02: prices are hidden from all public surfaces
  // (partner decision, see NORTH-STAR Decision Ledger / lib/constants.ts
  // PRICES comment) — kept restorable rather than removed.
  price?: number;
  status: BookingStatus;
  created_at: string;
}

export interface User {
  id: string;
  phone: string;
  name: string;
  email?: string;
  city?: string;
}

export interface Review {
  id: string;
  booking_id: string;
  user_id: string;
  caregiver_id: string;
  rating: number;
  comment: string;
  user_name: string;
  created_at: string;
}

export interface BookingFormData {
  step: number;
  category: Category | '';
  service_type: string;
  gender_preference: Gender | '';
  patient_name: string;
  patient_age: string;
  patient_condition: string;
  booking_date: string;
  shift: ShiftType | '';
  duration_type: DurationType | '';
  city: string;
  address: string;
  contact_name: string;
  phone: string;
  email: string;
}
