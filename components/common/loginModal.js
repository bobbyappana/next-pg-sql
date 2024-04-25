import React, { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";

import { apiPostCall } from "../../utilities/apiServices";
import { apiList } from "../../utilities/constants";
import { validateEmail, validateUserName } from "../../utilities/formValidations";

const CustomModal = dynamic(() => import("./customModal"));

export default function LogInModal({ openModal, toggle }) {
  const defaultFormData = {
    email: "",
    user_name: "",
  };

  const router = useRouter();
  const [formData, setFormData] = useState(defaultFormData);
  const [emailValidation, setEmailValidation] = useState(true);
  const [userNameValidation, setUserNameValidation] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(false);

  const updateFormData = (type, value) => {
    setErrorMsg(false);
    const temp = { ...formData };
    temp[type] = value;
    setFormData(temp);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.email && formData.user_name && emailValidation && userNameValidation) {
      const payload = {
        email: formData.email,
        user_name: formData.user_name,
      };

      setIsLoading(true);
      const response = await apiPostCall(apiList.USER_LOG_IN, payload);
      setIsLoading(false);

      if (response.status) {
        localStorage.setItem("userData", JSON.stringify(response.data));
        router.reload();
      } else {
        setErrorMsg(response.message);
      }
    } else {
      setErrorMsg("Please provide a valid email and user name");
    }
  };

  return (
    <CustomModal openModal={openModal} toggle={toggle}>
      <form onSubmit={(e) => handleSubmit(e)}>
        <p className="text-danger">{errorMsg && errorMsg}</p>

        <label htmlFor="email">Email *</label>
        <input
        id="email"
          className="form-control"
          type="text"
          onChange={(e) => {
            setEmailValidation(validateEmail(e.target.value));
            updateFormData("email", e.target.value);
          }}
        />
        {!emailValidation && <p className="text-danger">Email should be valid</p>}

        <label htmlFor="user_name">User Name *</label>
        <input
        id="user_name"
          className="form-control"
          type="text"
          onChange={(e) => {
            setUserNameValidation(validateUserName(e.target.value));
            updateFormData("user_name", e.target.value);
          }}
        />
        {!userNameValidation && (
          <p className="text-danger">User name must be at least 6 characters long</p>
        )}

        <div className="text-center mt-2">
          <button type="submit" disabled={isLoading} className="btn btn-primary">
            Log in
          </button>
        </div>
      </form>
    </CustomModal>
  );
}
