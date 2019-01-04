import React, { useState, useEffect, useRef } from "react";
import "./Explorer.css";
import { Input, List, Image } from "semantic-ui-react";
import _ from "lodash";
import faker from "faker";
import { from, fromEvent } from "rxjs";
import {
  debounceTime,
  map,
  switchMap,
  tap,
  distinctUntilChanged,
  filter
} from "rxjs/operators";

const source = _.times(30, () => {
  const obj = {
    id: faker.random.uuid(),
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    image: faker.internet.avatar(),
    price: faker.finance.amount(0, 100, 2, "$")
  };
  return obj;
});

export default function Explorer(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);

  const inputRef = useRef();

  useEffect(() => {
    const inputs = fromEvent(inputRef.current.inputRef, "keyup").pipe(
      map(i => i.currentTarget.value),
      filter(i => i !== ""),
      distinctUntilChanged()
    );

    let subscription = inputs
      .pipe(
        tap(() => setIsLoading(true)),
        debounceTime(500),
        switchMap(query =>
          from(
            fetch(`http://localhost:3001/users?q=${query}`).then(response =>
              response.json()
            )
          )
        )
      )
      .subscribe(results => {
        console.log("results", results);
        console.log("inputRef", inputRef.current.inputRef.value);
        setResults(results);
        setIsLoading(false);
      });
    return () => subscription.unsubscribe();
  }, []);

  const handleOnClick = (code, e) => {
    e.preventDefault();
    props.onSelectedChange(code);
  };

  return (
    <div className="explorer">
      <Input
        ref={inputRef}
        className="input"
        fluid
        size="small"
        icon="search"
        placeholder="Search..."
        loading={isLoading}
      />
      <div className="results">
        {inputRef.current &&
        inputRef.current.inputRef.value &&
        !isLoading &&
        results.length == 0 ? (
          <span>No mocks found</span>
        ) : (
          <List relaxed inverted selection verticalAlign="middle">
            {results.map(r => (
              <List.Item key={r.id} onClick={e => handleOnClick(r, e)}>
                <Image avatar src={r.image} />
                <List.Content>
                  <List.Header>{r.title}</List.Header>
                  <List.Description>{r.description}</List.Description>
                </List.Content>
              </List.Item>
            ))}
          </List>
        )}
      </div>
    </div>
  );
}
