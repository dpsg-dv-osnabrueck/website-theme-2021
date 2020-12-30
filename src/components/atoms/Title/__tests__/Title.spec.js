import Title from '@/components/atoms/Title/Title.vue';
import { mount } from '@vue/test-utils';

describe('Title test', () => {
  const wrapper = mount(Title, {
    slots: {
      default: 'Title',
    },
  });

  test('Title default', () => {
    expect(wrapper.html()).toContain('<h1 class="title is-1">Title</h1>');
  });

  test('Subtitle default', async () => {
    wrapper.setProps({ subtitle: true });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain('<h1 class="subtitle is-1">Title</h1>');
  });

  test('Title with different size', async () => {
    wrapper.setProps({ subtitle: false, size: '2' });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain('<h2 class="title is-2">Title</h2>');
  });
});
