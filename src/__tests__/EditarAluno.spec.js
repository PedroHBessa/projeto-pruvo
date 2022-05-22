import { shallowMount } from '@vue/test-utils'
import EditarAluno from "../components/EditarAluno"

const wrapper = shallowMount(EditarAluno)

describe('EditarAluno', () => {
  test('renderizar componente', () => {
    
   
    expect(wrapper.exists()).toBeTruthy()
  })

  test('Renderiza o título', ()=>{
    expect(wrapper.text()).toContain("Editar")
  })
})

