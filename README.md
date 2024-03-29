## Motivation

State manegement is no doubt one of the keys benefits of using React for your application. However, managing your states might become a nightmare as the features grow. Many have attempt to solve this problem and as a result, today we have a lot of different libraries that help you deal with that. In this blog, I will discuss different libraries and compare their pros and cons. Visit this [website](https://state-of-state.vercel.app/) to view their interactions. For the full sourcecode, please visit [repo](https://github.com/mikah13/react-state)

## Implementation

Count is probably one of the most iconic examples for every state management libraries. Today, we will build a slightly more complicated version of it using TypeScript.

Let's start with our simple implementation of type Student

```ts
export type Course = {
  name: string;
};
export type Student = {
  name: string;
  age: number;
  courses: Course[];
};
```

and then give it a default data such as:

```ts
export const defaultStudent: Student = {
  name: 'John Doe',
  age: 18,
  courses: [],
};
```

We will also give it a function add a new course. For the sake of simplicity, we will just hard-code the name of the new course for now.

```ts
export const registerCourse = (student: Student): Student => {
  const newCourse = { name: `Another courses ${new Date()}` };
  return { ...student, courses: [...student.courses, newCourse] };
};
```

That's it, we can now start playing around with different libraries.


## Jotai

From their website, Jotai is described as:

> Jotai takes an atomic approach to global React state management.

> Build state by combining atoms and renders are automatically optimized based on atom dependency. This solves the extra re-render issue of React context, eliminates the need for memoization, and provides a similar developer experience to signals while maintaining a declarative programming model.

This simple approach makes Jotai an extremely simple, performant and light-weight library to use. Now let's see how we can implement this the Jotai-way.

First, we need to create a store to initiallize the default state of the data. In my example, I put the code in `/states/jotai.ts`. The content of the file would look like:

```ts
import { Student, defaultStudent } from '@/lib/student';
import { atom } from 'jotai';

export const studentAtom = atom<Student>(defaultStudent);
```

Fairly quick and simple with only 3 lines of code. Let's see then how we can handle the state update.

```ts
import { studentAtom } from '@/states/jotai';
import { useAtom } from 'jotai';
import StateUI from './StateUI';
import { defaultStudent, registerCourse } from '@/lib/student';

const Jotai = () => {
  const [student, updateStudent] = useAtom(studentAtom);
  return (
    <StateUI
      label='Jotai'
      student={student}
      reset={() => updateStudent(defaultStudent)}
      addCourse={() => updateStudent(registerCourse(student))}
    />
  );
};

export default Jotai;
```
As you can see, Jotai uses an approach similarly to React `useState`. You are provided the value of the state and a reducer from the library and the implementation of `reset` and `addCourse` is totally up to the you. Jotai gives you the free to manipulate your data. This makes the setup of Jotai really quick and simple with no Provider needed (however, Jotai does have this feature if that's what you look for [docs](https://jotai.org/docs/core/provider)).


## Zustand

Zustand was developed with the intention to deal with common pitfalls, like the dreaded zombie child problem, react concurrency, and context loss between mixed renderers while also being small, fast and has a comfy API based on hooks, isn't boilerplatey or opinionated. Sounds like a dream come true right ? Let's see how Zustand works in this example.

First, we start again with a store. This code can be found in `/states/zustand.ts`

```ts
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
```

Then we can consume our state in a React component as follows:

```ts
import { useStore } from '@/states/zustand';
import StateUI from './StateUI';

const Zustand = () => {
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

export default Zustand;
```

From the look of it, Zustand is more verbose than Jotai. There are two main differences:
- Jotai uses atom approach where states are separately from each other, just like the `useState` hook. While in Zustand, everything can be centrallized in one store
- Actions are defined in Zustand. In Jotai you are free to implement them anywhere else.

I would say both would thrive in different use cases, however, if you just want to build something quick and simple, and the data type is not too complex, Jotai would be a better fit.

## Redux Toolkit (RTK)
Redux the oldest one on the list, yet, it's still commonly used nowadays. With their upgrade to RTK, a library built on top of the original Redux, it has been easier to implement RTK to your project. This library aim to be Simple, Opinionated, Powerful, and Effective.

To be add RTK to your project, there is a bit of boilerplate needed to be done:

1. Create a store and reducer

```ts
import { defaultStudent, registerCourse } from '@/lib/student';
import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export const studentSlice = createSlice({
  name: 'student',
  initialState: defaultStudent,
  reducers: {
    reset: () => {
      return defaultStudent;
    },
    addCourse: (state) => {
      return registerCourse(state);
    },
  },
});

export const store = configureStore({
  reducer: {
    student: studentSlice.reducer,
  },
});

export const { reset, addCourse } = studentSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

2. Wrap component tree with a `Provider`
```ts
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import { store } from '@/states/rtk.ts';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
        <App />
    </Provider>
  </React.StrictMode>
);
```

3. Add to React component

```ts
import StateUI from './StateUI';
import { useSelector, useDispatch } from 'react-redux';

import { reset, addCourse, RootState } from '@/states/rtk';
const RTK = () => {
  const student = useSelector((state: RootState) => state.student);
  const dispatch = useDispatch();
  return (
    <StateUI
      label='RTK'
      student={student}
      reset={() => dispatch(reset())}
      addCourse={() => dispatch(addCourse())}
    />
  );
};

export default RTK;
```

Out of the 3 libraries we had so far, RTK is a bit more verbose. In terms of the approach, we can see that it's not so much different from Zustand. You still need to add your states and actions to a centrallized store. And then use them in your components with 2 important hooks `useSelector` and `useDispatch`. I would say Zustand is probably an easy to work with since the only hook you need to use is `useStore` as opposed to having to remember 2.

## Recoil

Our last and final candidate is Recoil. As quoted from their website, it seems like Recoil has somewhat a similar approach to Jotai

> We want to improve this while keeping both the API and the semantics and behavior as Reactish as possible.

> Recoil defines a directed graph orthogonal to but also intrinsic and attached to your React tree. State changes flow from the roots of this graph (which we call atoms) through pure functions (which we call selectors) and into components. 

To add Jotai to your project, the process is pretty straight-forward.

1. Create a store
```ts
import { defaultStudent } from '@/lib/student';
import { atom } from 'recoil';
export const studentState = atom({
  key: 'studentState',
  default: defaultStudent,
});
```

2. Added the `Provider` around the top of the component tree.

```ts
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { RecoilRoot } from 'recoil';
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <RecoilRoot>
        <App />
      </RecoilRoot>
  </React.StrictMode>
);
```

3. Use it in your React component

```ts
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
```

Approach-wise this is the exact same one we have for Jotai with an exception that a Provider is mandatory for Recoil. Now that you have see all 4 in actions, let's compare them.


## Comparisons

| Library | Approach | Package Size | Boilerplate | Provider | Dev Tools |
|----------|----------|----------|----------|----------|----------|
| Jotai | Atomic | 404 kB | Low | Optional | Y |
| Zustand | Single Store | 324 kB | Moderate | None | Y |
| RTK | Single Store | 5.33 MB | High | Required | Y |
| Recoil | Atomic | 2.21 MB | Moderate | Required | N |

For more comparisons, please refer to [npm trends](https://npm-compare.com/@reduxjs/toolkit,zustand,recoil,jotai/#timeRange=THREE_YEARS)


## Conclusions:

- Jotai is like Recoil. Zustand is like Redux.
- Jotai and Recoil state consists of atoms (i.e. bottom-up). Zustand and RTK state is one object (i.e. top-down).
- Zustand and RTK require users to manually apply render optimizations by using selectors while in Jotai and Recoil, those are dealed with inherently.

