import { studentState } from '@/states/recoil';
import StateUI from './StateUI';
import { defaultStudent, registerCourse } from '@/lib/student';
import { useRecoilState } from 'recoil';

const Recoil = () => {
  const [student, updateStudent] = useRecoilState(studentState);
  return (
    <StateUI
      label='Recoil'
      student={student}
      reset={() => updateStudent(defaultStudent)}
      addCourse={() => updateStudent(registerCourse(student))}
    />
  );
};

export default Recoil;
