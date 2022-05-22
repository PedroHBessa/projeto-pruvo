import { shallowMount } from '@vue/test-utils'
import TabelaAluno from "../components/TabelaAluno"

const wrapper = shallowMount(TabelaAluno)

describe('TabelaAluno', () => {
  test('renderizar componente', () => {
    
   
    expect(wrapper.exists()).toBeTruthy()
  })
})