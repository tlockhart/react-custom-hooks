import {useState, useEffect } from 'react';

// Returns if data is loading, and results of fetched data
// Dependencies is an empty list of characters initially
// Dendencies is the argument being passed in from charPicker, that contains the fetched data, it is initialized to [], This will cause the component to behave like didComponentMount, and only render once the component loads, and onl rerender when the dependencies change, which it will not, because it is [].
export const useHttp = (url, dependencies) => {
    // add function state variable:
    //Syntax
    // const [stateVariable, updateMethod] = useState(initialValue);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchedData, setFetchedData] = useState(null);

    console.log("My dependencies is newly fetched data: ", dependencies);
    // takes dependencies as a variable to track for changes.  When dependencies change, the custom hook http will be rerendered
    // useEffect runs after the first render cycle
    useEffect(() => {
        setIsLoading(true);
        console.log("Sending Http request to URL:", + url);
        fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error('Failed to fetch.');
          }
          return response.json();
        })
        .then(charData => {
        // set data loading
        setIsLoading(false);
        // set new data
        setFetchedData(charData);
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
        });
    }, dependencies);

    
    return [isLoading, fetchedData];
};
