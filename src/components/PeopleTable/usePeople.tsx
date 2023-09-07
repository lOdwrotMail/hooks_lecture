import { useState } from 'react';
import { Person } from '../../types/Person';

export const usePeople = (initialPeople: Person[]) => {
  const [people, setPeople] = useState<Person[]>(initialPeople);

  const moveDown = (person: Person) => {
    if (person === people.at(-1)) {
      return;
    }

    const personIndex = people.indexOf(person);
    const peopleCopy = [...people];

    [peopleCopy[personIndex], peopleCopy[personIndex + 1]] = [
      peopleCopy[personIndex + 1],
      peopleCopy[personIndex],
    ];
    setPeople(peopleCopy);
  };

  const moveUp = (person: Person) => {
    if (people.at(0) === person) {
      return;
    }

    const personIndex = people.indexOf(person);
    const peopleCopy = [...people];

    [peopleCopy[personIndex], peopleCopy[personIndex - 1]] = [
      peopleCopy[personIndex - 1],
      peopleCopy[personIndex],
    ];

    setPeople(peopleCopy);
  };

  return { moveDown, moveUp, people };
};
