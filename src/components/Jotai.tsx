import { studentAtom } from '@/states/jotai';
import { Button } from './ui/button';
import { useAtom } from 'jotai';

const Jotai = () => {
  const [count, setCount] = useAtom(studentAtom);
  return (
      <div>
          
      <Button onClick={() => setCount((c) => c + 1)}>
        Jotai Count: {count}
      </Button>
    </div>
  );
};

export default Jotai;
