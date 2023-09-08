import { useState } from 'react';
import { Person } from '../../types/Person';

type SelectedPeopleProps = {
  people: Person[];
};

export const SelectedPeople = ({ people }: SelectedPeopleProps) => {
  const [filter, setFilter] = useState('');
  const lowerCaseFilter = filter.toLowerCase();

  return (
    <>
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value.trimStart())}
      />
      <div className="title is-5 has-text-info">
        {people
          .filter((v) => {
            return (
              v.name.toLowerCase().includes(lowerCaseFilter)
              || v.motherName?.toLowerCase()?.includes(lowerCaseFilter)
              || v.fatherName?.toLowerCase()?.includes(lowerCaseFilter)
            );
          })
          .map((person) => person.name)
          .join(', ') || '---'}
      </div>
    </>
  );
};
