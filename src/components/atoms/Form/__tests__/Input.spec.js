import Input from '@/components/atoms/Form/Input.vue';

import { mount } from '@vue/test-utils';

describe('Input tests', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Input);
  });

  const baseProps = {
    label: 'Input label',
    placeholder: 'Placeholder',
    required: true,
  };

  test('Basic input', async () => {
    wrapper.setProps(baseProps);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('input')).toBeDefined();
    expect(wrapper.find('input').classes()).toContain('input');
    expect(wrapper.find('input').attributes().id).toBeDefined();
    expect(wrapper.find('input').attributes().type).toBe('text');
    expect(wrapper.find('input').attributes().required).toBe('required');
    expect(wrapper.find('input').attributes().placeholder).toBe('Placeholder *');
    expect(wrapper.find('label').html()).toContain('Input label *');
  });

  test('Input with icon left', async () => {
    wrapper.setProps({ ...baseProps, iconLeft: 'chevron-right' });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('i').classes()).toContain('fa-chevron-right');
    expect(wrapper.find('span').classes()).toContain('is-left');
  });

  test('Input with icon right', async () => {
    wrapper.setProps({ ...baseProps, iconRight: 'chevron-right' });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('i').classes()).toContain('fa-chevron-right');
    expect(wrapper.find('span').classes()).toContain('is-right');
  });

  test('Success status', async () => {
    wrapper.setProps({ ...baseProps, isSuccess: true, successMessage: 'Success Message' });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('p.help').classes()).toContain('is-success');
    expect(wrapper.find('p.help').html()).toContain('Success Message');
    expect(wrapper.find('input').classes()).toContain('is-success');
  });

  test('Error status', async () => {
    wrapper.setProps({ ...baseProps, isError: true, errorMessage: 'Error Message' });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('p.help').classes()).toContain('is-danger');
    expect(wrapper.find('p.help').html()).toContain('Error Message');
    expect(wrapper.find('input').classes()).toContain('is-danger');
  });

  test('Props with classes', () => {
    const { classNames } = wrapper.vm.$data;
    Object.keys(classNames).forEach(async (key) => {
      wrapper.setProps({ ...baseProps, [key]: true });
      await wrapper.vm.$nextTick();
      expect(wrapper.find('input').classes()).toContain(classNames[key]);
    });
  });
});
