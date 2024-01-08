export type Course = {
  id: number;
  name: string;
};
export type Student = {
  name: string;
  age: number;
  courses?: Course[];
};

export const defaultStudent: Student = {
  name: 'John Doe',
  age: 18,
};
