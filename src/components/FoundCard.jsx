import { db, auth, provider,storage } from "../firebase";
import { ref,getDownloadURL } from "firebase/storage";

export default function DisplayCard(props) {
  const imgid = props.imgId;
  props = props.props;

  const getImageURL = async () => {

    try {
      // const imageRef = storage.ref("found/" + props.itemID + ".jpg");
      const imageRef = ref(storage,"found/" + props.itemID + ".jpg")
      console.log("imageRef", imageRef);
      const imageURL = await getDownloadURL(imageRef);
      console.log("Image URL:", imageURL);
      document.getElementById(imgid).src = imageURL;
      // Use the imageURL as needed
    } catch (error) {
      console.error("Error retrieving image URL:", error);
    }
  };
  getImageURL();
  // console.log("here", props.itemID.split("/")[0]);
  return (
    <div className="bg-white p-4 rounded-lg shadow-xl w-[300px!important] my-10">
      <img
      id={imgid}
        alt="Found Item"
        className="w-full h-40 object-cover rounded-t-lg"
        src="/images/default.png"
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{props.itemName}</h3>
        <p className="text-gray-700 mb-2">
          {props.itemDescription} found at {props.itemLocation}
        </p>
        <p className="mb-4">Contact: {props.contactInfo}</p>
        <a
          className="bg-[#0077b6] text-white py-2 px-4 rounded-md hover:bg-[#0066a2]"
          href={"mailto:" + props.itemID.split("/")[0]}
        >
          Claim Item
        </a>
      </div>
    </div>
  );
}