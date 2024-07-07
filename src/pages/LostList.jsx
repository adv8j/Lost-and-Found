import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import LostCard from "../components/LostCard";
import { useState, useEffect } from "react";

export default function LostList(props) {
  const docRef = doc(db, "lostnfound", "lost");
  const [lost_list, setLostList] = useState([]);
  async function getLostList() {
    const docSnap = await getDoc(docRef);
    const dataSnap = docSnap.data();
    console.log("ye", dataSnap);
    const newLostList = [];
    Object.values(dataSnap).map((item) => {
      if (item) {
        Object.values(item).map((subItem) => {
          if (typeof subItem === "object") {
            newLostList.push(subItem);
          }
        });
      }
    });
    console.log("newLostList", newLostList);
    return newLostList;
  }

  useEffect(() => {
    async function fetchData() {
      const list = await getLostList();
      setLostList(list);
    }
    fetchData();
  }, []);
  var limit = -1;
  if (props.limit) {
    limit = props.limit;
  }
  console.log("list", lost_list);
  return (
    <>
      {props.limit ? (
        <></>
      ) : (
        <h1 className="mt-8 text-center text-4xl font-semibold">Lost Items</h1>
      )}
      <div className="flex flex-wrap gap-x-10 gap-y-5 justify-center sm:px-40 w-300">
        {lost_list.map((item, index) => {
          if (limit == 0) {
            return;
          }
          limit--;
          return <LostCard key={index} props={item} imgId={index} />;
        })}
      </div>
    </>
  );
}
