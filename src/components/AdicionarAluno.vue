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
//MODAL PARA ADICIONAR ALUNOS
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
                v => !!v || 'Insira o nome do aluno',
            ],
            email: '',
            emailRules: [
                v => !!v || 'Insira o e-mail do aluno',
                v => /.+@.+\..+/.test(v) || 'Insira um e-mail válido',
            ],
            materias: [],
            provas: [],   
        }
    },
    methods: {
        //recupera a lista de alunos cadastrados
        buscarAlunos(){
            this.$emit('onAddAluno')  
        },
        //abre e fecha o modal
        toggleModal(){
        this.$emit('onToggleModal')
        },
        //cadastra o aluno no banco de dados
        async addAluno() { 
             if(!this.nomeAluno || !this.emailAluno ){
                    alert("Os campos nome e email são obrigatórios")
                } else {
            try{   
                // eslint-disable-next-line no-unused-vars
                const id = await db.alunos.add({
                    nome: this.nomeAluno,
                    email: this.emailAluno,
                    materias: this.materiasSelecionadas,
                    provas: this.provasSelecionadas
                });
                //fecha o modal quando o formulário é submetido
                this.toggleModal()
                //recupera a lista atualizada de alunos após a cada novo cadastro
                this.buscarAlunos()
                //limpa o formulário após o cadastro
                this.nomeAluno = '';
                this.emailAluno = '';
                this.materiasSelecionadas = [];
                this.provasSelecionadas = []  
            } catch (error) {
                console.log(error)
            }
        }
        },
        //recupera a lista de matérias cadastradas para popular o input
        async buscarMaterias(){
        const materias = await db.materias.toArray();
        //cria um array com a resposta do banco de dados somente com os campos necessários
        const arrMaterias = []
        materias.forEach(element => {
            arrMaterias.push(element.nome)
        });
        this.materias = arrMaterias
        },
        //recupera a lista de provas cadastradas para popular o input
        async buscarProvas(){
        const provas = await db.provas.toArray();
        //cria um array com a resposta do banco de dados somente com os campos necessários
        const arrProvas = []
        provas.forEach(element => {
            arrProvas.push(element.nome)
        });
        this.provas = arrProvas
        },   
    },
    mounted(){
        //chama os métodos necessários na inicialização do componente
        this.buscarMaterias();
        this.buscarProvas(); 
    }
}
</script>
