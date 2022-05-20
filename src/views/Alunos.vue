<template>
    <div class="dashboard">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
            <h3>Alunos</h3>
            <div class="text-center">
                <v-dialog
                v-model="modal"
                width="500"
                >
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
                </v-dialog>
            </div>
            <v-btn  @click="abrirModal()" color="success">
                Novo
            </v-btn>
        </v-subheader>
        <br>
        <v-row>
            
            
            <v-col>
                <v-card>
                    <v-data-table
                            caption="Informação Geral"
                            :headers="headers"
                            :items="listaAlunos"
                            :items-per-page="5"
                            class="elevation-1 pa-6"
                    >
                        <template v-slot:item.detalhes="">
                            <v-btn color="success" outlined small shaped class="ma-1" >Ver</v-btn>
                        </template>
                   
                        
                    
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
    import { db } from "../store/db"
    export default {
        nome: "Alunos",
        data() {
            return {
                status: '',
                nomeAluno: '',
                emailAluno: '',
                idAluno: '',
                listaAlunos: [],
                materiasSelecionadas: '',
                provasSelecionadas: '',
                materias: [],
                provas: [
                    'prova1','prova2', 'prova3'
                ],
               
                headers: [
                    {
                       
                        align: 'start',
                        sortable: true,
                       
                    },
                    {text: 'Nome', value: 'nome'},
                    {text: 'E-mail', value: 'email'},
                    {text: 'no. Matérias', value: 'materias'},
                    {text: 'no. Provas', value: 'provas'},
                    {text: 'Detalhes', value: 'detalhes'},
                   
                ],
                
                modal: false,
                
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
                }
                        }
        ,
        methods: {
            abrirModal() {
                this.modal = true
            },
            async addAluno() {
              
                try{
                   
                    const id = await db.alunos.add({
                        nome: this.nomeAluno,
                        email: this.emailAluno,
                        materias: this.materiasSelecionadas.length,
                        provas: this.provasSelecionadas.length
                        
                    });
                    
                    this.modal = false;
                    this.buscarAlunos()
                    
                    
                    
                    this.status = id;
                    
                    // Reset form:
                    this.nomeAluno = '';
                    this.emailAluno = '';
                    
                    
                } catch (error) {
               console.log(error)
            }
            },
            async buscarAlunos(){
                const alunos = await db.alunos.toArray();
                this.listaAlunos = alunos
                
                
            },
            async buscarMaterias(){
                const materias = await db.materias.toArray();
                const arrMaterias = []
               materias.forEach(element => {
                    arrMaterias.push(element.nome)
                });
                this.materias = arrMaterias
               

                
            }
         
        },
        mounted(){
            this.buscarAlunos();
            this.buscarMaterias();
        }
        


    }
</script>

<style scoped>
    .overlap-icon {
        position: absolute;
        top: -33px;
        text-align: center;
        padding-top: 12px;
    }
</style>