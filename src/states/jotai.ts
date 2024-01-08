import { Student, defaultStudent } from '@/lib/type';
import { atom } from 'jotai';

export const studentAtom = atom<Student>(defaultStudent);
