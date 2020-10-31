import React from "react";
import { Card } from "../components/ElasticCard";
import { Placeholder } from "semantic-ui-react";
import "../css/Elastic.css";
import "../css/Button.css";
import { useQuery } from "@apollo/react-hooks";
import { Query } from "react-apollo";
import { GET_HERD } from "../Queries";
import InfiniteScroll from "react-infinite-scroller";
const List = ({ match, history, dir }) => {
  const [hasmore, setHasmore] = React.useState(true);
  return (
    <Query query={GET_HERD} variables={{ first: 10, offset: 0, dir }}>
      {({ loading, data, fetchMore, error }) => {
        if (loading)
          return (
            <div>
              {" "}
              <Placeholder
                style={{ width: 350, height: 370, borderRadius: 20 }}
              >
                <Placeholder.Image square />
              </Placeholder>
            </div>
          );
        if (error) return <div>Сэрвэр унтарсан байж болзошгүй</div>;
        return (
          <InfiniteScroll
            pageStart={0}
            key={0}
            hasMore={hasmore}
            loader={
              <Placeholder
                style={{ width: 350, height: 370, borderRadius: 20 }}
              >
                <Placeholder.Image square />
              </Placeholder>
            }
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
                    return setHasmore(false);
                  }
                  return Object.assign({}, prev, {
                    herds: [...prev.herds, ...fetchMoreResult.herds],
                  });
                },
              })
            }
          >
            <ul className="Card-List">
              {data.herds.length !== 0 ? (
                data.herds.map((herd, i) => (
                  <Card
                    key={herd._id}
                    isSelected={match.params.id === herd._id}
                    history={history}
                    backgroundColor={
                      !herd.image && i % 2 === 0 ? "#4b4453" : "#b0a8b9"
                    }
                    {...herd}
                  />
                ))
              ) : (
                <div style={{ textAlign: "center" }}>
                  <h1>Одоогоор нийтлэгдсэн зар байхгүй байна</h1>
                </div>
              )}
            </ul>
          </InfiniteScroll>
        );
      }}
    </Query>
  );
};
export default List;
