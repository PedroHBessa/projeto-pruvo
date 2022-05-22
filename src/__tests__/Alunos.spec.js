import { shallowMount } from '@vue/test-utils'
import Alunos from "../views/Alunos"

const wrapper = shallowMount(Alunos)

describe('Alunos', () => {
  test('renderizar componente', () => {
    
   
    expect(wrapper.exists()).toBeTruthy()
  })
})