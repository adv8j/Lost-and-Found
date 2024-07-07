from typing import Union
from fastapi import FastAPI, File, UploadFile, Form
import firebase_admin.storage
import uvicorn
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.responses import JSONResponse
from typing import Optional
import firebase_admin
from firebase_admin import credentials
from dotenv import load_dotenv
import os
from firebase_admin import firestore
from firebase_admin import storage
import json
import requests


load_dotenv()

app = FastAPI()
# CORS settings
origins = ["http://localhost:5173", "http://127.0.0.1:5173"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


if not firebase_admin._apps:
    cred = credentials.Certificate(os.getenv("FIREBASE_CREDENTIALS"))
    firebase_admin.initialize_app(
        cred, {"storageBucket": "lostnfoundbackend.appspot.com"}
    )
# print("\n\n\n",os.getenv("FIREBASE_CREDENTIALS"))
db = firestore.client()
# bucket = storage.bucket()
# model = load_model("weights.hdsf5")


usrref = db.collection("lostnfound").document("lost").get()
# print(usrref.to_dict())


@app.post("/lost")
async def read_item(
    itemImage: Optional[UploadFile] = File(None),
    itemName: Optional[str] = Form(None),
    itemDescription: str = Form(...),
    itemLocation: Optional[str] = Form(None),
    contactInfo: Optional[str] = Form(None),
    email: str = Form(...),
):
    # return {"Tested":"ok"}
    usrref = db.collection("lostnfound").document("lost")
    doc_dict = usrref.get().to_dict()

    if email not in doc_dict:
        usrref.set({email: {"count": 1}}, merge=True)

    doc_dict = usrref.get().to_dict()
    count = doc_dict[email]["count"]

    payload = {
        "itemName": itemName,
        "itemDescription": itemDescription,
        "itemLocation": itemLocation,
        "contactInfo": contactInfo,
        "itemID": email + "/" + str(count),
    }

    usrref.set({email: {"count": count + 1, str(count): payload}}, merge=True)

    if itemImage:
        bucket = firebase_admin.storage.bucket()
        blob = bucket.blob(f"lost/{email}/{count}.jpg")
        blob.upload_from_file(itemImage.file)

    found_dic = db.collection("lostnfound").document("found").get().to_dict()
    desc_list = []
    item_id = []
    for usr in found_dic.values():
        # print("\n\n\n\n", usr)
        for i in range(1, usr["count"]):
            desc_list.append(usr.get(str(i)).get("itemDescription"))
            item_id.append(usr.get(str(i)).get("itemID"))
    
    # dandelion api
    url = "https://api.dandelion.eu/datatxt/sim/v1"
    token = os.getenv("API_TOKEN")

    similarity_list = []
    for item in desc_list:
        querystring = {"text1": itemDescription, "text2": item, "token": token}
        try:
            response = requests.get(url, params=querystring)
            response = response.json()
            try:
                similarity_list.append(response["similarity"])
            except:
                similarity_list.append(0)
        except:
            return {"results":"Dandelion API error"}
        # response = requests.get(url, params=querystring)
        # print(response.json())
        # similarity_list.append(response.json()["similarity"])

    sorted_ids = [x for _, x in sorted(zip(similarity_list, item_id), reverse=True)]
    print(sorted_ids)

    final_response = []
    for ids in sorted_ids[:10]:
        mailid = ids.split("/")[0]
        item_id = ids.split("/")[1]
        response = found_dic[mailid][item_id]
        final_response.append(response)
    print(final_response)
    # return {
    #     "tested":"ok"
    # }
    return json.dumps({"results":final_response})

@app.post("/found")
def read_item(
    itemImage: UploadFile = File(None),
    itemName: Optional[str] = Form(None),
    itemDescription: str = Form(...),
    itemLocation: Optional[str] = Form(None),
    contactInfo: Optional[str] = Form(None),
    email: str = Form(...),
):

    usrref = db.collection("lostnfound").document("found")
    doc_dict = usrref.get().to_dict()

    lost_dic = db.collection("lostnfound").document("lost").get().to_dict()
    # print("lost",lost_dic)
    # return {}
    desc_list = []
    item_id = []
    for usr in lost_dic.values():
        # print("\n\n\n\n", usr)
        for i in range(1, usr["count"]):
            desc_list.append(usr.get(str(i)).get("itemDescription"))
            item_id.append(usr.get(str(i)).get("itemID"))

    # print(desc_list)

    if email not in doc_dict:
        usrref.set({email: {"count": 1}}, merge=True)
    doc_dict = usrref.get().to_dict()

    count = doc_dict[email]["count"]

    payload = {
        "itemName": itemName,
        "itemDescription": itemDescription,
        "itemLocation": itemLocation,
        "contactInfo": contactInfo,
        "itemID": email + "/" + str(count),
    }
    # print("le\n\n\n\n\n", type(payload))

    usrref.set({email: {"count": count + 1, str(count): payload}}, merge=True)

    # if itemImage:
    bucket = firebase_admin.storage.bucket()
    blob = bucket.blob(f"found/{email}/{count}.jpg")
    blob.upload_from_file(itemImage.file)

    # dandelion api
    url = "https://api.dandelion.eu/datatxt/sim/v1"
    token = os.getenv("API_TOKEN")

    similarity_list = []
    for item in desc_list:
        querystring = {"text1": itemDescription, "text2": item, "token": token}
        print(querystring)
        try:
            response = requests.get(url, params=querystring)
            response = response.json()
            try:
                similarity_list.append(response["similarity"])
            except:
                similarity_list.append(0)
                
        except:
            return {"results":"Dandelion API error"}
        # print(response)

    sorted_ids = [x for _, x in sorted(zip(similarity_list, item_id), reverse=True)]
    print(sorted_ids)
    # print(lost_dic)
    final_response = []
    for ids in sorted_ids[:10]:
        mailid = ids.split("/")[0]
        item_id = ids.split("/")[1]
        response = lost_dic[mailid][item_id]
        final_response.append(response)

    print(final_response)
    return json.dumps({"results":final_response})


if __name__ == "__main__":
    uvicorn.run("main:app", host="localhost", port=8000, reload=True)
