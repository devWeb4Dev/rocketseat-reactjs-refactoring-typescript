import renderer from 'react-test-renderer'

import { Dashboard } from '../index'

it('Snapshot Dashboard', () => {
  const component = renderer.create(<Dashboard />)
  const tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})
