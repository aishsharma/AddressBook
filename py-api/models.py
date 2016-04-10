# coding: utf-8
from sqlalchemy import Column, ForeignKey, Integer, String
from sqlalchemy.orm import relationship
from sqlalchemy.ext.declarative import declarative_base

__author__ = "Aishwarya Sharma"

Base = declarative_base()
metadata = Base.metadata


class Contact(Base):
    __tablename__ = 'contacts'

    id = Column(Integer, primary_key=True)
    user_id = Column(ForeignKey('users.id', ondelete='CASCADE'), nullable=False, index=True)
    firstname = Column(String(45))
    lastname = Column(String(45))
    company = Column(String(45))
    email = Column(String(45))
    phone_number = Column(String(45))
    address = Column(String(200))

    user = relationship('User')


class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(45), nullable=False, unique=True)
    password = Column(String(45, 'utf8_bin'), nullable=False)
    email = Column(String(100), nullable=False)

    def __init__(self, username, password, email):
        self.username = username
        self.password = password
        self.email = email
