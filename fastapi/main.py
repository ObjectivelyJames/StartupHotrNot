import os
import random
from uuid import UUID
import pymongo
from fastapi import FastAPI, Request, Form, Depends, HTTPException
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse
from pydantic import BaseModel, Field, EmailStr, BeforeValidator
from typing import List, Annotated, Optional, Dict
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.security import OAuth2PasswordBearer
from pymongo import MongoClient

app = FastAPI(description="Startup HotrNot - by 9Volt Studios")

MONGODB_URI = os.environ.get('MONGODB_URI', 'mongodb://localhost:27017')

print(MONGODB_URI)
oauth_schema2 = OAuth2PasswordBearer(tokenUrl="/token")
client: MongoClient = pymongo.MongoClient(MONGODB_URI)

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)

# List all the databases in the cluster:
for db_info in client.list_database_names():
    print(db_info)

# Create a new database called "STARTUP_HOTRNOT"
db = client.STARTUP_HOTRNOT

users = db.users
startups = db.startups
tags = db.tags

# users.insert_one({"email": "test@one.com"})
# users.find_one_and_update({"email": "test@one.com"}, {"$set": {"name": "Eton Mushy"}})
# hel = users.find_one({"email": "test@one.com"})
# print(hel)

PyObjectId = Annotated[str, BeforeValidator(str)]


