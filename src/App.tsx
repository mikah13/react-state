import './App.css';
import Jotai from './components/Jotai';
import RTK from './components/RTK';
import Zustand from './components/Zustand';

function App() {
  return (
    <div className='flex flex-row space-x-4  w-screen px-4 py-6 bg-black'>
      <div className='flex flex-col w-[300px] space-y-7'>
        <Jotai />
        <Zustand />
        <RTK />
      </div>
      <div className='flex flex-col w-[300px] space-y-7'></div>
    </div>
  );
}

export default App;
