import {db} from "../store/db"


export const buscarAlunos = () => {
   return new Promise((resolve) => {
       resolve(db.alunos.toArray())
  })
}