import { useMemo } from 'react';
import { Person } from '../../types/Person';

export const useGetDisplayPeople = (
  people: Person[],
  sortField: string,
  isReversed: boolean,
) => {
  return useMemo(() => {
    if (!sortField) {
      return people;
    }

    const resultArray = [...people].sort((a, b) => {
      if (sortField === 'name') {
        return a.name.localeCompare(b.name);
      }

      if (sortField === 'sex') {
        return a.sex.localeCompare(b.sex);
      }

      if (sortField === 'born') {
        return a.born > b.born ? 1 : -1;
      }

      return 0;
    });

    if (isReversed) {
      resultArray.reverse();
    }

    return resultArray;
  }, [people, sortField, isReversed]);
};
