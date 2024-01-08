import { studentAtom } from '@/states/jotai';
import { useAtom } from 'jotai';
import StateUI from './StateUI';
import { defaultStudent, registerCourse } from '@/lib/student';

const Jotai = () => {
  const [student, updateStudent] = useAtom(studentAtom);
  return (
    <StateUI
      student={student}
      reset={() => updateStudent(defaultStudent)}
      addCourse={() => updateStudent(registerCourse(student))}
    />
  );
};

export default Jotai;
