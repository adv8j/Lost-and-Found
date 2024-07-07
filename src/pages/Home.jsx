import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter, Card } from "@/components/ui/card";
import { FiChevronDown, FiChevronRight } from "react-icons/fi";
import  LostList from "../pages/LostList";
import  FoundList from "../pages/FoundList";

import { Toaster, toast } from "react-hot-toast";
// import axios from "axios";

// const axios = require("axios");
// let lostItems;
// let foundItems;

// axios.get("get top 3 lost and found items").then((response) => {

// }).catch((error) => {

// });

export default function Home() {

  return (
    <>
      <div className="flex flex-col min-h-max">
        <div className="min-h-screen">
          <div className="bg-gray-950 py-20 px-6 text-center flex flex-col justify-around text-white h-[calc(100vh-112px)]">
            <div>
              <h1 className="text-4xl font-bold mb-4">
                Welcome to IIT Hyderabad Lost & Found
              </h1>
              <p className="text-lg mb-8">
                Helping you reunite with your lost belongings.
              </p>
            </div>
            <div className="flex justify-center gap-4">
              <Link
                className="inline-flex items-center justify-center rounded-md bg-white px-6 py-3 text-sm font-medium text-gray-950 shadow-sm transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                to="/lost"
              >
                Report a Lost Item
              </Link>
              <Link
                className="inline-flex items-center justify-center rounded-md border border-white px-6 py-3 text-sm font-medium text-white shadow-sm transition-colors hover:bg-white hover:text-gray-950 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
                to="/found"
              >
                Report a Found Item
              </Link>
            </div>
            <div className=" flex justify-center gap-4">
              <a href="#items" className="scroll-smooth">
                <div className="inline-flex p-2 bg-gray-950 items-center justify-center text-center rounded-[50%] cursor-pointer  text-white bg-white-0">
                  <FiChevronDown size={60} className="animate-bounce" />
                </div>
              </a>
            </div>
          </div>
        </div>
        <div className="flex-1">
          <section id="items" className="py-16 px-6">
            <div className="w- mx-auto space-y-8">
              <div>
                <h2 className=" absolute text-2xl font-bold mb-4 translate-x-[20vw]">
                  <Link to="/lostlist">
                    <span className="mr-4">Lost Items</span>{" "}
                    <FiChevronRight size={30} className="inline " />
                  </Link>
                </h2>
                <div className="pt-8 flex flex-row justify-center">
                <LostList limit="3"/>
                  
                  
                  {/* <Card>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <img
                          alt="Lost Item"
                          className="rounded-md"
                          height={80}
                          src="/placeholder.svg"
                          style={{
                            aspectRatio: "80/80",
                            objectFit: "cover",
                          }}
                          width={80}
                        />
                        <div>
                          <h3 className="text-lg font-medium">Black Wallet</h3>
                          <p className="text-gray-500">Reported 3 days ago</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" variant="outline">
                        Claim Item
                      </Button>
                    </CardFooter>
                  </Card> */}
                </div>
              </div>
              <div>
                <h2 className="absolute text-2xl font-bold translate-x-[20vw] ">
                  <Link to="/foundlist">
                    <span className="mr-4">Found Items</span>{" "}
                    <FiChevronRight size={30} className="inline " />
                  </Link>
                </h2>
                <div className="pt-8 flex flex-row justify-center">
                <FoundList  limit="3"/>
                  {/* <Card>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <img
                          alt="Found Item"
                          className="rounded-md"
                          height={80}
                          src="/placeholder.svg"
                          style={{
                            aspectRatio: "80/80",
                            objectFit: "cover",
                          }}
                          width={80}
                        />
                        <div>
                          <h3 className="text-lg font-medium">Red Umbrella</h3>
                          <p className="text-gray-500">Found 1 day ago</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" variant="outline">
                        Claim Item
                      </Button>
                    </CardFooter>
                  </Card> */}
                  {/* <Card>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <img
                          alt="Found Item"
                          className="rounded-md"
                          height={80}
                          src="/placeholder.svg"
                          style={{
                            aspectRatio: "80/80",
                            objectFit: "cover",
                          }}
                          width={80}
                        />
                        <div>
                          <h3 className="text-lg font-medium">Gold Bracelet</h3>
                          <p className="text-gray-500">Found 2 weeks ago</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" variant="outline">
                        Claim Item
                      </Button>
                    </CardFooter>
                  </Card> */}
                  {/* <Card>
                    <CardContent>
                      <div className="flex items-center gap-4">
                        <img
                          alt="Found Item"
                          className="rounded-md"
                          height={80}
                          src="/placeholder.svg"
                          style={{
                            aspectRatio: "80/80",
                            objectFit: "cover",
                          }}
                          width={80}
                        />
                        <div>
                          <h3 className="text-lg font-medium">Car Keys</h3>
                          <p className="text-gray-500">Found 5 days ago</p>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button size="sm" variant="outline">
                        Claim Item
                      </Button>
                    </CardFooter>
                  </Card> */}
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      {/* <Toaster position="top-center" reverseOrder={false} /> */}
    </>
  );
}

