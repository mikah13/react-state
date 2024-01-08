import { Student, defaultStudent } from '@/lib/student';
import { atom } from 'jotai';

export const studentAtom = atom<Student>(defaultStudent);
