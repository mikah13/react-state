import StateUI from './StateUI';
import { defaultStudent, registerCourse } from '@/lib/student';

const Jotai = () => {
  return (
    <StateUI
      label=''
      student={student}
      reset={() => updateStudent(defaultStudent)}
      addCourse={() => updateStudent(registerCourse(student))}
    />
  );
};

export default Jotai;
