// from pydantic import BaseModel, ValidationError, validator
// from datetime import date
// from typing import Optional
// from typing_extensions import Literal

// class Artist(BaseModel):
//     name: str
//     age: int
//     record_company: Optional[str] = 'independent'

//     @validator('age')
//     def check_is_adult(cls, v):
//         if v < 18:
//             raise ValueError("artist age is invalid")
//         return v

// class Album(BaseModel):
//     release_date: date
//     title: str
//     artist: Artist
//     genre: Literal['Metal', 'Rock', 'Lame']