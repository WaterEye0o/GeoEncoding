const React = require('react-native');
const utils = require('react-addons-test-utils');

// use dontMock+require syntax to fix coverage disappearing bug
jest.dontMock('../addressList');
var AddressList = require('../addressList');
// require.requireActual works fine for tests, however it makes test coverage disappearing currently
// const AddressList = require.requireActual('../../app/components/addressList');

// const shallowHelpers = require('react-shallow-renderer-helpers');
// const shallowRenderer = shallowHelpers.createRenderer();

describe('AddressList', function() {

  function renderAddressList(props) {
    const renderer = utils.createRenderer();
    renderer.render(<AddressList {...props}/>);
    return renderer.getRenderOutput();
  }

  beforeEach(() => {

  });

  it('should render correct TextInput placeholder', () => {
    const props = {
    };
    const output = renderAddressList(props);
    expect(output.props.children[1].props.children.props.placeholder).toEqual('Search location');
  });

  it('should not render wrong TextInput placeholder', () => {
    const props = {
    };
    const output = renderAddressList(props);
    expect(output.props.children[1].props.children.props.placeholder).toNotEqual('');
  });

  it('should render searchString property', () => {
    const props = {
      searchString: "melbourne"
    };
    const output = renderAddressList(props);
    expect(output.props.children[1].props.children.props.value).toEqual(props.searchString);
  });

  // it('should render TextInput placeholder', () => {
  //   shallowRenderer.render(() => <AddressList />);
  //   let output = shallowRenderer.getRenderOutput();
  //   expect("Search location").toBe(output.props.children[1].props.children.props.placeholder);
  // });
  //
  // it('should render searchString property', () => {
  //   shallowRenderer.render(() => <AddressList searchString="melbourne"/>);
  //   let output = shallowRenderer.getRenderOutput();
  //   expect("melbourne").toBe(output.props.children[1].props.children.props.value);
  // });

});
