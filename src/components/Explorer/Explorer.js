import React, { useState } from "react";
import "./Explorer.css";
import { Input, List, Image } from "semantic-ui-react";
import _ from "lodash";
import faker from "faker";

const source = _.times(30, () => {
  const obj = {
    id: faker.random.uuid(),
    title: faker.company.companyName(),
    description: faker.company.catchPhrase(),
    image: faker.internet.avatar(),
    price: faker.finance.amount(0, 100, 2, "$")
  };
  return {
    ...obj,
    content: obj
  };
});

// const source = _.times(30, () => ({
//   id: faker.random.uuid(),
//   title: faker.company.companyName(),
//   description: faker.company.catchPhrase(),
//   image: faker.internet.avatar(),
//   price: faker.finance.amount(0, 100, 2, "$"),
//   content: {

//   }
// }));

export default function Explorer(props) {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const handleSearchChange = (e, { value }) => {
    setLoading(true);

    setTimeout(() => {
      if (value.length < 1) {
        setLoading(false);
        return;
      }

      const re = new RegExp(_.escapeRegExp(value), "i");
      const isMatch = result => re.test(result.title);

      setLoading(false);
      setResults(_.filter(source, isMatch));
    }, 300);
  };

  const handleOnClick = (code, e) => {
    e.preventDefault();
    props.onSelectedChange(code);
  };

  return (
    <div className="explorer">
      <Input
        className="input"
        fluid
        size="small"
        icon="search"
        placeholder="Search..."
        loading={loading}
        onChange={_.debounce(handleSearchChange, 500, {
          leading: true
        })}
      />
      <div className="results">
        <List relaxed inverted selection verticalAlign="middle">
          {results.map(r => (
            <List.Item key={r.id} onClick={e => handleOnClick(r.content, e)}>
              <Image avatar src={r.image} />
              <List.Content>
                <List.Header>{r.title}</List.Header>
                <List.Description>{r.description}</List.Description>
              </List.Content>
            </List.Item>
          ))}
        </List>
      </div>
    </div>
  );
}
