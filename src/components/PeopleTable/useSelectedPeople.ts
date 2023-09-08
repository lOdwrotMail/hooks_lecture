import { useState } from 'react';
import { Person } from '../../types/Person';

export const useSelectedPeople = () => {
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);

  const remove = (personToRemove: Person) => {
    setSelectedPeople(
      selectedPeople.filter((person) => person !== personToRemove),
    );
  };

  const add = (personToAdd: Person) => {
    setSelectedPeople([...selectedPeople, personToAdd]);
  };

  const clearSelection = () => {
    setSelectedPeople([]);
  };

  const isSelected = (personToCheck: Person) => {
    return selectedPeople.some((person) => person.slug === personToCheck.slug);
  };

  return {
    selectedPeople, remove, add, clearSelection, isSelected,
  };
};
