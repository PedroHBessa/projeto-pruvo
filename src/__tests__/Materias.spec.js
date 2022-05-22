import { shallowMount } from '@vue/test-utils'
import Materias from "../views/Materias"

const wrapper = shallowMount(Materias)

describe('Materias', () => {
  test('renderizar componente', () => {
    
   
    expect(wrapper.exists()).toBeTruthy()
  })
})