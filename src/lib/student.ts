export type Course = {
  name: string;
};
export type Student = {
  name: string;
  age: number;
  courses: Course[];
};

export const defaultStudent: Student = {
  name: 'John Doe',
  age: 18,
  courses: [],
};

export const registerCourse = (student: Student): Student => {
  const newCourse = { name: `Another courses ${new Date()}` };

  return { ...student, courses: [...student.courses, newCourse] };
};
