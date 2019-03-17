import React from 'react';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({ adapter: new Adapter() });

describe('<NavigationItems />', () => {
    let wrapper;
    beforeEach(() => {
        wrapper = shallow(<NavigationItems isAuthenticated />);
    });

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        wrapper.setProps({ isAuthenticated: false });
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('should render threee <NavigationItem /> elements if authenticated', () => {
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

    it('should had logout button', () => {
        expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    });
});