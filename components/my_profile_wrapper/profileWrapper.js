import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import BlogItem from "../landing_wrapper/blogItem";
import { apiList } from "../../utilities/constants";
import { apiGetCall } from "../../utilities/apiServices";
import listingStyle from "../../styles/listing.module.css";

export default function MyProfileWrapper() {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(null);
  const [userBlogList, setUserBlogList] = useState([]);

  useEffect(() => {
    if (typeof window != "undefined" && window != null) {
      const userData = localStorage.getItem("userData");

      if (typeof userData != "undefined" && userData != null) {
        const jsonData = JSON.parse(userData);

        setUserDetails(jsonData);
        getUserBlogsList(jsonData.user_id);
      } else {
        router.push("/");
      }
    }
  }, []);

  const userLogOut = () => {
    localStorage.removeItem("userData");
    router.reload();
  };

  const getUserBlogsList = async (userId) => {
    const response = await apiGetCall(apiList.GET_USER_BLOGS_LIST + "/" + userId);

    if (response.status) {
      setUserBlogList(response.data);
    }
  };

  return (
    <div className="mt-3 container">
      <h2>My Profile</h2>
      <div className={listingStyle["user-profile"]}>
        <div className={"row " + listingStyle["user-name"]}>
          <b>User Name</b>
          <span>{userDetails?.user_name}</span>
          <b>Email</b>
          <p>{userDetails?.email}</p>
        </div>
        <div className={listingStyle["user-action"]}>
          <button onClick={userLogOut} className={listingStyle["log-out"]}>
            Log out
          </button>
          <Link href="/my-profile/add-blog">
            <button className={listingStyle["add-blog"]}>Create Blog</button>
          </Link>
        </div>
      </div>
      {userBlogList.length > 0 && (
        <>
          <div className={"mt-4 " + listingStyle["user-blog-border"]}>
            <h4>My Blogs</h4>
          </div>
          {userBlogList.map((item, i) => (
            <BlogItem key={i} blogItem={item} index={i} />
          ))}
        </>
      )}
    </div>
  );
}
