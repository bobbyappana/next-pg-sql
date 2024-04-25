import Link from "next/link";
import Image from "next/image";

import listingStyle from "../../styles/listing.module.css";
import { dateFormate } from "../../utilities/helpers";

export default function BlogItem({ blogItem, index }) {
  return (
    <section
      className={
        listingStyle["blog-section"] + " " + (index != 0 ? listingStyle["blog-border"] : "")
      }
    >
      <div className={"row " + listingStyle["blog-container"]}>
        <div className="col-md-7">
          <Link href={"/blog/" + blogItem.blog_id.toString()}>
            <h4>{blogItem.title}</h4>
          </Link>
          <span className={listingStyle["blog-date"]}>{dateFormate(blogItem.created_at)}</span>
          <p className={listingStyle["description"]}>
            {blogItem.description.slice(0, 400)}
            {blogItem.description.length > 400 && (
              <Link href={"/blog/" + blogItem.blog_id.toString()}>...read more</Link>
            )}
          </p>
        </div>
        <div className="col-md-5">
          {typeof blogItem.image_url != "" && (
            <Image
              src={blogItem.image_url}
              alt="blog-image"
              height="350"
              width="440"
              priority={true}
            />
          )}
          <div className={listingStyle["author"]}>
            <h5>- {blogItem.user_name}</h5>
          </div>
        </div>
      </div>
    </section>
  );
}
