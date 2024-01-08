import { Student } from '@/lib/student';
import StudentInfo from './StudentInfo';
import { Button } from './ui/button';
import { getSourceCodeURL } from '@/lib/utils';

type Props = {
  label: string;
  student: Student;
  reset: () => void;
  addCourse: () => void;
};
const StateUI = ({ label, student, reset, addCourse }: Props) => {
  return (
    <div className='flex flex-col'>
      <div className='text-white border border-b-0 border-white flex justify-center items-center p-1'>
        {label}
      </div>
      <StudentInfo student={student} />
      <div className='justify-between flex flex-row space-x-4 mt-4'>
        <Button onClick={reset}>Reset</Button>
        <Button onClick={addCourse} variant='outline'>
          Add Course
        </Button>
        <Button
          variant='ghost'
          className='bg-blue-300'
          onClick={() => (window.location.href = getSourceCodeURL(label))}
        >
          Code
        </Button>
      </div>
    </div>
  );
};

export default StateUI;
