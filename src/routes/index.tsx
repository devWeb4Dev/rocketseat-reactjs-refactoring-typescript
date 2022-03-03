import { Routes as RCRoutes, Route } from 'react-router-dom'

import { Dashboard } from '../pages/Dashboard'

export const Routes: React.FC = () => (
  <RCRoutes>
    <Route path="/" element={<Dashboard />} />
  </RCRoutes>
)
