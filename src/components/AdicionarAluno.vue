<template>

  
                    <v-card>
                        <v-card-title class="text-h5 grey lighten-2">
                            Novo Aluno
                        </v-card-title>
    
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                            class="pa-10"
                        >
                            <v-text-field
                            v-model="nomeAluno"
                            :rules="nameRules"
                            label="Nome"
                            required
                            ></v-text-field>

                            <v-text-field
                            v-model="emailAluno"
                            :rules="emailRules"
                            label="E-mail"
                            required
                            ></v-text-field>
                            <v-select
                            v-model="materiasSelecionadas"
                            :items="materias"
                            label="Matérias"
                            multiple
                            chips
                            hint="Escolha as matérias que serão adicionadas ao aluno"
                            persistent-hint
                            ></v-select>
                            <v-select
                            v-model="provasSelecionadas"
                            :items="provas"
                            label="Provas"
                            multiple
                            chips
                            hint="Escolha as provas que serão adicionadas ao aluno"
                            persistent-hint
                            ></v-select>
                            <div class="d-flex justify-end">
                                <v-btn
                                :disabled="!valid"
                                color="success"
                                class="mt-5"
                                
                                @click="addAluno()"
                                >
                                Salvar
                                </v-btn>
                            </div>


                           
                        </v-form>
                           </v-card>
       
    
</template>
<script>
    //Renderiza o formulário do aluno e faz a validação dos campos

    import { db } from "../store/db"
    export default {
        name: "AdicionarAluno",
        data(){
            return{
                nomeAluno: '',
                emailAluno: '',
                materiasSelecionadas: '',
                provasSelecionadas: '',

                valid: true,
                name: '',
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 10) || 'Name must be less than 10 characters',
                ],
                email: '',
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                ],
                select: null,
                items: [
                    'Item 1',
                    'Item 2',
                    'Item 3',
                    'Item 4',
                ],
                checkbox: false,
                materias: [],
                provas: [],
                
                      
        
                
            }
       
        },
        methods: {
            buscarAlunos(){
                this.$emit('onAddAluno')  
            },
             toggleModal(){
                this.$emit('onToggleModal')
            },
            async addAluno() {
              
                try{
                   
                    const id = await db.alunos.add({
                        nome: this.nomeAluno,
                        email: this.emailAluno,
                        materias: this.materiasSelecionadas,
                        provas: this.provasSelecionadas
                        
                    });
                    
                   this.toggleModal()

                   this.buscarAlunos()
                  
                    
                    
                    
                    
                    this.status = id;
                    
                    //Reset form:
                   this.nomeAluno = '';
                   this.emailAluno = '';
                   this.materiasSelecionadas = [];
                   this.provasSelecionadas = []
                    
                    
                } catch (error) {
               console.log(error)
            }
            },
             async buscarMaterias(){
                const materias = await db.materias.toArray();
                const arrMaterias = []
               materias.forEach(element => {
                    arrMaterias.push(element.nome)
                    console.log(element.nome)
                });
                this.materias = arrMaterias

            },
             async buscarProvas(){
                const provas = await db.provas.toArray();
                const arrProvas = []
               provas.forEach(element => {
                    arrProvas.push(element.nome)
                    console.log(arrProvas)
                });
                this.provas = arrProvas

            },
           
            
          
        },
        mounted (){
            this.buscarMaterias();
            this.buscarProvas();
           
        }
        
    }
</script>
