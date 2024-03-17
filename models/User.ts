import { User as FirebaseUser } from 'firebase/auth';

interface User extends FirebaseUser {
  data?: UserData;
}

interface UserData {
  uid: string; // User ID
  trainerUid?: string; // Trainer ID
  age?: number;
  gender?: string;
  phisicalStats?: PhysicalStats;
}

interface PhysicalStats {
  heightInCm: number; // Height in centimeters
  weightInKg: number; // Weight in kilograms
  bodyFatPercentage: number; // Body fat percentage
  muscleMassInKg: number; // Muscle mass in kilograms
  restingHeartRate: number; // Resting heart rate (beats per minute)
  waistCircumferenceInCm: number; // Waist circumference in centimeters
  hipCircumferenceInCm: number; // Hip circumference in centimeters
}

export const createNewUser = (u: FirebaseUser): User => {
  return {
    ...u,
    data: {
      uid: '',
      trainerUid: '',
      age: 0,
      gender: '',
      phisicalStats: {
        heightInCm: 0,
        weightInKg: 0,
        bodyFatPercentage: 0,
        muscleMassInKg: 0,
        restingHeartRate: 0,
        waistCircumferenceInCm: 0,
        hipCircumferenceInCm: 0,
      },
    },
  };
};

export type { User, UserData };

export default User;
