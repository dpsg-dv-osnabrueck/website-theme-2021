import Button from '@/components/atoms/Button/Button.vue';
import Icon from '@/components/atoms/Icon/Icon.vue';
import { mount } from '@vue/test-utils';
import Vue from 'vue';

describe('Button test', () => {
  let wrapper;
  beforeEach(() => {
    Vue.component('Icon', Icon);
    wrapper = mount(Button, {
      slots: {
        default: 'Button Label',
      },
    });
  });

  test('Button has label', () => {
    expect(wrapper.html()).toContain('<span>Button Label</span>');
    expect(wrapper.find('button').element.disabled).toBe(false);
  });

  test('Button has icon left', async () => {
    wrapper.setProps({ iconName: 'chevron-right' });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain('<span class="icon"><i class="fas fa-chevron-right"></i></span> <span>Button Label</span>');
  });

  test('Button has branded icon', async () => {
    wrapper.setProps({ iconName: 'instagram', fab: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain('<span class="icon"><i class="fab fa-instagram"></i></span> <span>Button Label</span>');
  });

  test('Button has icon right', async () => {
    wrapper.setProps({ iconName: 'chevron-right', iconRight: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain('<span>Button Label</span> <span class="icon"><i class="fas fa-chevron-right"></i></span>');
  });

  test('Button test props with classes', () => {
    const { classNames } = wrapper.vm.$data;
    Object.keys(classNames).forEach(async (key) => {
      wrapper.setProps({ [key]: true });
      await wrapper.vm.$nextTick();
      expect(wrapper.classes()).toContain(classNames[key]);
    });
  });

  test('Button is disabled', async () => {
    wrapper.setProps({ disabled: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('button').element.disabled).toBe(true);
  });

  test('Button emits click event', async () => {
    const helloWorld = () => 'hello world';

    wrapper.vm.$emit('click', helloWorld);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().click).toBeTruthy();
    expect(wrapper.emitted().click[0][0]).toBe(helloWorld);
  });
});
