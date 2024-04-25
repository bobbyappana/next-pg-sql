import { useEffect, useState } from "react";

import BlogItem from "./blogItem";
import { apiGetCall } from "../../utilities/apiServices";
import { apiList } from "../../utilities/constants";

export default function LandingWrapper() {
  const [blogsList, setBlogsList] = useState([]);

  useEffect(() => {
    usersBlogsList();
  }, []);

  const usersBlogsList = async (e) => {
    const response = await apiGetCall(apiList.GET_BLOGS_LIST);
    if (response.status) {
      setBlogsList(response.data);
    }
  };

  return (
    <>
      {blogsList.length > 0 ? (
        blogsList.map((item, i) => <BlogItem key={i} blogItem={item} index={i} />)
      ) : (
        <div className="page-not-found">
          <h6>Sorry, No Blogs Found, Please log in to create your blogs.</h6>
        </div>
      )}
    </>
  );
}
