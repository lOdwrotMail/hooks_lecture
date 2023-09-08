import React from 'react';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import { useEffect, useState } from 'react';
import { Person } from './types/Person';
import { Loader } from './components/Loader';
import { PeopleTable } from './components/PeopleTable/PeopleTable';

export const HookApp = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(true);

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
      {loading && <Loader />}
      {!loading && <PeopleTable peopleFromServer={people} />}
    </div>
  );
};
