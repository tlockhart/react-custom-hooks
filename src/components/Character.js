import React, { useEffect } from 'react';
import { useHttp } from './hooks/http';

import Summary from './Summary';

// Set the character and passes it into the custom useHttp component
const Character = (props) => {
  // let dependencies = [props.selectedChar];
  console.log(`selectedChar: ${props.selectedChar}`);

  const [isLoading, fetchedData] = useHttp('https://swapi.dev/api/people/' + props.selectedChar, [props.selectedChar]);

  let loadedCharacter = null;
  
  // if we do have character data set loaded chard to fetchedData
  if (fetchedData) {
    loadedCharacter = {
      id: props.selectedChar,
      name: fetchedData.name,
      height: fetchedData.height,
      colors: {
        hair: fetchedData.hair_color,
        skin: fetchedData.skin_color
      },
      gender: fetchedData.gender,
      movieCount: fetchedData.films.length
    };
  }
  

  useEffect(() => {
    //cleanup function
    return () => {
      console.log('component did unmount');
    };
  }, []);

    let content = <p>Loading Character...</p>;

    if (!isLoading && loadedCharacter) {
      content = (
        <Summary
          name={loadedCharacter.name}
          gender={loadedCharacter.gender}
          height={loadedCharacter.height}
          hairColor={loadedCharacter.colors.hair}
          skinColor={loadedCharacter.colors.skin}
          movieCount={loadedCharacter.movieCount}
        />
      );
    } else if (!isLoading && !loadedCharacter) {
      content = <p>Failed to fetch character.</p>;
    }
    return content;
  }

export default React.memo(Character,
  (prevProps, nextProps) => {
    // How to rerender a component conditonally?
    //return true if you want to renrender, retrun false if you don't want to rerender
    return nextProps.selectedChar === prevProps.selectedChar;
  });
