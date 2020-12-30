import GridContainer from '@/components/atoms/Grid/GridContainer.vue';
import { mount } from '@vue/test-utils';

describe('Grid container test', () => {
  const wrapper = mount(GridContainer);

  test('Default', () => {
    expect(wrapper.html()).toContain('<div class="container"></div>');
  });

  test('Props with classes', () => {
    const { classNames } = wrapper.vm.$data;
    Object.keys(classNames).forEach(async (key) => {
      wrapper.setProps({ [key]: true });
      await wrapper.vm.$nextTick();
      expect(wrapper.attributes().class).toContain(classNames[key]);
      expect(true).toBe(true);
    });
  });
});
