import { useState } from 'react'
import './App.css'
import { FaRegTrashAlt } from "react-icons/fa";


function App() {
  const [habitos, setHabitos] = useState([]);
  const [input, setInput] = useState('');
  const [points, setPoints] = useState(0);

  const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'];

  const addHabit = (e) => {
    e.preventDefault()

    if (!input) {
      return false
    }

    const newHabit = {
      id: Date.now(),
      nome: input,
      dias: Array(7).fill(false) /* cria um array com 7 posições, todas tem o valor de falso */
    }
    /* habito anterior + habito atual */
    setHabitos([...habitos, newHabit]);
    setInput('');

  }

  /* marca/desmarca os dias clicados */
  const toggleHabitDay = (habitId, dayIndex) => {
    /* passa o estado de habitos para o jsx após as validações da função */
    setHabitos(prevHabitos => /* valor atual do estado habitos antes da mudança, e o map cria uma nova versão dele, retorna a mesma quantidade no array, porém diferentes */
      prevHabitos.map(habito => {

        /*se NÃO for o hábito clicado, devolve ele igual*/
        if (habito.id !== habitId) {
          return habito;
        }

        /*se for o hábito certo, cria um novo array de dias com a mudança de false -> true*/
        const novosDias = habito.dias.map((dia, index) => {
          if (index === dayIndex) {
            if (!dia) {
              setPoints(prevPoints => prevPoints + 10)
            } else {
              setPoints(prevPoints => prevPoints - 10)
            }

            return !dia;
          }
          return dia;
        })

        /*retorna o hábito atualizado*/
        return {
          ...habito,
          dias: novosDias
        }
      })
    )

    
    
  }
  /* retorna todos os habitos diferente do clicado */
  const deleteHabit = (id) => {
    const habitoExcluido = habitos.filter((habito) => habito.id !== id)
    setHabitos(habitoExcluido);
  };



  return (
    <div className='app'>
      <div className="container">
        <h1>Habit Tracker</h1>
        <p className="subtitle">Construa habitos, um de cada vez!</p>

        <form className='habit-form' onSubmit={addHabit}>
          <input type="text" placeholder='Ex: Treinar, beber água...' value={input} onChange={(e) => setInput(e.target.value)} />
          <button type="submit">Adicionar</button>
        </form>

        <ul className='habit-list'>
          {habitos.map((habito) => (
            <li className='habit-item' key={habito.id}>
              <span>{habito.nome}</span>
              <div className="week">
                {diasSemana.map((dia, index) => (
                  <button key={index} className={habito.dias[index] ? 'day active' : 'day'} onClick={() => toggleHabitDay(habito.id, index)}>{dia}</button>
                ))}
                <button className='delete-item' onClick={() => deleteHabit(habito.id)} ><FaRegTrashAlt /></button>
                <button className='points'>{points}</button>
              </div>
            </li>
          ))
          }
        </ul>
      </div>
    </div>
  )
}

export default App
