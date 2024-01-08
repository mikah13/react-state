import { defaultStudent } from '@/lib/student';
import { atom } from 'recoil';
export const studentState = atom({
  key: 'studentState',
  default: defaultStudent,
});
