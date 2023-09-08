import { Person } from '../../types/Person';

export const useGetDisplayPeople = (
  people: Person[],
  sortField: string,
  isReversed: boolean,
  filters: Record<string, string>,
) => {
  const resultArray = [...people].filter((v: any) => {
    return Object.entries(filters).every(([key, value]) => v[key]?.toLowerCase().includes(value));
  });

  if (!sortField) {
    return resultArray;
  }

  resultArray.sort((a, b) => {
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
};
