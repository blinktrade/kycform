import React from 'react';
import { StyleSheetTestUtils } from 'aphrodite';
import { mount, shallow } from '../../utils/testUtils';
import { FieldName } from '../';
import FormBase from '../../containers/FormBase';

const renderFormBase = Component => (
  <FormBase>{Component}</FormBase>
);

describe('Fields', () => {
  beforeEach(() => {
    StyleSheetTestUtils.suppressStyleInjection();
  });

  afterEach(() => {
    StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
  });

  it('Should render <FieldName /> as firstName, middleName and lastName', () => {
    const wrapper = shallow(<FieldName />);
    expect(wrapper.childAt(0).prop('name')).toBe('firstName');
    expect(wrapper.childAt(1).prop('name')).toBe('middleName');
    expect(wrapper.childAt(2).prop('name')).toBe('lastName');
  });

  it('Should render <FieldName />, focus first name, enter a text, match isActive true, blur and match hasError as true and isActive as false', () => {
    const wrapper = mount(renderFormBase(<FieldName />));
    const firstName = wrapper.find('input[name="firstName"]');
    const change = { target: { value: 'firstname' } };
    expect(wrapper.find('FieldError').props().hasError).toBe(false);
    firstName.simulate('focus');
    firstName.simulate('change', change);
    expect(wrapper.find('FieldError').props().isActive).toBe(true);
    firstName.simulate('blur');
    expect(wrapper.find('FieldError').props().isActive).toBe(false);
    expect(wrapper.find('FieldError').props().hasError).toBe(true);
  });

  it('Should render <FieldName />, fill all inputs and match hasError as false', () => {
    const wrapper = mount(renderFormBase(<FieldName />));
    const firstName = wrapper.find('input[name="firstName"]');
    const middleName = wrapper.find('input[name="middleName"]');
    const lastName = wrapper.find('input[name="lastName"]');
    const change = { target: { value: 'firstname' } };

    expect(wrapper.find('FieldError').props().hasError).toBe(false);

    firstName.simulate('focus');
    firstName.simulate('change', change);
    firstName.simulate('blur');

    middleName.simulate('focus');
    middleName.simulate('change', change);
    middleName.simulate('blur');

    lastName.simulate('focus');
    lastName.simulate('change', change);
    lastName.simulate('blur');

    expect(wrapper.find('FieldError').props().hasError).toBe(false);
  });
});

