import { shallowMount } from '@vue/test-utils'
import AdicionarAluno from "../components/AdicionarAluno"

const wrapper = shallowMount(AdicionarAluno)

describe('AdicionarAluno', () => {
  test('renderizar componente', () => {
    
   
    expect(wrapper.exists()).toBeTruthy()
  })
  test('Renderiza o título', ()=>{
    expect(wrapper.text()).toContain("Novo Aluno")
  })
 
})