import { db, auth, provider, storage } from "../firebase";
import { ref, getDownloadURL } from "firebase/storage";

export default function DisplayCard(props) {
  props = props.props;
  const imgid = props.imgId;

  const getImageURL = async () => {
    try {
        const imageRef = ref(storage,"lost/" + props.itemID + ".jpg");
        console.log(imageRef)
        const imageURL = await getDownloadURL(imageRef);
        document.getElementById(imgid).src = imageURL;
        console.log("Image URL:", imageURL);
  
    //   try {
    //     const imageRef = ref(storage, "lost/" + props.itemID + ".jpg");
    //     const imageURL = await getDownloadURL(imageRef);
    //     document.getElementById(imgid).src = imageURL;
    //   } catch (error) {
    //     try {
    //       const imageRef = ref(storage, "lost/" + props.itemID + ".jpeg");
    //       const imageURL = await getDownloadURL(imageRef);
    //       document.getElementById(imgid).src = imageURL;
    //     } catch (error) {
    //       const imageRef = ref(storage, "lost/" + props.itemID + ".png");
    //       const imageURL = await getDownloadURL(imageRef);
    //       document.getElementById(imgid).src = imageURL;
    //     }
    //   }

    //   const imageURL = await getDownloadURL(imageRef);
    //   document.getElementById(imgid).src = imageURL;
    //   console.log("Image URL:", imageURL);
      // Use the imageURL as needed
    } catch (error) {
      console.error("No img exists for this");
    }
  };

  getImageURL();

  // console.log("here", props.itemID.split("/")[0]);
  return (
    <div className="bg-white p-4 rounded-lg shadow-xl w-[300px!important] my-10">
      <img
        alt="Found Item"
        className="w-full h-40 object-cover rounded-t-lg"
        src="/images/default.png"
        id={imgid}
      />
      <div className="p-4">
        <h3 className="text-xl font-bold mb-2">{props.itemName}</h3>
        <p className="text-gray-700 mb-2">
          {props.itemDescription} lost at {props.itemLocation}
        </p>
        <p className="mb-4">Contact: {props.contactInfo}</p>
        <a
          className="bg-[#0077b6] text-white py-2 px-4 rounded-md hover:bg-[#0066a2]"
          href={"mailto:" + props.itemID.split("/")[0]}
        >
          Notify
        </a>
      </div>
    </div>
  );
}