class UserProfile(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field(str, description="Name of the user",
                      examples=["Eton Mushy"],
                      min_length=6, max_length=50
                      )
    email: EmailStr = Field(description="Email of the user")
    profile_pic: str | None = Field(default="", description="URL to profile picture")
    profile_bio: str | None = Field(default="", description="Profile Bio")
    social_media: List[str] | None = Field(default=[], description="List of social media links")
    resume_link: str | None = Field(default="", description="Link to resume")
    tags: List[str] = Field(default=[], description="List of tags")
    followed_startups: List[str] | None = Field(default=[], description="List of followed startups")
    # @property
    # def id(self):
    #     return self._id


class UserCreateSchema(BaseModel):
    name: str = Field(str, description="Name of the user",
                      examples=["Eton Mushy"],
                      min_length=6, max_length=50
                      )
    email: EmailStr = Field(EmailStr, description="Email of the user")
    profile_pic: str = Field(str, description="URL to profile picture")
    profile_bio: str = Field(str, description="Profile Bio")
    social_media: List[str] = Field([str], description="List of social media links")
    resume_link: str = Field(str, description="Link to resume")
    password: str = Field(str, description="Password of the user",
                          min_length=6, max_length=18,
                          )
    tags: List[str] = Field(default=[], description="List of tags")


class UserProfileUpdateSchema(BaseModel):
    name: str = Field(str, description="Name of the user",
                      examples=["Eton Mushy"],
                      min_length=6, max_length=50
                      )
    profile_pic: str | None = Field(str, description="URL to profile picture")
    profile_bio: str | None = Field(str, description="Profile Bio")
    social_media: List[str] = Field([], description="List of social media links")
    resume_link: str = Field(str, description="Link to resume")
    password: str = Field(str, description="Password of the user",
                          min_length=6, max_length=18,
                          )
    tags: List[str] = Field(default=[], description="List of tags")


class UserEntity(UserProfile):
    password: str = Field(str, description="Password of the user",
                          min_length=6, max_length=18,
                          )


class StartupProfileBase(BaseModel):
    id: Optional[PyObjectId] = Field(alias="_id", default=None)
    name: str = Field(str, description="Name of the user",
                      examples=["Space Dex"],
                      min_length=6, max_length=50
                      )
    email: EmailStr = Field(EmailStr, description="Email of the user")
    logo: str = Field(str, description="URL to logo")
    startup_bio: str = Field(str, description="Startup Bio")
    social_media: List[str] = Field([str], description="List of social media links")
    website_link: str = Field(str, description="Link to Startup website")
    team: List[str] = Field([str], description="List of team members")
    funding: str = Field(str, description="Funding stage")
    industry: str = Field(str, description="Industry")
    location: str = Field(str, description="Location")
    tags: List[str] = Field([str], description="List of tags")
    followed_users: List[str] | None = Field(default=[], description="List of followed users")


class StartupProfile(StartupProfileBase):
    # _id: UUID = uuid.uuid4()  # Unique ID for the startup
    pass
    # @property
    # def id(self):
    #     return self._id


class StartupCreateSchema(StartupProfileBase):
    password: str = Field(str, description="Password of the user",
                          min_length=6, max_length=18,
                          )


class StartupEntity(StartupProfile):
    password: str = Field(str, description="Password of the user",
                          min_length=6, max_length=18,
                          )


# users: list[UserEntity] = []
# startups: list[StartupEntity] = []


async def decode_token(token: str = Depends(oauth_schema2)):
    return token.split("_")[2]


async def get_current_user(username: str = Depends(decode_token)) -> Dict:
    user = users.find_one({"email": username})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return user


async def get_current_startup(email: str = Depends(decode_token)) -> Dict:
    startup = startups.find_one({"email": email})
    if startup is None:
        raise HTTPException(status_code=404, detail="Startup not found")
    return startup


@app.get("/")
async def read_root():
    return {
        "message":
            "Welcome to HotrNot - the platform for startups to find the best talent and for talent to find the "
            "best startups",
        "API Docs": "/docs for API docs"
    }


@app.get("/echo")
async def hello_world(name: Optional[str]):
    return {"echo": name}


@app.post("/token")
async def get_a_token(login_form: Annotated[OAuth2PasswordRequestForm, Depends()]):
    return {"access_token": str(random.randint(100000, 999999)) + "_HOTATTEST_" + login_form.username,
            "refresh_token": str(random.randint(100000, 999999)) + "_HOTREFRESH_" + login_form.username, }


@app.get("/user/me", response_model=UserProfile)
async def read_users_me(user: Dict = Depends(get_current_user)):
    user_profile = UserProfile(**user)
    return user_profile


@app.get("/startup/me", response_model=StartupProfile)
async def read_startup_me(startup: Dict = Depends(get_current_startup)):
    startup_profile = StartupProfile(**startup)
    return startup_profile


@app.get("/user/{user_email}", response_model=UserProfile)
async def read_user(user_email: str):
    user_db = users.find_one({"email": user_email})

    if user_db is None:
        raise HTTPException(status_code=404, detail="User not found")

    user = UserProfile(**user_db)
    return user


@app.post("/user")
async def register_user(user: UserCreateSchema):
    data: Dict = user.model_dump()

    users.insert_one(data)
    userDB = users.find_one({"email": data["email"]})

    if userDB is None:
        raise HTTPException(status_code=400, detail="Unable to create user")

    await insert_tags(userDB["tags"])
    return UserProfile(**userDB)


@app.put("/user/profile")
async def update_user_profile(userProfile: UserProfileUpdateSchema,
                              user: Dict = Depends(get_current_user)):
    updateSet = {}
    if userProfile.name is not None:
        if user.get("name", "") != userProfile.name:
            updateSet["name"] = userProfile.name
    if userProfile.profile_pic is not None:
        if user.get("profile_pic", "") != userProfile.profile_pic:
            updateSet["profile_pic"] = userProfile.profile_pic
    if userProfile.profile_bio is not None:
        if user.get("profile_bio", "") != userProfile.profile_bio:
            updateSet["profile_bio"] = userProfile.profile_bio
    if userProfile.social_media is not None:
        if user.get("social_media", []) != userProfile.social_media:
            updateSet["social_media"] = userProfile.social_media
    if userProfile.resume_link is not None:
        if user.get("resume_link", "") != userProfile.resume_link:
            updateSet["resume_link"] = userProfile.resume_link
    if userProfile.tags is not None:
        if user.get("tags", []) != userProfile.tags:
            updateSet["tags"] = userProfile.tags
            are_tags_updated = await insert_tags(userProfile.tags)
    if userProfile.password is not None:
        if user.get("password", "") != userProfile.password:
            updateSet["password"] = userProfile.password

    done = users.update_one({"_id": user["_id"]}, {"$set": updateSet})

    return UserProfile(**user)


@app.get("/startup/{startup_id}")
async def read_startup(startup_id: UUID):
    try:
        startup = startups.find_one({"email": startup_id})

        if startup is None:
            raise HTTPException(status_code=404, detail="Startup not found")

        return StartupEntity(**startup)
    except IndexError:
        return {"message": "Startup not found"}


@app.post("/startup")
async def register_startup(startup: StartupCreateSchema):
    startup_db = startups.find_one({"email": startup.email})

    if startup_db is not None:
        raise HTTPException(status_code=400, detail="Startup already exists")

    startups.insert_one(startup.model_dump())
    startup_db = startups.find_one({"email": startup.email})

    if startup_db is None:
        raise HTTPException(status_code=400, detail="Unable to create startup")

    await insert_tags(startup_db["tags"])

    return StartupProfile(**startup_db)


@app.put("/startup/profile")
async def update_startup_profile(startupProfile: StartupProfileBase,
                                 startup: Dict = Depends(get_current_startup)):
    updateSet = {}
    if startupProfile.name is not None:
        if startup["name"] != startupProfile.name:
            updateSet["name"] = startupProfile.name
    if startupProfile.logo is not None:
        if startup["logo"] != startupProfile.logo:
            updateSet["logo"] = startupProfile.logo
    if startupProfile.startup_bio is not None:
        if startup["startup_bio"] != startupProfile.startup_bio:
            updateSet["startup_bio"] = startupProfile.startup_bio
    if startupProfile.social_media is not None:
        if startup["social_media"] != startupProfile.social_media:
            updateSet["social_media"] = startupProfile.social_media
    if startupProfile.team is not None:
        if startup["team"] != startupProfile.team:
            updateSet["team"] = startupProfile.team
    if startupProfile.website_link is not None:
        if startup["website_link"] != startupProfile.website_link:
            updateSet["website_link"] = startupProfile.website_link
    if startupProfile.funding is not None:
        if startup["funding"] != startupProfile.funding:
            updateSet["funding"] = startupProfile.funding
    if startupProfile.industry is not None:
        if startup["industry"] != startupProfile.industry:
            updateSet["industry"] = startupProfile.industry
    if startupProfile.location is not None:
        if startup["location"] != startupProfile.location:
            updateSet["location"] = startupProfile.location
    if startupProfile.tags is not None:
        if startup["tags"] != startupProfile.tags:
            updateSet["tags"] = startupProfile.tags
            are_tags_updated = await insert_tags(startupProfile.tags)
    done = startups.update_one({"_id": startup["_id"]}, {"$set": updateSet})
    startup_db = startups.find_one({"_id": startup["_id"]})

    if startup_db is None:
        raise HTTPException(status_code=400, detail="Unable to update startup")
    return StartupProfile(**startup_db)


@app.get("/tags", description="Get all tags")
async def get_tags():
    return tags.find({})


@app.get("/tags/{tag}", description="Get a tag by name")
async def get_tag(tag: str):
    return tags.find_one({"tag": tag})


@app.post("/tags", description="Create a new tag")
async def create_tag(tag: str, user: Dict = Depends(get_current_user)):
    if user.get("email", "") == "":
        raise HTTPException(status_code=401, detail="Unauthorized")
    tags.insert_one({"tag": tag})
    return tags.find_one({"tag": tag})


@app.post("/explore/users", description="Get all users that follows a startup")
async def get_users_following_startup(startup_email: str, skip: int = 0, limit: int = 10):
    startup = startups.find_one({"email": startup_email})
    if startup is None:
        raise HTTPException(status_code=404, detail="Startup not found")
    return users.find({"followed_startups": startup_email}).skip(skip).limit(limit)


@app.post("/exlore/startups", description="Get all startups")
async def get_startups_by_tags(tags: List[str], skip: int = 0, limit: int = 10,
                               user: Dict = Depends(get_current_user)):
    return startups.find({"tags": {"$in": tags}}).skip(skip).limit(limit)


@app.post("/follow/startup", description="Follow a startup")
async def follow_startup(startup_email: str, user: Dict = Depends(get_current_user)):
    startup = startups.find_one({"email": startup_email})
    if startup is None:
        raise HTTPException(status_code=404, detail="Startup not found")
    users.update_one({"_id": user["_id"]}, {"$addToSet": {"followed_startups": startup_email}})
    return {"message": "Followed startup"}


@app.post("/follow/user", description="Follow a user")
async def follow_user(user_email: str, startup: Dict = Depends(get_current_startup)):
    user = users.find_one({"email": user_email})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    startups.update_one({"_id": startup["_id"]}, {"$addToSet": {"followed_users": user_email}})
    return {"message": "Followed user"}


async def insert_tags(tag_inputs: List[str]):
    try:
        tags.bulk_write([
            pymongo.UpdateOne({"tag": tag}, {"$setOnInsert": {"tag": tag}}, upsert=True)
            for tag in tag_inputs
        ])
    except Exception as e:
        print(e)
        return False
