import { Routes as RCRoutes, Route } from 'react-router-dom'

import { Dashboard } from '../pages/Dashboard'

const Routes: React.FC = () => (
  <RCRoutes>
    <Route path="/" element={Dashboard} />
  </RCRoutes>
)

export default Routes
