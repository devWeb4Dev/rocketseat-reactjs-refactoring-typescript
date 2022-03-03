import renderer from 'react-test-renderer'

import { Dashboard } from '../index'

describe('Dashboard', () => {
  test('Snapshot Dashboard', () => {
    const component = renderer.create(<Dashboard />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
