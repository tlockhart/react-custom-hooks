import React from 'react';
import {useHttp} from './hooks/http';
import './CharPicker.css';

const CharPicker = props => {
  // we want to fetch all the characters, only when the component loads.  This value will be tracked in the custom component to determine when a new fetch will occur, which should only be when the component is reloaded.  When does a component get rerendered, when its state, or props change.  This component will be rerendered when the state variable in useHTTP custom hook changes

  const dependencies = [];

  // All Hooks must be called at the top level, not nested
  // Whenever state changes in useHook, the component will be rerendered.
  const [isLoading, fetchedData] = useHttp('https://swapi.dev/api/people', dependencies); 

  // set SelectedCharacters with fetchedData, resutls, if fetchedData exists only
  const selectedCharacters = fetchedData ? fetchedData.results.slice(0, 5).map(
    (char, index) => ({
      name: char.name,
      id: index +1
    })) : [];

  let content = <p>Loading characters...</p>;

  if (!isLoading && selectedCharacters && selectedCharacters.length > 0) {
    content = (
      <select
        onChange={props.onCharSelect}
        value={props.selectedChar}
        className={props.side}
      >
        {selectedCharacters.map(char => (
          <option key={char.id} value={char.id}>
            {char.name}
          </option>
        ))}
      </select>
    );
  } else if (!isLoading && (!selectedCharacters || selectedCharacters.length === 0)) {
    content = <p>Could not fetch any data.</p>;
  }
  return content;
};

export default CharPicker;