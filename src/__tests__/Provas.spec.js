import { shallowMount } from '@vue/test-utils'
import Provas from "../views/Provas"

const wrapper = shallowMount(Provas)

describe('Provas', () => {
  test('renderizar componente', () => {
    
   
    expect(wrapper.exists()).toBeTruthy()
  })
})