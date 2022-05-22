<template>
    <div class="dashboard">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
            <h3>Matérias</h3>
            <!-- adicionar matéria -->
            <div class="text-center">
                <v-dialog
                v-model="modalAdicionar"
                width="500"
                >
                    <v-card>
                        <v-card-title class="text-h5 grey lighten-2">
                            Nova Matéria
                        </v-card-title>
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                            class="pa-10"
                        >
                            <v-text-field
                            v-model="nomeMateria"
                            :rules="nameRules"
                            label="Nome da matéria"
                            required
                            ></v-text-field>
                            <div class="d-flex justify-end">
                                <v-btn
                                :disabled="!valid"
                                color="success"
                                class="mt-5"
                                @click="addMateria()"
                                >
                                Salvar
                                </v-btn>
                            </div>
                        </v-form> 
                    </v-card>
                </v-dialog>
            </div>
            <!-- editar materia -->
            <div class="text-center">
                <v-dialog
                v-model="modalEditar"
                width="500"
                >
                    <v-card>
                        <v-card-title class="text-h5 grey lighten-2">
                            Editar Matéria
                        </v-card-title>
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                            class="pa-10"
                        >
                            <v-text-field
                            v-model="nomeMateria"
                            :rules="nameRules"
                            label="Nome da matéria"
                            required
                            ></v-text-field>
                            <div class="d-flex justify-end">
                                <v-btn
                                :disabled="!valid"
                                color="success"
                                class="mt-5"
                                @click="editarMateria(id)"
                                >
                                Salvar
                                </v-btn>
                            </div>
                        </v-form>  
                    </v-card>
                </v-dialog>
            </div>
            <v-btn @click="toggleModalAdicionar()" color="success">
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
                            :items="listaMaterias"
                            :items-per-page="5"
                            class="elevation-1 pa-6"
                    >
                        <template v-slot:item.acao="el">
                            <v-icon @click="toggleModalEditar(el.item.id)" class="mr-3" >{{"mdi-account-edit"}}</v-icon>
                            <v-icon @click="excluirMateria(el.item.id)" color="error" class="mx-3" >{{"mdi-delete"}}</v-icon>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
//TABELA DE MATÉRIAS
import { db } from '../store/db'
    export default {
        data() {
            return {
                name: "Matérias",
                modalAdicionar: false,
                modalEditar: false,
                listaMaterias: [],
                nomeMateria: '',
                materia: '',
                id: '',
                headers: [
                    {
                        align: 'start',
                        sortable: true,
                    },
                    {text: 'Id', value: 'id'},
                    {text: 'Matéria', value: 'nome'},
                    {text: 'Editar/Excluir', value: 'acao'},
                ],
                materias: [],
                valid: true,
                nameRules: [
                    v => !!v || 'Insira o nome da matéria',
                ],  
            }           
        },
        methods: {
            //abre o modal de adicionar matéria
            toggleModalAdicionar() {
                this.nomeMateria = ""
                this.modalAdicionar = !this.modalAdicionar;
            },
            //abre o modal de editar matéria
            toggleModalEditar(id) {
                this.modalEditar = !this.modalEditar;
                this.id = id
                   this.buscarMateria(id)
               },
            //adiciona matéria no banco de dados
            async addMateria(){
                try{
                if(!this.nomeMateria){
                    alert("Insira o nome da matéria")
                } else {
                try{
                    const id = await db.materias.add({
                    nome: this.nomeMateria,
                    })
                    //recupera lista atualizada de materias
                    this.buscarMaterias()
                    //limpa os campos
                    this.nomeMateria = ""
                    //fecha o modal
                    this.toggleModalAdicionar()
                    this.status = id;
                    } catch(error) {
                        console.log(error)
                    }
                }
                }catch (error){
                    console.log(error)
                }
            },
            //recupera a lista de matérias cadastradas
            async buscarMaterias(){
                try{
                const materias = await db.materias.toArray();
                this.listaMaterias = materias
                }catch(error){
                    console.log(error)
                }
            },
            //recupera a matéria para popular o input 
            async buscarMateria(id){
                try{
                const materia = await db.materias.get(id)
                this.nomeMateria = materia.nome; 
                }catch(error){
                    console.log(error)
                }
            },
            //faz update da matéria no banco de dados
            async editarMateria(id){
                try{
                 if(!this.nomeMateria){
                    alert("Insira o nome da matéria")
                } else {
                 await db.materias.update(id, {
                    nome: this.nomeMateria, 
                })
                //recupera lista atualizada das matérias
                this.buscarMaterias()
                //fecha o modal
                this.toggleModalEditar(null) 
                }}catch(error){
                    console.log(error)
                }
            },
            //deleta a matéria no banco de dados
            async excluirMateria(id){
                try{
                await db.materias.delete(id)
                //recupera a lista de matérias atualizada
                this.buscarMaterias()
            }catch(error){
                console.log
            }}
        },
        //chama os métodos necessários na inicialização do componente
        mounted: function(){
            this.buscarMaterias()
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