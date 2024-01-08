import './App.css';
import Jotai from './components/Jotai';
import Zustand from './components/Zustand';

function App() {
  return (
    <div className='flex flex-col h-screen w-screen px-4 py-6 bg-black'>
      <div className='flex flex-col w-[300px] space-y-10'>
        <Jotai />
        <Zustand />
      </div>
    </div>
  );
}

export default App;
