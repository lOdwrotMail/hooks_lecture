import cn from 'classnames';
import { useState } from 'react';
import { Person } from '../../types/Person';
import { useGetDisplayPeople } from './useGetDisplayPeople';
import { usePeople } from './usePeople';
import { useSelectedPeople } from './useSelectedPeople';
import { SelectedPeople } from './SelectedPeople';
import { InetractiveHeader } from './InteractiveHeader';

type PeopleTableProps = {
  peopleFromServer: Person[];
};

export const PeopleTable = ({ peopleFromServer }: PeopleTableProps) => {
  const { people, moveDown, moveUp } = usePeople(peopleFromServer);
  const {
    selectedPeople, add, clearSelection, remove, isSelected,
  }
    = useSelectedPeople();
  const [nameFilter, setNameFilter] = useState('');
  const [fatherFilter, setFatherFilter] = useState('');
  const [motherFilter, setMotherFilter] = useState('');

  const [sortField, setSortField] = useState<string>('');
  const [isReversed, setIsReversed] = useState(false);
  const displayPeople = useGetDisplayPeople(
    people,
    sortField,
    isReversed,
    {
      name: nameFilter.toLowerCase(),
      fatherName: fatherFilter.toLowerCase(),
      motherName: motherFilter.toLowerCase(),
    },
  );

  const sortBy = (field: string) => {
    setSortField(
      !sortField || (sortField && !isReversed) || sortField !== field
        ? field
        : '',
    );
    setIsReversed(!isReversed && field === sortField);
  };

  return (
    <>
      <SelectedPeople people={selectedPeople} />
      <table className="table is-striped is-narrow">
        <thead>
          <tr>
            <th>
              {!!selectedPeople.length && (
                // eslint-disable-next-line jsx-a11y/control-has-associated-label
                <button
                  className="delete"
                  type="button"
                  onClick={clearSelection}
                />
              )}
            </th>
            <InetractiveHeader
              hasFilter
              onFilterChange={setNameFilter}
              header="name"
              onClick={() => sortBy('name')}
              isSorted={sortField === 'name'}
              isReversed={isReversed}
            />
            <InetractiveHeader
              header="sex"
              onClick={() => sortBy('sex')}
              isSorted={sortField === 'sex'}
              isReversed={isReversed}
            />
            <InetractiveHeader
              header="born"
              onClick={() => sortBy('born')}
              isSorted={sortField === 'born'}
              isReversed={isReversed}
            />
            <InetractiveHeader
              hasFilter
              onFilterChange={setFatherFilter}
              header="father"
              onClick={() => sortBy('fatherName')}
              isSorted={sortField === 'fatherName'}
              isReversed={isReversed}
            />
            <InetractiveHeader
              hasFilter
              onFilterChange={setMotherFilter}
              header="mother"
              onClick={() => sortBy('motherName')}
              isSorted={sortField === 'motherName'}
              isReversed={isReversed}
            />
            <th>actions</th>
          </tr>
        </thead>

        <tbody>
          {displayPeople.map((person) => (
            <tr
              key={person.slug}
              className={cn({
                'has-background-warning': isSelected(person),
              })}
            >
              <td>
                {isSelected(person) ? (
                  <button
                    type="button"
                    className="button is-small is-rounded is-danger"
                    onClick={() => remove(person)}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-minus" />
                    </span>
                  </button>
                ) : (
                  <button
                    type="button"
                    className="button is-small is-success"
                    onClick={() => add(person)}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-plus" />
                    </span>
                  </button>
                )}
              </td>

              <td
                className={cn({
                  'has-text-danger': person.sex === 'f',
                  'has-text-info': person.sex === 'm',
                })}
              >
                {person.name}
              </td>

              <td>{person.sex}</td>
              <td>{person.born}</td>
              <td>{person.fatherName}</td>
              <td>{person.motherName}</td>
              <td>
                <button type="button" onClick={() => moveDown(person)}>
                  &darr;
                </button>
                <button type="button" onClick={() => moveUp(person)}>
                  &uarr;
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};
