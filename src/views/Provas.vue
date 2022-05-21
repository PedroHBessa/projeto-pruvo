<template>
    <div class="dashboard">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
            <h3>Provas</h3>
            <!-- adicionar prova -->
            <div class="text-center">
                <v-dialog
                v-model="modalAdicionar"
                width="500"
                >
                    <v-card>
                        <v-card-title class="text-h5 grey lighten-2">
                            Nova Prova
                        </v-card-title>
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                            class="pa-10"
                        >
                            <v-text-field
                            v-model="nomeProva"
                            :rules="nameRules"
                            label="Nome da prova"
                            required
                            ></v-text-field>
                            <div class="d-flex justify-end">
                                <v-btn
                                :disabled="!valid"
                                color="success"
                                class="mt-5"
                                @click="addProva()"
                                >
                                Salvar
                                </v-btn>
                            </div>
                        </v-form>
                    </v-card>
                </v-dialog>
            </div>
            <!-- editar prova -->
            <div class="text-center">
                <v-dialog
                v-model="modalEditar"
                width="500"
                >
                    <v-card>
                        <v-card-title class="text-h5 grey lighten-2">
                            Editar Prova
                        </v-card-title>
                        <v-form
                            ref="form"
                            v-model="valid"
                            lazy-validation
                            class="pa-10"
                        >
                            <v-text-field
                            v-model="nomeProva"
                            :rules="nameRules"
                            label="Nome da Prova"
                            required
                            ></v-text-field>
                            <div class="d-flex justify-end">
                                <v-btn
                                :disabled="!valid"
                                color="success"
                                class="mt-5"
                                @click="editarProva(id)"
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
                            :items="listaProvas"
                            :items-per-page="5"
                            class="elevation-1 pa-6"
                    >
                        <template v-slot:item.acao="el">
                            <v-icon @click="toggleModalEditar(el.item.id)" class="mr-3" >{{"mdi-account-edit"}}</v-icon>
                            <v-icon @click="excluirProva(el.item.id)" color="error" class="mx-3" >{{"mdi-delete"}}</v-icon>
                        </template>
                    </v-data-table>
                </v-card>
            </v-col>
        </v-row>
    </div>
</template>

<script>
import { db } from '../store/db'
    export default {
        data() {
            return {
                name: "Provas",
                modalAdicionar: false,
                modalEditar: false,
                listaProvas: [],
                nomeProva: '',
                prova: '',
                id: '',
                headers: [
                    {
                        align: 'start',
                        sortable: true,
                    },
                    {text: 'Id', value: 'id'},
                    {text: 'Prova', value: 'nome'},
                    {text: 'Editar/Excluir', value: 'acao'},
                ],
                Provas: [],
                valid: true,
                nameRules: [
                    v => !!v || 'Insira o nome da prova',
                ],
            }           
            },
        methods: {
            //abre e fecha o modal para adicionar prova
            toggleModalAdicionar() {
                
                this.nomeProva = ""
                this.modalAdicionar = !this.modalAdicionar;
            },
            //abre e fecha o modal para editar prova
            toggleModalEditar(id) {
                this.modalEditar = !this.modalEditar;
                this.id = id
                   this.buscarProva(id)
               },
            //adiciona prova no banco de dados
            async addProva(){
                if(!this.nomeProva){
                    alert("Insira o nome da prova")
                } else {
                    try{
                    const id = await db.provas.add({
                    nome: this.nomeProva,
                })
                //recuperar lista atualizada das provas
                this.buscarProvas()
                //limpa o campo
                this.nomeProva = ""
                //fecha o modal
                this.toggleModalAdicionar()
                this.status = id;
                } catch(error) {
                    console.log(error)
                }
                }
            },
            //recupera lista atualizada do provas
            async buscarProvas(){
                const provas = await db.provas.toArray();
                this.listaProvas = provas
                console.log(provas)
            },
            //recupera prova para popular o input
            async buscarProva(id){
                const prova = await db.provas.get(id)
                this.nomeProva = prova.nome;
            },
            //edita a prova
            async editarProva(id){
                if(!this.nomeProva){
                    alert("Insira o nome da prova")
                } else {
                 await db.provas.update(id, {
                    nome: this.nomeProva, 
                })
                //recupera lista atualizada de provas
                this.buscarProvas()
                //fecha o modal
                this.toggleModalEditar(null)
                }
                
            },
            //deleta a prova
            async excluirProva(id){
                await db.provas.delete(id)
                this.buscarProvas()
            }
        },
        //chama os métodos necessários para a inicialização do componente
        mounted: function(){
            this.buscarProvas()
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