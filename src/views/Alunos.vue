<template>
    <div class="dashboard">
        <v-subheader class="py-0 d-flex justify-space-between rounded-lg">
            <h3>Alunos</h3>
            <div class="text-center">
                <v-dialog
                v-model="modal"
                width="500"
                >
                    <AdicionarAluno @onToggleModal="toggleModal" @onAddAluno="buscarAlunos"/>
                </v-dialog>
            </div>

            <v-btn  @click="toggleModal()" color="success">
                Novo
            </v-btn>
        </v-subheader>
        <br>
        <TabelaAluno :listaAlunos="listaAlunos" @onEditAluno="buscarAlunos"/>
    </div>
</template>

<script>
    import { db } from "../store/db"
    import AdicionarAluno from "../components/AdicionarAluno"
    import TabelaAluno from "../components/TabelaAluno"
    export default {
        nome: "Alunos",
        components: {
            AdicionarAluno,
            TabelaAluno,
        },
        data() {
            return {
                status: '',
                nomeAluno: '',
                emailAluno: '',
                idAluno: '',
                materiasSelecionadas: '',
                provasSelecionadas: '',
                materias: [],   
                modal: false,
                listaAlunos: [],
            }
                
        },      
        methods: {
            async buscarAlunos(){
                const alunos = await db.alunos.toArray(); 
                this.listaAlunos = alunos
                console.log(this.listaAlunos)
            },
            toggleModal() {
                this.modal = !this.modal;
                
            }
            },
        mounted(){
              
            this.buscarAlunos()   
        },
        


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