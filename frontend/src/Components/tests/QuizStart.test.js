import React from 'react'
import {shallow} from 'enzyme'
import QuizStart from '../QuizStart';

describe('Quiz Start Component Tests', () => {
    let wrapper

    const props = {
        noOfQuestions: 10
    }

    beforeEach(() => {
        wrapper = shallow(<QuizStart {...props} />);
    })

    it('should have proper heading', () => {
        const heading = wrapper.find({testId: "instructionHeading"}).text();
        expect(heading).toBe('Instructions')
    })
})