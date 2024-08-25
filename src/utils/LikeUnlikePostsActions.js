import { axiosRes } from "../api/axiosDefaults";

/**
 * likePost handles the logic for liking a post.
 * It sends a POST request to the server to like a post, then updates the state
 * with the new like data.
 */
export const likePost = async (postId, setPosts) => {
  try {
    // Send a POST request to like the post with the given postId
    const { data } = await axiosRes.post("/like/post/", { post: postId });
    
    // Update the posts state to reflect the new like
    setPosts((prevPosts) => ({
      ...prevPosts,
      results: prevPosts.results.map((post) =>
        post.id === postId
          ? {
              ...post,
              post_likes_count: post.post_likes_count + 1, // Increment the like count
              post_like_id: data.id, // Set the ID of the like
            }
          : post
      ),
    }));
  } catch (err) {
    // console.log(err)
    // Handle errors
    throw new Error("Sorry, an error occurred. Please try again.");
  }
};

/**
 * unlikePost handles the logic for unliking a post.
 * It sends a DELETE request to the server to unlike a post, then updates the state
 * to remove the like data.
 */
export const unlikePost = async (postLikeId, postId, setPosts) => {
  try {
    // Send a DELETE request to remove the like with the given postLikeId
    await axiosRes.delete(`/like/post/${postLikeId}`);
    
    // Update the posts state to reflect the removal of the like
    setPosts((prevPosts) => ({
      ...prevPosts,
      results: prevPosts.results.map((post) =>
        post.id === postId
          ? {
              ...post,
              post_likes_count: post.post_likes_count - 1, // Decrement the like count
              post_like_id: null, // Remove the like ID
            }
          : post
      ),
    }));
  } catch (err) {
    // console.log(err)
    // Handle errors
    throw new Error("Sorry, an error occurred. Please try again.");
  }
};
