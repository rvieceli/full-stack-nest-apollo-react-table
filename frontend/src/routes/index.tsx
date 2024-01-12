import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from './Home/home.page';
import { QueryParamsProvider } from '../context/QueryParams.context';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <QueryParamsProvider children={<HomePage />} />,
  },
]);
