import React from 'react';
import { User } from '../types/User';
import Calendar from './Calendar';
import UserSelect from './UserSelect';
// Asumiendo que tu JSON tiene { "users": [...] }
import userData from '../data/users.json';

interface TimeEntry {
  id: number;
  // Resto de propiedades que necesites
}

interface TimeEntriesResponse {
  time_entries: TimeEntry[];
}

const TimeEntriesContainer: React.FC = () => {
  // Estado que guardará la respuesta con time entries
  const [data, setData] = React.useState<TimeEntriesResponse>({ time_entries: [] });

  // Fechas actuales visibles en el calendario (se inicializan vacías o con rango por defecto)
  const [iniDay, setIniDay] = React.useState('');
  const [finDay, setFinDay] = React.useState('');

  // Usuario seleccionado (por defecto '93' si gustas)
  const [userId, setUserId] = React.useState('93');

  // Lista de usuarios
  const [users, setUsers] = React.useState<User[]>([]);

  // Cargamos usuarios (desde JSON o desde tu API)
  React.useEffect(() => {
    setUsers(userData.users);
  }, []);

  /**
   * Efecto que se dispara cada vez que cambia:
   *  - userId (usuario)
   *  - iniDay o finDay (rango de fechas del calendario)
   *
   * Si iniDay o finDay están vacíos, no hacemos nada (evita fetch hasta
   * que el calendario "datesSet" actualice las fechas).
   */
  React.useEffect(() => {
    // Evita fetch si no tenemos aún definidas iniDay y finDay
    if (!iniDay || !finDay) return;
    console.log('Fetching time entries...');
    console.log('userId:', userId);
    console.log('iniDay:', iniDay.split('T')[0]);
    console.log('finDay:', finDay.split('T')[0]);
    const url = `http://localhost:3000/api/redmine/time-entries?user_id=${userId}&from=${iniDay.split('T')[0]}&to=${finDay.split('T')[0]}&limit=100`;

    fetch(url)
      .then((response) => response.json())
      .then((timeEntriesData) => {
        setData(timeEntriesData);
      })
      .catch((error) => {
        console.error('Error fetching time entries:', error);
      });
  }, [userId, iniDay, finDay]);

  // Callback para actualizar las fechas (lo recibe el calendario)
  const handleDatesChange = (start: string, end: string) => {
    setIniDay(start);
    setFinDay(end);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Time Entries Calendar</h2>

      {/* Selector de usuario */}
      <UserSelect
        users={users}
        selectedUserId={userId}
        onChangeUser={(newUserId) => setUserId(newUserId)}
      />

      {/* Calendario */}
      <Calendar
        timeEntries={data.time_entries}
        onDatesChange={handleDatesChange}
      />
    </div>
  );
};

export default TimeEntriesContainer;
