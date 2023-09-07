import { useEffect, useState } from 'react';
import { Person } from './types/Person';
import { Loader } from './components/Loader';
import { PeopleTable } from './components/PeopleTable/PeopleTable';

export const HookApp = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTableVisible, setIsTableVisible] = useState(true);

  useEffect(() => {
    fetch('http://localhost:3000/api/people.json')
      .then((response) => response.json())
      .then((peopleFromServer) => {
        setPeople(peopleFromServer);
        setLoading(false);
      });
  }, []);

  return (
    <div className="box">
      <h1 className="title">People table</h1>
      <button onClick={() => setIsTableVisible(!isTableVisible)}>X</button>
      {loading && <Loader />}
      {!loading && isTableVisible && <PeopleTable peopleFromServer={people} />}
    </div>
  );
};
