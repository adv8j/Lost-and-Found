import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import FoundCard from "../components/FoundCard";
import { useState, useEffect } from "react";

export default function FoundList(props) {
  //   const [limit, setLimit] = useState(-1);
  const docRef = doc(db, "lostnfound", "found");
  const [found_list, setFoundList] = useState([]);
  async function getFoundList() {
    const docSnap = await getDoc(docRef);
    const dataSnap = docSnap.data();
    console.log("ye", dataSnap);
    const newFoundList = [];
    Object.values(dataSnap).map((item) => {
      if (item) {
        Object.values(item).map((subItem) => {
          if (typeof subItem === "object") {
            newFoundList.push(subItem);
          }
        });
      }
    });
    console.log("newFoundList", newFoundList);
    return newFoundList;
  }

  useEffect(() => {
    async function fetchData() {
      const list = await getFoundList();
      setFoundList(list);
    }
    fetchData();
  }, []);


  var limit=-1;
  if (props.limit) {
    limit = props.limit;
  }

  return (
    <>
    {props.limit?<></>:(<h1 className="mt-8 text-center text-4xl font-semibold">Found Items</h1>)}
    <div className="flex flex-wrap gap-x-10 gap-y-5 justify-center sm:px-40 w-300">
      {found_list.map((item, index) => {
        if (limit == 0) {
          return;
        }
        limit--;
        return <FoundCard key={index} props={item} imgId={index} />;
      })}
    </div>
  </>
  );
}
