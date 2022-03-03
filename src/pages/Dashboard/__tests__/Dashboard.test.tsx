import renderer from 'react-test-renderer'

import { Dashboard } from '../index'

describe('Counter', () => {
  test('Link changes the class when hovered', () => {
    const component = renderer.create(<Dashboard />)
    const tree = component.toJSON()
    expect(tree).toMatchSnapshot()
  })
})
