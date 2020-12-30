import GridRow from '@/components/atoms/Grid/GridRow.vue';
import { mount } from '@vue/test-utils';

describe('Grid row test', () => {
  const wrapper = mount(GridRow);

  test('Default', () => {
    expect(wrapper.html()).toContain('<div class="columns"></div>');
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

  test('Custom gaps', async () => {
    wrapper.setProps({ gap: { mobile: '2' } });
    await wrapper.vm.$nextTick();
    expect(wrapper.attributes().class).toContain('is-variable is-2-mobile');
    expect(wrapper.html()).toContain('<div class="columns is-variable is-2-mobile"></div>');
  });
});
