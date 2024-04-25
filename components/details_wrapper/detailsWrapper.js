import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import listingStyle from "../../styles/listing.module.css";
import { apiList } from "../../utilities/constants";
import { apiDeleteCall } from "../../utilities/apiServices";
import { dateFormate } from "../../utilities/helpers";

export default function DetailsWrapper({ blogDetails }) {
  const router = useRouter();
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window != "undefined" && window != null) {
      const userData = localStorage.getItem("userData");
      if (typeof userData != "undefined" && userData != null) {
        setUserDetails(JSON.parse(userData));
      }
    }
  }, []);

  const deleteUserBlog = async () => {
    setIsLoading(true);
    const response = await apiDeleteCall(apiList.DELETE_USER_BLOB + "/" + blogDetails.blog_id);
    setIsLoading(false);

    if (response.status) {
      router.push("/my-profile");
    }
  };

  return (
    <section className={listingStyle["blog-section"]}>
      <div className={"row " + listingStyle["blog-container"]}>
        <div className="col-md-7">
          <h4>{blogDetails.title}</h4>
          <div className={listingStyle["update-blog"]}>
            <div className={listingStyle["blog-date"]}>{dateFormate(blogDetails.created_at)}</div>
            <div>
              {blogDetails.user_id == userDetails?.user_id && (
                <>
                  <Link href={"/my-profile/edit-blog/" + blogDetails.blog_id}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="25"
                      height="25"
                      fill="currentColor"
                      className="bi bi-pen"
                      viewBox="0 0 16 16"
                    >
                      <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001m-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708z" />
                    </svg>
                  </Link>
                  <svg
                    disabled={isLoading}
                    onClick={deleteUserBlog}
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    fill="red"
                    className={"bi bi-trash " + listingStyle["delete"]}
                    viewBox="0 0 16 16"
                  >
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z" />
                    <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z" />
                  </svg>
                </>
              )}
            </div>
          </div>
          <p className={listingStyle["description"]}>{blogDetails.description}</p>
        </div>
        <div className="col-md-5">
          {typeof blogDetails.image_url != "" && (
            <Image
              src={blogDetails.image_url}
              alt="blog-image"
              height="350"
              width="440"
              priority={true}
            />
          )}
          <div className={listingStyle["author"]}>
            <h5>- {blogDetails.user_name}</h5>
          </div>
        </div>
      </div>
    </section>
  );
}
