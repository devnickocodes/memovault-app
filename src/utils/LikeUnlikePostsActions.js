import { axiosRes } from "../api/axiosDefaults";

export const likePost = async (postId, setPosts) => {
  try {
    const { data } = await axiosRes.post("/like/post/", { post: postId });
    setPosts((prevPosts) => ({
      ...prevPosts,
      results: prevPosts.results.map((post) =>
        post.id === postId
          ? {
              ...post,
              post_likes_count: post.post_likes_count + 1,
              post_like_id: data.id,
            }
          : post
      ),
    }));
  } catch (err) {
    // console.log(err)
    throw new Error("Sorry, an error occurred. Please try again.");
  }
};

export const unlikePost = async (postLikeId, postId, setPosts) => {
  try {
    await axiosRes.delete(`/like/post/${postLikeId}`);
    setPosts((prevPosts) => ({
      ...prevPosts,
      results: prevPosts.results.map((post) =>
        post.id === postId
          ? {
              ...post,
              post_likes_count: post.post_likes_count - 1,
              post_like_id: null,
            }
          : post
      ),
    }));
  } catch (err) {
    // console.log(err)
    throw new Error("Sorry, an error occurred. Please try again.");
  }
};
