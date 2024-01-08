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
