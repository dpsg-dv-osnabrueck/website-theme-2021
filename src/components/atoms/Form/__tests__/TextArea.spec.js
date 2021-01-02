import TextArea from '@/components/atoms/Form/TextArea.vue';

import { mount } from '@vue/test-utils';

describe('TextArea tests', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(TextArea);
  });

  const baseProps = {
    label: 'TextArea label',
    placeholder: 'Placeholder',
    required: true,
  };

  test('Basic textarea', async () => {
    wrapper.setProps(baseProps);
    await wrapper.vm.$nextTick();
    expect(wrapper.find('textarea')).toBeDefined();
    expect(wrapper.find('textarea').classes()).toContain('textarea');
    expect(wrapper.find('textarea').attributes().id).toBeDefined();
    expect(wrapper.find('textarea').attributes().required).toBe('required');
    expect(wrapper.find('textarea').attributes().placeholder).toBe('Placeholder *');
    expect(wrapper.find('label').html()).toContain('TextArea label *');
  });

  test('Success status', async () => {
    wrapper.setProps({ ...baseProps, isSuccess: true, successMessage: 'Success Message' });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('p.help').classes()).toContain('is-success');
    expect(wrapper.find('p.help').html()).toContain('Success Message');
    expect(wrapper.find('textarea').classes()).toContain('is-success');
  });

  test('Error status', async () => {
    wrapper.setProps({ ...baseProps, isError: true, errorMessage: 'Error Message' });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('p.help').classes()).toContain('is-danger');
    expect(wrapper.find('p.help').html()).toContain('Error Message');
    expect(wrapper.find('textarea').classes()).toContain('is-danger');
  });

  test('Props with classes', () => {
    const { classNames } = wrapper.vm.$data;
    Object.keys(classNames).forEach(async (key) => {
      wrapper.setProps({ ...baseProps, [key]: true });
      await wrapper.vm.$nextTick();
      expect(wrapper.find('textarea').classes()).toContain(classNames[key]);
    });
  });

  test('Loading sizes', () => {
    const { loadingSizes } = wrapper.vm.$data;
    Object.keys(loadingSizes).forEach(async (key) => {
      wrapper.setProps({ ...baseProps, isLoading: true, [key]: true });
      await wrapper.vm.$nextTick();
      expect(wrapper.find('p.control').classes()).toContain(loadingSizes[key]);
    });
  });
});
