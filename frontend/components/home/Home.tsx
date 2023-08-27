import { GetStaticProps, NextPage } from "next";
import { HomePageProps } from "../../types/intefaces";
import axios from "config/axiosConfig/userInstance";

const MyPage: NextPage<HomePageProps> = ({ data }) => {
    console.log(data);
    
  return (
    <div>
      <h1>My Page</h1>
      <p>{data}</p>
    </div>
  );
};

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  const data: any = await axios.get("/hai");

  return {
    props: {
      data,
    },
  };
};

export default MyPage;
