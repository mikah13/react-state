import { Student, defaultStudent, registerCourse } from '@/lib/student';
import { create } from 'zustand';

type State = {
  student: Student;
};

type Action = {
  reset: () => void;
  addCourse: () => void;
};

export const useStore = create<State & Action>()((set) => ({
  student: defaultStudent,
  reset: () => set({ student: defaultStudent }),
  addCourse: () =>
    set((state) => ({
      student: registerCourse(state.student),
    })),
}));
