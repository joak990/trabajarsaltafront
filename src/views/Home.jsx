import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getposts } from "../redux/Actions";
import Cards from "../Components/Cards";
import Banner from "../Components/Banner";
function Home() {
  const jobs = useSelector((state) => state.jobs);

  const empleos = jobs.length;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getposts());
  }, [dispatch]);

  const [empleo, setEmpleo] = useState();
  return (
    <div>
      <Banner />
      <div className="flex items-start justify-start  ml-24"></div>
      <div className="flex items-center justify-around ">
        Empleos actuales : {empleos}
        <div className="bg-blue-200"></div>
      </div>
      <Cards />
    </div>
  );
}

export default Home;
