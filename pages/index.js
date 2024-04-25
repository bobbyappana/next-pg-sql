import LandingWrapper from "../components/landing_wrapper/landingWrapper";
import { apiGetCall } from "../utilities/apiServices";
import { apiList } from "../utilities/constants";

export default function Home({ landingData }) {
  return (
    <>
      <div>
        <LandingWrapper landingData={landingData} />
      </div>
    </>
  );
}

export function getServerSideProps() {
  return {
    props: {
      landingData: "",
    },
  };
}
