/* eslint-disable react/prefer-stateless-function */
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import styles from "../styles/Filter.css";
import { PaginataionSelector } from "../selectors";
// eslint-disable-next-line import/extensions
import Pagination from "./Pagination.jsx";
import NewFriendsForm from "./NewFriendsForm";
import RenderFriends from "./RenderFirends";

const mapStateToProps = state => ({
  friends: PaginataionSelector(state),
  friendsFetchingState: state.friendsFetchingState,
  currentPage: state.friends.currentPage,
  pageSize: state.friends.pageSize
});

class Friends extends React.Component {
  constructor(props) {
    super(props);
    this.top = React.createRef();
  }

  componentDidUpdate(prevProps) {
    const { currentPage } = this.props;
    if (prevProps.currentPage !== currentPage) {
      this.handleScroll();
    }
  }

  handleScroll = () => {
    this.top.current.scrollIntoView({ behavior: "smooth" });
  };

  render() {
    const { friends, friendsFetchingState, pageSize, currentPage } = this.props;
    if (friendsFetchingState === "requested") {
      return <div className={styles.load}>Please, wait for few moments...</div>;
    }

    if (friendsFetchingState === "failed") {
      return <div className={styles.failed}>Please, reload page!</div>;
    }
    return (
      <div className={styles.container}>
        <div className={styles.listContainer} ref={this.top}>
          <NewFriendsForm />
          <h2>Friends</h2>
          <RenderFriends friends={friends} />
          {friends.length < pageSize && currentPage === 0 ? null : (
            <Pagination />
          )}
        </div>
      </div>
    );
  }
}
Friends.propTypes = {
  friends: PropTypes.array.isRequired,
  friendsFetchingState: PropTypes.string.isRequired,
  currentPage: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired
};

export default connect(mapStateToProps)(Friends);
