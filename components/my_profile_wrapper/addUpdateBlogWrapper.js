import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import { apiPostCall, apiUpdateCall } from "../../utilities/apiServices";
import { apiList } from "../../utilities/constants";
import { validateDescription, validateTitle } from "../../utilities/formValidations";

export default function AddUpdateBlogWrapper({ blogDetails = {} }) {
  const defaultFormData = {
    title: blogDetails?.title ?? "",
    description: blogDetails?.description ?? "",
    image_url: blogDetails?.image_url ?? "",
  };

  const router = useRouter();
  const [formData, setFormData] = useState(defaultFormData);
  const [userDetails, setUserDetails] = useState(null);
  const [titleValidation, setTileValidation] = useState(true);
  const [descriptionValidation, setDescriptionValidation] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  useEffect(() => {
    if (typeof window != "undefined" && window != null) {
      const userData = localStorage.getItem("userData");
      if (typeof userData != "undefined" && userData != null) {
        const jsonData = JSON.parse(userData);

        if (
          typeof blogDetails?.user_id != "undefined" &&
          jsonData.user_id != blogDetails?.user_id
        ) {
          router.push("/");
        }
        setUserDetails(jsonData);
      } else {
        router.push("/");
      }
    }
  }, []);

  const updateFormData = (type, value) => {
    setErrorMsg(false);
    const temp = { ...formData };
    temp[type] = value;
    setFormData(temp);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = async (event) => {
      const payload = {
        image: event.target.result,
      };

      const response = await apiPostCall(apiList.UPLOAD_IMAGE, payload);

      if (response.status) {
        updateFormData("image_url", response.imageUrl);
      }
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.title &&
      formData.description &&
      formData.image_url &&
      titleValidation &&
      descriptionValidation
    ) {
      const payload = {
        title: formData.title,
        description: formData.description,
        user_name: userDetails.user_name,
        image_url: formData.image_url,
        user_id: userDetails.user_id,
      };

      let apiEndPoint = "";
      let response = {};

      setIsLoading(true);
      if (Object.keys(blogDetails).length > 0) {
        apiEndPoint = apiList.UPDATE_USER_BLOB;

        payload.blog_id = blogDetails.blog_id;

        response = await apiUpdateCall(apiEndPoint, payload);
      } else {
        apiEndPoint = apiList.ADD_USER_BLOG;

        response = await apiPostCall(apiEndPoint, payload);
      }
      setIsLoading(false);

      if (response.status) {
        router.push("/my-profile");
      }
    } else {
      setErrorMsg("All field are required*");
    }
  };

  return (
    <div className="container mt-2">
      <form onSubmit={(e) => handleSubmit(e)}>
        <div className="row">
          <div className="col-md-7">
            <p className="text-danger">{errorMsg && errorMsg}</p>
            <label htmlFor="tile">Title *</label>
            <input
              className="form-control"
              id="title"
              type="text"
              value={formData.title}
              onChange={(e) => {
                setTileValidation(validateTitle(e.target.value));
                updateFormData("title", e.target.value);
              }}
            />
            {!titleValidation && (
              <p className="text-danger">Title must be at least 20 alphabetic characters long</p>
            )}
            <label htmlFor="description">Description *</label>
            <textarea
              className="form-control"
              id="description"
              type="text"
              rows="10"
              value={formData.description}
              onChange={(e) => {
                setDescriptionValidation(validateDescription(e.target.value));
                updateFormData("description", e.target.value);
              }}
            />
            {!descriptionValidation && (
              <p className="text-danger">Description be at least 100 characters long</p>
            )}
            <label htmlFor="description">Image *</label>
            <input
              type="file"
              accept="image/*"
              className="form-control"
              onChange={handleImageChange}
            />

            <div className="text-center mt-2">
              <button type="submit" disabled={isLoading} className="btn btn-primary">
                {Object.keys(blogDetails).length > 0 ? "UPDATE" : "SAVE"}
              </button>
            </div>
          </div>
          <div className="col-md-5 mt-3">
            {formData.image_url != "" && (
              <Image src={formData.image_url} alt="blog-image" height="350" width="440" priority={true}/>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
