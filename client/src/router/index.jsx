import { createBrowserRouter } from 'react-router-dom';
import Tasks from '../screens/Tasks';

export const router = createBrowserRouter([{ path: '/', element: <Tasks /> }]);
