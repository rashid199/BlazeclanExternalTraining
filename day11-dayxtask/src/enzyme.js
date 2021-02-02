// import Enzyme Object Model to test components
// with Shallow, Mount, Render
// Enzyme: The Test Utikity Obect Model
// configure: Configute Enzyme with React App
// shallow: Target DOM test for specific Component
// mount: Target DOM test for entire DOM Tree
import Enzyme, {configure, shallow,mount} from 'enzyme';
// import the React ENzyme Adapter
import Adapter from 'enzyme-adapter-react-16';

// COnfigure the Enzyme with React
configure({adapter: new Adapter()});

// export Object Model so that Test can use it
export {shallow,mount};
// export enzyme
export default Enzyme;