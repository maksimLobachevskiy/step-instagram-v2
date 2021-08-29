import React, { useEffect } from "react";
import axios from "axios";
import {
  getPhotos,
  getCurrentPage,
  setFetching,
  getTotalCount
} from "../../../actions/dashboardActions";
import Post from "../Posts/Post/Post";
import { useDispatch, useSelector } from "react-redux";


const Pagination = () => {
  const { photos, currentPage, fetching, totalCount } = useSelector(
    (store) => ({
      photos: store.dashboard.photos,
      currentPage: store.dashboard.currentPage,
      fetching: store.dashboard.fetching,
      totalCount: store.dashboard.totalCount
    })
  );

  const dispatch = useDispatch();

  function paginate(array, page_size, page_number) {
    if (photos !== []) {
      return dispatch(
        getPhotos([
          ...photos,
          ...array.slice((page_number - 1) * page_size, page_number * page_size)
        ])
      );
    }
    return dispatch(
      getPhotos([
        ...array.slice((page_number - 1) * page_size, page_number * page_size)
      ])
    );
  }
  useEffect(() => {
    if (fetching && photos.length !== totalCount.length) {
      axios
        .get(`/api/post/allposts`)
        .then((response) => {
          dispatch(getCurrentPage(currentPage));
          paginate(response.data.posts, 3, currentPage);
          dispatch(getTotalCount(response.data.posts));
        })
        .finally(() => dispatch(setFetching(false)));
    }
  }, [fetching]);

  useEffect(() => {
    document.addEventListener("scroll", paginationHandler);
    return function () {
      document.removeEventListener("scroll", paginationHandler);
    };
  }, []);

  const paginationHandler = (e) => {
    if (
      e.target.documentElement.scrollHeight -
        (e.target.documentElement.scrollTop + window.innerHeight) <
      100
    ) {
      dispatch(setFetching(true));
    }
  };
  return (
    <div className='users-posts'>
      {photos.map((data) => (
        <div key={data._id} className='post'>
          <Post
            comments={data.comments}
            userName={data.postedBy.username}
            altName={data.postedBy.username}
            photoUser={data.postedBy.userimg}
            description={data.descr}
            likes={data.likes}
            id={data._id}
            src={data.src}
            alt={data.alt}
          />
        </div>
      ))}
    </div>
  );
};
export default Pagination;
