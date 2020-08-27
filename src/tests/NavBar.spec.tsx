import React from 'react';
import { mount } from 'enzyme';
import NavBar, {util} from '../components/NavBar';
import { GlobalProvider} from '../GlobalProviders/GlobalProvider';

describe('Test NavBar', ()=>{

    it('it should have 3 child divs navLeft, navMid and navRight', ()=>{
        const wrapper = mount(<GlobalProvider><NavBar/></GlobalProvider>);
        const navContainer = wrapper.children().children();
        const childDivs = navContainer.children();

        expect(childDivs.length).toBe(3);
        expect(childDivs.find('div.navLeft').length).toBe(1);
        expect(childDivs.find('div.navMid').length).toBe(1);
        expect(childDivs.find('div.navRight').length).toBe(1);

        const hamBurger = childDivs.find('div.navLeft').children();
        const navMid = childDivs.find('div.navMid').children();
        
        expect(hamBurger.children().find('span').length).toBe(3);
        expect(navMid.matchesElement(<label htmlFor="logo"><img id="logo" className="logo" src="logo.png" alt="logo" /></label>)).toBe(true);
    });

    it('when click on hamburger setLeftPaneOpen function should be run',()=>{
        const MockSetLeftPaneOpen = jest.spyOn(util, 'setLeftPaneOpen')
        const wrapper = mount(<GlobalProvider><NavBar/></GlobalProvider>);
        const hamBurger = wrapper.find('div.hamburger');

        expect(MockSetLeftPaneOpen).toBeCalledTimes(0);
        hamBurger.simulate('click');
        expect(MockSetLeftPaneOpen).toBeCalledTimes(1);
    })

})