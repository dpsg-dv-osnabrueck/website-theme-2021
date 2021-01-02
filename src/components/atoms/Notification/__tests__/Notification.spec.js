import Notification from '@/components/atoms/Notification/Notification.vue';
import { mount } from '@vue/test-utils';

describe('Notification tests', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(Notification, {
      slots: {
        default: 'Notification content',
      },
    });
  });

  test('Default', async () => {
    await wrapper.vm.$nextTick();
    expect(wrapper.find('div').html()).toContain('<div class="notification"><button class="delete"></button> Notification content</div>');
  });

  test('Props with classes', () => {
    const { classNames } = wrapper.vm.$data;
    Object.keys(classNames).forEach(async (key) => {
      wrapper.setProps({ [key]: true });
      await wrapper.vm.$nextTick();
      expect(wrapper.find('div').classes()).toContain(classNames[key]);
    });
  });
});
