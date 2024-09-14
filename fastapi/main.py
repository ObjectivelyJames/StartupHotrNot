import os
import random
import uuid
from uuid import UUID
import pymongo
from fastapi import FastAPI, Request, Form, Depends, HTTPException
from fastapi.templating import Jinja2Templates
from fastapi.responses import RedirectResponse
from pydantic import BaseModel, Field, EmailStr, AnyHttpUrl
from typing import List, Annotated, Optional
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

db = client.STARTUP_HOTRNOT

users = db.users
startups = db.startups


class UserProfile(BaseModel):
    _id: UUID = uuid.uuid4()
    name: str = Field(str, description="Name of the user",
                      examples=["Eton Mushy"],
                      min_length=6, max_length=50
                      )
    email: EmailStr = Field(EmailStr, description="Email of the user")
    profile_pic: AnyHttpUrl = Field(AnyHttpUrl, description="URL to profile picture")
    profile_bio: str = Field(str, description="Profile Bio")
    social_media: List[AnyHttpUrl] = Field([AnyHttpUrl], description="List of social media links")
    resume_link: AnyHttpUrl = Field(AnyHttpUrl, description="Link to resume")
    tags: List[str] = Field([str], description="List of tags")

    @property
    def id(self):
        return self._id


class UserCreateSchema(BaseModel):
    name: str = Field(str, description="Name of the user",
                      examples=["Eton Mushy"],
                      min_length=6, max_length=50
                      )
    email: EmailStr = Field(EmailStr, description="Email of the user")
    profile_pic: AnyHttpUrl = Field(AnyHttpUrl, description="URL to profile picture")
    profile_bio: str = Field(str, description="Profile Bio")
    social_media: List[AnyHttpUrl] = Field([AnyHttpUrl], description="List of social media links")
    resume_link: AnyHttpUrl = Field(AnyHttpUrl, description="Link to resume")
    password: str = Field(str, description="Password of the user",
                          min_length=6, max_length=18,
                          )


class UserProfileUpdateSchema(UserProfile):
    pass


class UserEntity(UserProfile):
    password: str = Field(str, description="Password of the user",
                          min_length=6, max_length=18,
                          )


class StartupProfileBase(BaseModel):
    name: str = Field(str, description="Name of the user",
                      examples=["Space Dex"],
                      min_length=6, max_length=50
                      )
    email: EmailStr = Field(EmailStr, description="Email of the user")
    logo: AnyHttpUrl = Field(AnyHttpUrl, description="URL to logo")
    startup_bio: str = Field(str, description="Startup Bio")
    social_media: List[AnyHttpUrl] = Field([AnyHttpUrl], description="List of social media links")
    website_link: AnyHttpUrl = Field(AnyHttpUrl, description="Link to Startup website")
    team: List[UUID] = Field([UUID], description="List of team members")
    funding: str = Field(str, description="Funding stage")
    industry: str = Field(str, description="Industry")
    location: str = Field(str, description="Location")
    tags: List[str] = Field([str], description="List of tags")


class StartupProfile(StartupProfileBase):
    _id: UUID = uuid.uuid4()  # Unique ID for the startup

    @property
    def id(self):
        return self._id


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
    return token.split("_")[1]


async def get_current_user(username: str = Depends(decode_token)) -> UserEntity:
    user = users.find_one({"email": username})
    if user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return UserEntity(**user)


async def get_current_startup(email: str = Depends(decode_token)) -> StartupEntity:
    startup = startups.find_one({"email": email})
    if startup is None:
        raise HTTPException(status_code=404, detail="Startup not found")
    return StartupEntity(**startup)


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
async def read_users_me(user: UserEntity = Depends(get_current_user)):
    user_profile = UserProfile(**user.model_dump())
    return user_profile


@app.get("/startup/me", response_model=StartupProfile)
async def read_startup_me(startup: StartupEntity = Depends(get_current_startup)):
    startup_profile = StartupProfile(**startup.model_dump())
    return startup_profile


@app.get("/user/{user_id}", response_model=UserProfile)
async def read_user(user_id: UUID):
    try:
        user_db = users.find_one({"_id": user_id})

        if user_db is None:
            raise HTTPException(status_code=404, detail="User not found")

        user = UserProfile(**user_db)
        return user
    except IndexError:
        return {"message": "User not found"}


@app.post("/user")
async def register_user(user: UserCreateSchema):
    user_in = UserEntity(**user.model_dump())
    users.insert_one(user_in)
    userDB = users.find_one({"_id": user_in.id})

    if userDB is None:
        raise HTTPException(status_code=400, detail="Unable to create user")
    return UserProfile(**userDB.model_dump())


@app.put("/user/profile")
async def update_user_profile(userProfile: UserProfileUpdateSchema,
                              user: UserEntity = Depends(get_current_user)):
    user.name = userProfile.name
    user.profile_pic = userProfile.profile_pic
    user.profile_bio = userProfile.profile_bio
    user.social_media = userProfile.social_media
    user.resume_link = userProfile.resume_link
    return UserProfile(**user.model_dump())


@app.get("/startup/{startup_id}")
async def read_startup(startup_id: UUID):
    try:
        startup = startups.find_one({"_id": startup_id})

        if startup is None:
            raise HTTPException(status_code=404, detail="Startup not found")

        return StartupEntity(**startup)
    except IndexError:
        return {"message": "Startup not found"}


@app.post("/startup")
async def register_startup(startup: StartupCreateSchema):
    startups.insert_one(startup)
    startup_db = startups.find_one({"email": startup.email})

    if startup_db is None:
        raise HTTPException(status_code=400, detail="Unable to create startup")

    return StartupProfile(**startup_db)


@app.put("/startup/profile")
async def update_startup_profile(startupProfile: StartupProfileBase,
                                 startup: StartupEntity = Depends(get_current_user)):

    if startupProfile.logo is not None:
        startup.logo = startupProfile.logo
    if startupProfile.startup_bio is not None:
        startup.startup_bio = startupProfile.startup_bio
    if startupProfile.social_media is not None:
        startup.social_media = startupProfile.social_media
    if startupProfile.team is not None:
        startup.team = startupProfile.team
    if startupProfile.website_link is not None:
        startup.website_link = startupProfile.website_link
    if startupProfile.funding is not None:
        startup.funding = startupProfile.funding
    if startupProfile.industry is not None:
        startup.industry = startupProfile.industry
    if startupProfile.location is not None:
        startup.location = startupProfile.location
    if startupProfile.tags is not None:
        startup.tags = startupProfile.tags
    return StartupProfile(**startup.model_dump())
