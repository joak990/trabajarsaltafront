import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getmychats, getposts } from "../redux/Actions";
import Cards from "../Components/Cards";
import Banner from "../Components/Banner";
function Home() {
  const jobs = useSelector((state) => state.jobs);
  const dispatch = useDispatch();
  const empleos = jobs.length;
  const id = localStorage.getItem("id")
  useEffect(() => {
    dispatch(getmychats(id));
  }, [dispatch, id]);


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
