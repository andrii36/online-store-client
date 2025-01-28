import RouteConfig from './RouteConfig'
import { BrowserRouter, useRoutes } from 'react-router-dom';

const AppRoutes = () => {
    const element = useRoutes(RouteConfig);
    return element;
  };
  
  export default function Routes() {
    return (
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    );
  }