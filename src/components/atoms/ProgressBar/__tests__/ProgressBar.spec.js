import ProgressBar from '@/components/atoms/ProgressBar/ProgressBar.vue';
import GridContainer from '@/components/atoms/Grid/GridContainer.vue';
import GridRow from '@/components/atoms/Grid/GridRow.vue';
import GridCell from '@/components/atoms/Grid/GridCell.vue';
import Vue from 'vue';

import { mount } from '@vue/test-utils';

describe('ProgressBar tests', () => {
  let wrapper;
  beforeEach(() => {
    Vue.component('GridContainer', GridContainer);
    Vue.component('GridRow', GridRow);
    Vue.component('GridCell', GridCell);
    wrapper = mount(ProgressBar);
  });

  test('Is loading', async () => {
    wrapper.setProps({ status: 2 });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).toContain('<progress max="100" class="progress is-small is-info my-6">');
  });

  test('Is not loading', async () => {
    wrapper.setProps({ status: 3 });
    await wrapper.vm.$nextTick();
    expect(wrapper.html()).not.toContain('<progress max="100" class="progress is-small is-info my-6">');
  });
});
