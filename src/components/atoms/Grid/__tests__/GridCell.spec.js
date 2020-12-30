import GridCell from '@/components/atoms/Grid/GridCell.vue';
import { mount } from '@vue/test-utils';

describe('Grid row test', () => {
  const wrapper = mount(GridCell);

  test('Default', () => {
    expect(wrapper.html()).toContain('<div class="column"></div>');
  });

  test('Custom width', async () => {
    const gridWidth = {
      mobile: '2',
      tablet: '3',
      desktop: '4',
      widescreen: '5',
      fullHD: '6',
    };

    const widthClasses = 'is-2-mobile is-3-tablet is-4-desktop is-5-widescreen is-6-fullhd';

    wrapper.setProps({
      width: gridWidth,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.attributes().class).toContain(widthClasses);
  });

  test('Single width', async () => {
    const gridWidth = '2';

    const widthClasses = 'is-2';

    wrapper.setProps({
      width: gridWidth,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.attributes().class).toContain(widthClasses);
  });

  test('Custom offset', async () => {
    const offsetWidth = {
      mobile: '2',
      tablet: '3',
      desktop: '4',
      widescreen: '5',
      fullHD: '6',
    };

    const offsetClasses = 'is-offset-2-mobile is-offset-3-tablet is-offset-4-desktop is-offset-5-widescreen is-offset-6-fullhd';

    wrapper.setProps({
      offset: offsetWidth,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.attributes().class).toContain(offsetClasses);
  });

  test('Single offset', async () => {
    const offsetWidth = '2';

    const offsetClasses = 'is-offset-2';

    wrapper.setProps({
      offset: offsetWidth,
    });
    await wrapper.vm.$nextTick();
    expect(wrapper.attributes().class).toContain(offsetClasses);
  });
});
