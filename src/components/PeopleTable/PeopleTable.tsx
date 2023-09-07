import cn from 'classnames';
import { useState } from 'react';
import { Person } from '../../types/Person';
import { useGetDisplayPeople } from './useGetDisplayPeople';
import { usePeople } from './usePeople';
import { useSelectedPeople } from './useSelectedPeople';

type PeopleTableProps = {
  peopleFromServer: Person[];
};

type DynamicField = 'name' | 'sex' | 'born';
const headers: DynamicField[] = ['name', 'sex', 'born'];

export const PeopleTable = ({ peopleFromServer }: PeopleTableProps) => {
  const { people, moveDown, moveUp } = usePeople(peopleFromServer);
  const {
    selectedPeople, add, clearSelection, remove, isSelected,
  } = useSelectedPeople();

  const [sortField, setSortField] = useState<string>('');
  const [isReversed, setIsReversed] = useState(false);
  const displayPeople = useGetDisplayPeople(people, sortField, isReversed);

  const sortBy = (field: DynamicField) => {
    setSortField(!sortField || (sortField && !isReversed) || sortField !== field
      ? field
      : '');
    setIsReversed(!isReversed && field === sortField);
  };

  return (
    <table className="table is-striped is-narrow">
      <caption className="title is-5 has-text-info">
        {selectedPeople.map((person) => person.name).join(', ') || '---'}
      </caption>

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
          {headers.map((header) => (
            <th>
              {header}
              <a href="#sort" onClick={() => sortBy(header)}>
                <span className="icon">
                  <i
                    className={cn('fas', {
                      'fa-sort': sortField !== header,
                      'fa-sort-up': sortField === header && isReversed,
                      'fa-sort-down': sortField === header && !isReversed,
                    })}
                  />
                </span>
              </a>
            </th>
          ))}
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
  );
};
