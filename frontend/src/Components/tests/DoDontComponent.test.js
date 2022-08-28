import React from 'react';
import {shallow} from 'enzyme';
import DoDontComponent from '../DoDontComponent';
import * as jest from 'jest'

describe('Do Dont Component Tests', () => {
    let wrapper;

    beforeEach( () => {
        wrapper = shallow(<DoDontComponent />);
    })
    it('should have proper heading', () => {
        const heading = wrapper.find({testId: "ruleHeading"}).text();
        expect(heading).toBe("Do's and Dont's");
    })

})