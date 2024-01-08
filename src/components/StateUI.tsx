import { Student } from '@/lib/student';
import StudentInfo from './StudentInfo';
import { Button } from './ui/button';

type Props = {
  student: Student;
  reset: () => void;
  addCourse: () => void;
};
const StateUI = ({ student, reset, addCourse }: Props) => {
  return (
    <div className='flex flex-col'>
      <StudentInfo student={student} />
      <div className='flex flex-row space-x-4 mt-4'>
        <Button onClick={reset}>Reset</Button>
        <Button onClick={addCourse} variant='outline'>
          Add Course
        </Button>
      </div>
    </div>
  );
};

export default StateUI;
