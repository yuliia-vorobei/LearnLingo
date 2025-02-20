import { useDispatch } from "react-redux";
import { fetchTeachersInfo } from "../../redux/operations";
import { useEffect } from "react";

const TeachersPage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTeachersInfo());
  }, [dispatch]);
};

export default TeachersPage;
