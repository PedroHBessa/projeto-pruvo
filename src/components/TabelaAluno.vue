<template>
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
                    <template v-slot:item.acao="el">
                        <v-icon @click="editarAluno(el.item.id)" class="mr-3" >{{"mdi-account-edit"}}</v-icon>
                        <v-icon @click="excluirAluno(el.item.id)" color="error" class="mx-3" >{{"mdi-delete"}}</v-icon>
                    </template>
                </v-data-table>
            </v-card>
        </v-col>
        <div class="text-center">
            <v-dialog
            v-model="modal"
            width="500"
            >   
                <EditarAluno :idAluno="idAluno" @onToggleModal="toggleModal" @onEditAluno="buscarAlunos"/>
            </v-dialog>
        </div>
    </v-row>
</template>

<script>
    import EditarAluno from "../components/EditarAluno"
    import { db } from "../store/db"
    export default {
    name: "TabelaAluno",
    components: {
            EditarAluno,  
    },
    props: {
        listaAlunos: Array,
    },
    data() {
        return {
            headers: [
                {
                    align: "start",
                    sortable: true,
                },
                { text: "Id", value: "id" },
                { text: "Nome", value: "nome" },
                { text: "E-mail", value: "email" },
                { text: "no. Matérias", value: "materias.length" },
                { text: "no. Provas", value: "provas.length" },
                { text: "Editar/Excluir", value: "acao" },
            ],
            modal: false,
            idAluno: "",
        };
    },
    methods: {
        //recupera a lista de alunos cadastrados
        buscarAlunos(){
            this.$emit('onEditAluno')
        },
         //abre e fecha o modal
        toggleModal() {
            this.modal = !this.modal;   
        },
        //abre o modal para edição do aluno e passa o id
        async editarAluno(id) {
            try{
            this.toggleModal()
            this.idAluno = id;
            }  catch(error){
                console.log(error)
            }
            
        },
       
        //deleta o aluno
        async excluirAluno(id){
            try{
            await db.alunos.delete(id)
            //recupera a lista atualizada de alunos
            this.buscarAlunos()
        }  catch(error){
            console.log(error)
        } 
        },
           
        
       
    } 
}
</script>
