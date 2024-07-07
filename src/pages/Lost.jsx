import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import FoundCard from "../components/FoundCard";
import {React, useState } from "react";

export default function Lost() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user) {
    console.log(user.email);
  }
  const [foundList, setFoundList] = useState([{ 1: "2" }]);
  async function submitHandler(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const itemName = formData.get("item-name");
    const itemDescription = formData.get("item-description");
    const itemImage = formData.get("item-image");
    const itemLocation = formData.get("item-location")
      ? formData.get("item-location")
      : "NA";
    const contactInfo = formData.get("contact-info");
    // console.log("img", itemImage);
    console.log("bv", event.target.elements[0]);

    if (
      // (itemName && itemDescription) && ((!contactInfo)||(contactInfo.length == 10) )) {
      itemName &&
      itemDescription
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
        // console.log("pay", payload);
        const response = await toast.promise(
          axios.post(`http://127.0.0.1:8000/lost`, payload, {
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

        const jsonresponse = JSON.parse(response.data);

        if (jsonresponse["results"] == "Dandelion API error") {
          toast.error("Dandelion API error");
        } else {
          setFoundList(jsonresponse["results"]);
          toast.success("Item reported successfully");
        }
        console.log("resp", jsonresponse["results"]);
      } catch (error) {
        console.error("err resp", error);
      }
    } else {
      toast.error(
        "The name and description of the item is required. Also, kindly ensure contact number is 10 digits long."
      );
    }
  }

  return (
    <div className="flex-1 bg-gray-100 py-12 px-6 ">
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
          <h2 className="text-2xl font-bold mb-4">Report a Lost Item</h2>
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
                placeholder="Enter the name of the item you lost"
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
              <label className="block font-medium mb-2" htmlFor="contact-info">
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
              <label className="block font-medium mb-2" htmlFor="location">
                Location
              </label>
              <input
                className="border-gray-300 rounded-md w-full py-2 px-3 focus:outline-none focus:ring focus:border-[#0077b6]"
                id="item-location"
                name="item-location"
                placeholder="Enter the location where you lost the item"
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
            >
              Report Lost Item
            </button>
          </form>
        </section>
        <section>
          <h2 className="text-2xl font-bold mb-4">View Similar Found Items</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {foundList.map((item, index) => {
              if (!item["itemDescription"]) {
                return <span className="m-0 p-0" key={index}></span>;
              }
              return <FoundCard key={index} imgId={index} props={item} />;
            })}
          </div>
        </section>
      </div>
      <Toaster />
    </div>
  );
}
