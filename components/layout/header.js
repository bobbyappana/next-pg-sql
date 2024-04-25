import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";

import stylesHeader from "../../styles/header.module.css";
import LogInModal from "../common/loginModal";

export default function Header() {
  const [userDetails, setUserDetails] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const toggle = () => setOpenModal(!openModal);

  useEffect(() => {
    if (typeof window != "undefined" && window != null) {
      const userData = localStorage.getItem("userData");
      if (typeof userData != "undefined" && userData != null) {
        setUserDetails(JSON.parse(userData));
      }
    }
  }, []);

  return (
    <div className={stylesHeader["header"]}>
      <div className={stylesHeader["logo"]}>
        <Link href="/">
          <Image
            src={"/images/iide_logo.png"}
            height="57"
            width="90"
            alt="iide-logo"
            priority={true}
          />
        </Link>
      </div>
      <div className={stylesHeader["login"]}>
        {userDetails != null ? (
          <Link href="/my-profile" className="text-light">
            My Profile
          </Link>
        ) : (
          <a className="text-light" onClick={toggle}>
            Login
          </a>
        )}
      </div>
      <LogInModal openModal={openModal} toggle={toggle} />
    </div>
  );
}
