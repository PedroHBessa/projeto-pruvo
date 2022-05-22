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
//MODAL PARA EDITAR ALUNOS
import { db } from "../store/db"
export default {
    name: "EditarAluno",
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
                v => !!v || 'Insira o nome do aluno',
            ],
            email: '',
            emailRules: [
                v => !!v || 'Insira o e-mail do aluno',
                v => /.+@.+\..+/.test(v) || 'Insira um e-mail válido',
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
        //recupera a lista de alunos cadastrados
        buscarAlunos(){
            this.$emit('onEditAluno')  
        },
        //abre e fecha o modal
        toggleModal(){
            this.$emit('onToggleModal')
        },
        //recupera a lista de matérias cadastradas para popular o input
        async buscarMaterias(){
            try{
        const materias = await db.materias.toArray();
        //cria um array com a resposta do banco de dados somente com os campos necessários
        const arrMaterias = []
        materias.forEach(element => {
            arrMaterias.push(element.nome)
        });
        this.materias = arrMaterias
            } catch(error) {
                console.log(error)
            }
        },
        //recupera a lista de provas cadastradas para popular o input
        async buscarProvas(){
            try{
        const provas = await db.provas.toArray();
        const arrProvas = []
        provas.forEach(element => {
            arrProvas.push(element.nome)
        });
        this.provas = arrProvas
            }catch(error){
                console.log(error)
            }
        },
        //recupera o aluno para popular o input na edição
        async buscarAluno(id){
            try{
            const aluno = await db.alunos.get(id)
            this.aluno = aluno;
            } catch (error){
                console.log(error)
            }
        },
        //edita o aluno e faz o update no banco de dados
        async editarAluno(id){
            try{
            if(!this.aluno.nome || !this.aluno.email ){
                    alert("Os campos nome e email são obrigatórios")
                } else {
            await db.alunos.update(id, {
                nome: this.aluno.nome,
                email: this.aluno.email,
                materias: this.aluno.materias,
                provas: this.aluno.provas,
            })
            this.toggleModal()
            this.buscarAlunos()
        }   
        } catch(error){
            console.log(error)
        }
        }
    },
    //chama os métodos necessários na inicialização do componente
    mounted(){
        this.buscarMaterias();
        this.buscarProvas();
        this.buscarAluno(this.idAluno);   
    },
    //recupera o aluno para mostrar no modal sempre que um novo id for recebido
    watch:{
        idAluno(){
            this.buscarAluno(this.idAluno);
        }
    } 
}
</script>