import { shallowMount } from '@vue/test-utils'
import Sidebar from "../components/Sidebar"

const wrapper = shallowMount(Sidebar)

describe('Sidebar', () => {
  test('renderizar componente', () => {
    
   
    expect(wrapper.exists()).toBeTruthy()
  })
 
})