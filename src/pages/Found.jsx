import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import LostCard from "../components/LostCard";
import { useState } from "react";

export default function Found() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    console.log(user.email);
  }
  const [lostList, setLostList] = useState([]);

  async function submitHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const itemName = formData.get("item-name");
    const itemDescription = formData.get("item-description");
    const itemImage = formData.get("item-image");
    const itemLocation = formData.get("item-location");
    const contactInfo = formData.get("contact-info");
    // console.log("sd", contactInfo);
    // console.log(itemName, "\n", itemDescription, "\n", itemImage);

    if (
      itemImage &&
      itemDescription &&
      (contactInfo == 0 || contactInfo.length == 10)
    ) {
      try {
        const payload = {
          itemImage: itemImage,
          itemName: itemName,
          itemDescription: itemDescription,
          itemLocation: itemLocation,
          contactInfo: contactInfo,
          email: user.email,
        };
        // console.log("paa");
        const response = await toast.promise(
          axios.post(`http://127.0.0.1:8000/found`, payload, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }),
          {
            loading: "Uploading item...",
            success: <b>Uploaded!</b>,
            error: <b>Error while uploading</b>,
          }
        );
        // t
        const jsonresponse = JSON.parse(response.data);
        console.log("yeee", jsonresponse["results"]);

        if (jsonresponse["results"] == "Dandelion API error") {
          toast.error("Dandelion API error");
        } else {
          // console.log(jsonresponse["results"]);
          setLostList(jsonresponse.results);
          toast.success("Item added successfully");
        }
        // console.log(jsonresponse);
      } catch (error) {
        console.error(error);
      }
    } else {
      toast.error(
        "The image and description of the item is required. Also, kindly ensure contact number is 10 digits long."
      );
    }
  }
  console.log("vk", lostList.length);
  return (
    <div className="flex-1 bg-gray-100 py-12 px-6">
      <div className="max-w-3xl mx-auto space-y-8">
        <section>
          <h2 className="text-3xl font-bold mb-4">
            Welcome to IIT Hyderabad Lost and Found
          </h2>
          <p className="text-gray-700 leading-relaxed">
            This is the lost and found page for the Indian Institute of
            Technology Hyderabad. If you have lost an item on campus, or found
            an item that belongs to someone else, please use the options below
            to report it or view found items.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">Report a Found Item</h2>
          <form
            className="bg-white p-6 rounded-lg shadow-md"
            onSubmit={submitHandler}
          >
            <div className="mb-4">
              <label className="block font-medium mb-2" htmlFor="item-name">
                Item Name
              </label>
              <input
                className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-[#0077b6]"
                id="item-name"
                name="item-name"
                placeholder="Enter the name of the item you found"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label
                className="block font-medium mb-2"
                htmlFor="item-description"
              >
                Item Description
              </label>
              <textarea
                className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-[#0077b6]"
                id="item-description"
                name="item-description"
                placeholder="Provide a detailed description of the item"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2" htmlFor="item-image">
                Upload image
              </label>
              <input
                className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-[#0077b6]"
                id="item-image"
                name="item-image"
                placeholder="Choose file"
                type="file"
                accept="image/png, image/jpg, image/jpeg"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2" htmlFor="item-location">
                Location
              </label>
              <input
                className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-[#0077b6]"
                id="item-location"
                name="item-location"
                placeholder="Enter the location where you found the item"
                type="text"
              />
            </div>
            <div className="mb-4">
              <label className="block font-medium mb-2" htmlFor="contact-info">
                Contact Information
              </label>
              <input
                className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-[#0077b6]"
                id="contact-info"
                name="contact-info"
                placeholder="Enter your contact information"
                type="number"
              />
            </div>
            <button
              className="bg-[#0077b6] text-white py-2 px-4 rounded-md hover:bg-[#0066a2]"
              type="submit"
              formAction="/found"
            >
              Report Found Item
            </button>
          </form>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">View Similar Lost Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {lostList.map((item,index) => {
              if (!item["itemDescription"]) {
                return <span className="m-0 p-0" key={index}></span>;
              }
                {/* <LostCard
                key = {index}
                imgId={index}
                  props={{
                    itemName: "Yeh",
                    itemDescription: "lost smth",
                    itemLocation: "ay sir",
                    contactInfo: "na",
                    itemID: "yeh/ai",
                  }}
                /> */}
              return (
            <LostCard props={item} key={index} imgId={index} />
              );
            })}
            {/* <div className="bg-white p-4 rounded-lg shadow-md">
              <img
                alt="lost Item"
                className="w-full h-40 object-cover rounded-t-lg"
                src="/placeholder.svg"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Water Bottle</h3>
                <p className="text-gray-700 mb-4">
                  A blue water bottle lost in the library on 05/12/2023.
                </p>
                <a
                  className="bg-[#0077b6] text-white py-2 px-4 rounded-md hover:bg-[#0066a2]"
                  href="#"
                >
                  Claim Item
                </a>
              </div>
            </div> */}
            {/* <div className="bg-white p-4 rounded-lg shadow-md">
              <img
                alt="lost Item"
                className="w-full h-40 object-cover rounded-t-lg"
                src="/placeholder.svg"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Laptop Charger</h3>
                <p className="text-gray-700 mb-4">
                  A black laptop charger lost in the computer lab on 04/28/2023.
                </p>
                <a
                  className="bg-[#0077b6] text-white py-2 px-4 rounded-md hover:bg-[#0066a2]"
                  href="#"
                >
                  Claim Item
                </a>
              </div>
            </div> */}
            {/* <div className="bg-white p-4 rounded-lg shadow-md">
              <img
                alt="lost Item"
                className="w-full h-40 object-cover rounded-t-lg"
                src="/placeholder.svg"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">Textbook</h3>
                <p className="text-gray-700 mb-4">
                  A calculus textbook lost in the lecture hall on 05/05/2023.
                </p>
                <a
                  className="bg-[#0077b6] text-white py-2 px-4 rounded-md hover:bg-[#0066a2]"
                  href="#"
                >
                  Claim Item
                </a>
              </div>
            </div> */}
          </div>
        </section>
      </div>
    </div>
  );
}
