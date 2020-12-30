import Icon from '@/components/atoms/Icon/Icon.vue';
import { mount } from '@vue/test-utils';

describe('Icon test', () => {
  const wrapper = mount(Icon);

  test('Icon has right classes', async () => {
    wrapper.setProps({ name: 'chevron-right' });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain('<i class="fas fa-chevron-right"></i>');
  });

  test('Icon has branded icon', async () => {
    wrapper.setProps({ name: 'instagram', fab: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.attributes().class).toContain('fab');
  });

  test('Icon has different size', async () => {
    wrapper.setProps({ name: 'instagram', fab: true, size: '2' });
    await wrapper.vm.$nextTick();
    expect(wrapper.attributes().class).toContain('fa-2x');
  });

  test('Icon emit click event', async () => {
    const helloWorld = () => 'hello world';

    wrapper.setProps({ name: 'chevron-right' });
    wrapper.vm.$emit('click', helloWorld);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().click).toBeTruthy();
    expect(wrapper.emitted().click[0][0]).toBe(helloWorld);
  });
});
