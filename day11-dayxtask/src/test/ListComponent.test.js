  
// @ts-ignore
import React from 'react';

// @ts-ignore
import ListComponent from '../components/testComponents/ListComponent';
// @ts-ignore
import ListOptionsComponent from '../components/testComponents/ListComponentOptions';

// get the enzyme objets
// @ts-ignore
import { shallow } from "../enzyme";

// define a test suit
// @ts-ignore
describe('The React Component Test', () => {
    // test case
    // @ts-ignore
    it('should render the options in component', () => {
         // arange
         const names = ["James", "Ethan", "Jsaon", "Indiana"];
          
         // act
         // access the component for mouting with DOM by passing 'options' propType to it
         // as the names array
         const domWrapper = shallow(<ListComponent options={names}/>);
         // show the generated dom in memory that will be tested using Enzyme and jest
         console.log(domWrapper.debug());
         // assert
         // use the DOM Traversing on the Rendered DOM in memory to check if the element exists
         // the .options is a class selector
         // @ts-ignore
         expect(domWrapper.find('.options').exists()).toBe(true);
    });

    it('should render the empty span with class as empty', () => {
        // arange
        const names = [];
        // act
        // access the component for mouting with DOM by passing 'options' propType to it
        // as the names array
        const domWrapper = shallow(<ListComponent options={names}/>);
        // show the generated dom in memory that will be tested using Enzyme and jest
        console.log(domWrapper.debug());
        // assert
        // use the DOM Traversing on the Rendered DOM in memory to check if the element exists
        // the .options is a class selector
        // @ts-ignore
        expect(domWrapper.find('.empty').exists()).toBe(true);
   });

   it('should render the empty span with class as empty', () => {
    // arange
    const names = [];
    // act
    // access the component for mouting with DOM by passing 'options' propType to it
    // as the names array
    const domWrapper = shallow(<ListComponent options={names}/>);
    // show the generated dom in memory that will be tested using Enzyme and jest
    console.log(domWrapper.debug());
    // assert
    // use the DOM Traversing on the Rendered DOM in memory to check if the element exists
    // the .options is a class selector
    // @ts-ignore
    expect(domWrapper.find('.empty').exists()).toBe(true);
});
});