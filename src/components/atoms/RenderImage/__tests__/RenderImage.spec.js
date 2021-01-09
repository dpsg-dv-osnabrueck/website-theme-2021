import RenderImage from '@/components/atoms/RenderImage/RenderImage.vue';
import { mount } from '@vue/test-utils';

describe('RenderImage tests', () => {
  const wrapper = mount(RenderImage);
  const logo = 'https://dpsg-os.de/wp-content/uploads/2015/10/luenne_50-190-1000x667.jpg';

  test('Default', async () => {
    wrapper.setProps({ src: logo });
    await wrapper.vm.$nextTick();
    expect(wrapper.find('img').attributes('src')).toBe(logo);
    expect(wrapper.html()).toContain('<figure class="image"><img src="https://dpsg-os.de/wp-content/uploads/2015/10/luenne_50-190-1000x667.jpg"></figure>');
  });

  test('Props with classes', () => {
    const { classNames } = wrapper.vm.$data;
    Object.keys(classNames).forEach(async (key) => {
      wrapper.setProps({ [key]: true });
      await wrapper.vm.$nextTick();
      expect(wrapper.find('figure').classes()).toContain(classNames[key]);
    });
  });
});
