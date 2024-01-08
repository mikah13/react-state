import { Student } from '@/lib/student';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';

const StudentInfo = ({ student }: { student: Student }) => {
  return (
    <Card className='rounded-none'>
      <CardHeader>
        <CardTitle>{student.name}</CardTitle>
        <CardDescription>{student.age} years old</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Course count: {student.courses?.length || 0}</p>
      </CardContent>
    </Card>
  );
};

export default StudentInfo;
