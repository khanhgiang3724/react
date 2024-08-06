import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const LayoutAdmin = () => (
  <div className='flex'>
    <div className='w-1/4'>
      <Sidebar />
    </div>
    
    <div className='w-3/4'>
      <Outlet /> 
    </div>
  </div>
);
export default LayoutAdmin
