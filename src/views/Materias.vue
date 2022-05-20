<template>
    <div class="dashboard">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
            <h3>Matérias</h3>
            <div class="text-center">
                <v-dialog
                v-model="modal"
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
            <v-btn @click="abrirModal()" color="success">
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
                        <template v-slot:item.detalhes="">
                            <v-btn color="success" outlined small shaped >Ver</v-btn>
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
                name: "Matérias",
                modal: false,
                listaMaterias: [],
                nomeMateria: '',
                headers: [
                    {
                      
                        align: 'start',
                        sortable: true,
                   
                    },
                    {text: 'nome', value: 'nome'},
                    {text: 'Detalhes', value: 'detalhes'},
                ],
                materias: [],
                valid: true,
                nameRules: [
                    v => !!v || 'Name is required',
                ],
                email: '',
                assuntoRules: [
                    v => !!v || 'Assunto is required',
                ],
            }
                        
            },
        
        methods: {
            abrirModal() {
                this.modal = true;
            },
            async addMateria(){
                try{
                    const id = await db.materias.add({
                    nome: this.nomeMateria,
                })
                
                
                this.buscarMaterias()
                this.modal = false
                
                this.status = id;
                } catch(error) {
                    console.log(error)
                }
              
            },
            async buscarMaterias(){
                const materias = await db.materias.toArray();
                this.listaMaterias = materias
                console.log(materias)
            }
        },
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