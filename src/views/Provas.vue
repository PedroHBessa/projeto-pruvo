<template>
    <div class="dashboard">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
            <h3>Provas</h3>
             <div class="text-center">
                <v-dialog
                v-model="modal"
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
                            v-model="name"
                            :rules="nameRules"
                            label="Nome da Prova"
                            required
                            ></v-text-field>

                            <v-text-field
                            v-model="email"
                            :rules="assuntoRules"
                            label="Número de questões"
                            required
                            type="number"
                            max-length="10"
                            ></v-text-field>
                            <div class="d-flex justify-end">
                                <v-btn
                                :disabled="!valid"
                                color="success"
                                class="mt-5"
                                @click="validate"
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
                            :items="desserts"
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
    export default {
        name: "Dashboard",
        data() {
            return {
               
                headers: [
                    {
                        text: 'Nome do Aluno',
                        align: 'start',
                        sortable: true,
                        value: 'name',
                    },
                    {text: 'Matérias', value: 'materias'},
                    {text: 'Provas', value: 'provas'},
                    {text: 'Detalhes', value: 'detalhes'},
                ],
                desserts: [
                    {
                        name: 'Pedro',
                        materias: 12,
                        provas: 8,
                    },
                    {
                        name: 'Bruna',
                        materias: 6,
                        provas: 27,
                    },
                    {
                        name: 'Marcelo',
                        materias: 24,
                        provas: 32,
                    },
                     {
                        name: 'Josane',
                        materias: 9,
                        provas: 2,
                    },
                ],
                modal: false,
                
                valid: true,
                name: '',
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
                this.modal = !this.modal
            }
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