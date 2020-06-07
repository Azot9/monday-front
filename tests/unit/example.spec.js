import { shallowMount } from '@vue/test-utils'
import StandChart from '@/components/StandChart.vue'

describe('StandChart.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(StandChart, {
      propsData: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
