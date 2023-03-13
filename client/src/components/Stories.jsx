import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setStories } from "../store";
import Story from "./Story";

const Stories = ({ userId = null, isProfile = false }) => {
  const dispatch = useDispatch();
  const stories = useSelector((state) => state.stories);
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  console.log(stories);

  const getStories = async () => {
    let response = null;
    if (user) {
      response = await fetch("http://localhost:8080/stories", {
        method: "GET",
        headers: {
          Authorization: `Tkn_bearer ${token}`,
        },
      });
    } else {
      response = await fetch("http://localhost:8080/stories", {
        method: "GET",
      });
    }

    const storiesData = await response.json();
    dispatch(setStories({ stories: storiesData }));
  };

  const getUserStories = async () => {
    let response = null;
    if (user) {
      response = await fetch(`https://localhost:8080/${userId}/stories`, {
        method: "GET",
        headers: { Authorization: `Tkn_bearer ${token}` },
      });
    } else {
      response = await fetch(`htts://localhost:8080/${userId}/stories`, {
          method: "GET",
        });
    }
    const storiesData = await response.json();
    dispatch(setStories({ stories: storiesData }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserStories();
    } else {
      getStories();
    }
  }, []);

  return (
    <>
      {stories.map(
        ({
          _id,
          userId,
          username,
          userPicturePath,
          title,
          imagePath,
          content,
          agree,
          disagree,
          rating,
          response,
          comments,
          topic,
          commentsFull
        }) => (
          <Story
            key={_id}
            storyId={_id}
            storyUserId={userId}
            username={username}
            userPicturePath={userPicturePath}
            title={title}
            imagePath={imagePath}
            content={content}
            agree={agree}
            disagree={disagree}
            rating={rating}
            comments={comments}
            topic={topic}
          />
        )
      )}
    </>
  );
};

export default Stories;
