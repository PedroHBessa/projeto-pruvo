<template>
    <div class="dashboard">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
            <h3>Configurações</h3>
            <v-btn color="success">
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
            }
        },
        methods: {
            onButtonClick(item) {
                console.log('click on ' + item.no)
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