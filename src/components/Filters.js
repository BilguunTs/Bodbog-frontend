import React from "react";
import { Dropdown, Header, Icon } from "semantic-ui-react";
import { connect } from "../Context";
const options = [
  {
    key: "today",
    text: (
      <Header as="h3" color="orange">
        сүүлд нэмэгдсэнээр
      </Header>
    ),
    value: "desc",
    content: "сүүлд нэмэгдсэнээр",
  },
  {
    key: "this week",
    text: (
      <Header as="h3" color="orange">
        өмнө нэмэгдсэнээр
      </Header>
    ),
    value: "asc",
    content: "өмнө нэмэгдсэнээр",
  },
];

const Filters = ({ context }) => {
  const { setListDirection } = context;
  const handleChange = (_, d) => {
    setListDirection(d.value);
  };
  return (
    <Header as="h3">
      <Icon name="filter" color="grey" />
      <Header.Content>
        Зар{" "}
        <Dropdown
          inline
          options={options}
          onChange={handleChange}
          defaultValue={options[0].value}
        />
      </Header.Content>
    </Header>
  );
};
export default connect(Filters);
