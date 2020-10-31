import React, { Component } from "react";
import { ItemGroup, Placeholder } from "semantic-ui-react";
import { Query } from "react-apollo";
import { GET_HERD } from "../Queries";
import { HerdCard } from "../components/Cards";
import InfiniteScroll from "react-infinite-scroller";
export default class ListView extends Component {
  state = {
    hasmore: true,
    offset: 0,
    first: 10,
  };
  render() {
    const { first, offset } = this.state;
    const { dir } = this.props;
    return (
      <Query query={GET_HERD} variables={{ first, offset, dir }}>
        {({ loading, data, error, fetchMore }) => {
          if (error) {
            return <h2>Сэрвэр унтарсан байж болзошгүй</h2>;
          }

          if (loading) {
            return Array.from([1, 2, 3], (l) => (
              <Placeholder key={l} fluid>
                <Placeholder.Header image>
                  <Placeholder.Line />
                  <Placeholder.Line />
                  <Placeholder.Line />
                </Placeholder.Header>
              </Placeholder>
            ));
          }
          if (data.herds.length === 0) {
            return <h1>Одоогоор нийтлэгдсэн зар байхгүй байна</h1>;
          }

          return (
            <InfiniteScroll
              pageStart={0}
              loadMore={() =>
                fetchMore({
                  variables: {
                    first: 5,
                    dir,
                    offset: data.herds.length,
                  },
                  updateQuery: (prev, { fetchMoreResult }) => {
                    if (!fetchMoreResult) {
                      return prev;
                    }
                    if (fetchMoreResult.herds.length === 0) {
                      return this.setState({ hasmore: false });
                    }

                    return Object.assign({}, prev, {
                      herds: [...prev.herds, ...fetchMoreResult.herds],
                    });
                  },
                })
              }
              hasMore={this.state.hasmore}
              loader={
                <Placeholder fluid>
                  <Placeholder.Header image>
                    <Placeholder.Line />
                    <Placeholder.Line />
                    <Placeholder.Line />
                  </Placeholder.Header>
                </Placeholder>
              }
            >
              <ItemGroup relaxed>
                {!error ? (
                  data.herds.map((item, i) => <HerdCard key={i} {...item} />)
                ) : (
                  <div>Сэрвэр унтарсан байж болзошгүй</div>
                )}
              </ItemGroup>
            </InfiniteScroll>
          );
        }}
      </Query>
    );
  }
}
/**
 * <Button.Group>
          <Button
            disabled={items.length === 0}
            icon="minus"
            onClick={this.handleRemove}
          />
          <Button
            disabled={items.length === users.length}
            icon="plus"
            onClick={this.handleAdd}
          />
        </Button.Group>
           <List.Item key={i}>
                    <List.Icon
                      color="green"
                      name="arrow alternate circle up outline"
                    ></List.Icon>
                    <List.Content>
                      {`${item.herdType} `}
                      үнэ{` ${item.price || 0}төг`}{" "}
                    </List.Content>
                    <List.Description as="h4">
                      {`нас ${item.age || null}`}
                      <br />
                      {`зүс ${item.color || null}`}
                      <br />
                      {`өндөр ${item.height || null}`}
                      <br />
                      {`жин ${item.height || null}`}
                      <br />
                    </List.Description>
                  </List.Item>
 */
