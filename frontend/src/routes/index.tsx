import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from './Home/home.page';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);
