import { useStore } from '@/states/zustand';
import StateUI from './StateUI';

const Jotai = () => {
  const student = useStore((state) => state.student);
  const reset = useStore((action) => action.reset);
  const addCourse = useStore((action) => action.addCourse);
  return (
    <StateUI
      label='Zustand'
      student={student}
      reset={() => reset()}
      addCourse={() => addCourse()}
    />
  );
};

export default Jotai;
