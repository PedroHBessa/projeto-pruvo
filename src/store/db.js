// db.js
import Dexie from 'dexie';

export const db = new Dexie('myDatabase');
db.version(1).stores({
  alunos: '++id, nome, email, materias, provas',
  materias: '++id, nome',
  provas: '++id, nome',
});








