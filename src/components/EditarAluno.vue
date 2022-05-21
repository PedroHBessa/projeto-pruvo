<template>

  
                    <v-card>
                        <v-card-title class="text-h5 grey lighten-2">
                            Editar Aluno
                        </v-card-title>
    
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                            class="pa-10"
                        >
                            <v-text-field
                            v-model="aluno.nome"
                            :rules="nameRules"
                            label="Nome"
                            required
                            ></v-text-field>

                            <v-text-field
                            v-model="aluno.email"
                            :rules="emailRules"
                            label="E-mail"
                            required
                            ></v-text-field>
                            <v-select
                            v-model="aluno.materias"
                            :items="materias"
                            label="Matérias"
                            multiple
                            chips
                            hint="Escolha as matérias que serão adicionadas ao aluno"
                            persistent-hint
                            ></v-select>
                            <v-select
                            v-model="aluno.provas"
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
                                
                                @click="editarAluno(idAluno)"
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
        props: {
            idAluno: Number
        },
        data(){
            return{
                aluno: '',
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
                this.$emit('onEditAluno')  
            },
             toggleModal(){
                this.$emit('onToggleModal')
           
            },
             async buscarMaterias(){
                const materias = await db.materias.toArray();
                const arrMaterias = []
               materias.forEach(element => {
                    arrMaterias.push(element.nome)
                    console.log(element.materia)
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
            async buscarAluno(id){
                const aluno = await db.alunos.get(id)
                this.aluno = aluno;
                console.log(this.aluno)
            },
            async editarAluno(id){
                await db.alunos.update(id, {
                    nome: this.aluno.nome,
                    email: this.aluno.email,
                    materias: this.aluno.materias,
                    provas: this.aluno.provas,
                })
                
                this.toggleModal()
                this.buscarAlunos()
            }
           
            
          
        },
        mounted (){
            this.buscarMaterias();
            this.buscarProvas();
            this.buscarAluno(this.idAluno);
            
           
        },
        watch:{
            idAluno(){
                console.log(this.idAluno)
                this.buscarAluno(this.idAluno);
            }
        }
        
    }
</script>