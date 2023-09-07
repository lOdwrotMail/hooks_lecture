import React from 'react';
import cn from 'classnames';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.scss';

import { Person } from './types/Person';
import { Loader } from './components/Loader';

type State = {
  loading: boolean;
  people: Person[];
  selectedPeople: Person[];
  sortField: string;
  isReversed: boolean;
};

type DynamicField = 'name' | 'sex' | 'born';

export class App extends React.Component<{}, State> {
  state: Readonly<State> = {
    loading: true,
    people: [],
    selectedPeople: [],
    sortField: '',
    isReversed: false,
  };

  componentDidMount(): void {
    fetch('http://localhost:3000/api/people.json')
      .then((response) => response.json())
      .then((peopleFromServer) => {
        this.setState({
          people: peopleFromServer,
          loading: false,
        });
      });
  }

  getDisplayPeople() {
    const { people, sortField, isReversed } = this.state;

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
  }

  sortBy(field: DynamicField) {
    const { sortField, isReversed } = this.state;

    this.setState({
      sortField:
        !sortField || (sortField && !isReversed) || sortField !== field
          ? field
          : '',
      isReversed: !isReversed && field === sortField,
    });
  }

  render() {
    const {
      people, loading, selectedPeople, sortField, isReversed,
    }
      = this.state;

    function isSelected(personToCheck: Person) {
      return selectedPeople.some(
        (person) => person.slug === personToCheck.slug,
      );
    }

    const remove = (personToRemove: Person) => {
      this.setState((currentState) => ({
        selectedPeople: currentState.selectedPeople.filter(
          (person) => person !== personToRemove,
        ),
      }));
    };

    const add = (personToAdd: Person) => {
      this.setState((state) => ({
        selectedPeople: [...state.selectedPeople, personToAdd],
      }));
    };

    const clearSelection = () => {
      this.setState({ selectedPeople: [] });
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

      this.setState({ people: peopleCopy });
    };

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

      this.setState({ people: peopleCopy });
    };

    const headers: DynamicField[] = ['name', 'sex', 'born'];

    return (
      <div className="box">
        <h1 className="title">People table</h1>

        {loading ? (
          <Loader />
        ) : (
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
                    <a href="#sort" onClick={() => this.sortBy(header)}>
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
              {this.getDisplayPeople().map((person) => (
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
        )}
      </div>
    );
  }
}
