from models import Base, User, Contact
import json
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

__author__ = "Aishwarya Sharma"


# Returns a SqlAlchemy session object
def get_db_session():
    with open('config.json') as config_file:
        config = json.load(config_file.read())

    db_config = config["database"]

    conn_url = (db_config["url"] + db_config["user"] + ":" + db_config["password"] + "@" + db_config["host"] + ":" +
                db_config["port"] + "/" + db_config["db"])

    engine = create_engine(conn_url)
    Base.metadata.bind(engine)
    db_session = sessionmaker(bind=engine)

    return db_session()


# Adds a new user to the database.
# Returns True on success or False on failure
# @username: string
# @password: string
# @email: string
def create_new_user(username, password, email):
    new_user = User(username, password, email)

    session = get_db_session()

    try:
        session.add(new_user)
        session.commit()
        result = True
    except:
        session.rollback()
        result = False
    finally:
        session.close()

    return result
