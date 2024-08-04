from fastapi import FastAPI, Depends
from fastapi_users import FastAPIUsers
from starlette.middleware.cors import CORSMiddleware

from auth import auth_backend
from database import User
from manager import get_user_manager
from schemas import UserRead, UserCreate, UserUpdate

import psycopg2
from fastapi import HTTPException

from datetime import datetime

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

fastapi_users = FastAPIUsers[User, int](
    get_user_manager,
    [auth_backend],
)

current_active_user = fastapi_users.current_user(active=True)

app.include_router(
    fastapi_users.get_auth_router(auth_backend), prefix="/auth/jwt", tags=["auth"]
)

app.include_router(
    fastapi_users.get_register_router(UserRead, UserCreate),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_reset_password_router(),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_verify_router(UserRead),
    prefix="/auth",
    tags=["auth"],
)
app.include_router(
    fastapi_users.get_users_router(UserRead, UserUpdate),
    prefix="/users",
    tags=["users"],
)


@app.get("/profile", response_model=UserRead)
async def profile(user=Depends(current_active_user)):
    return user


@app.get("/products")
async def profile():
    conn = psycopg2.connect(dbname='test', user='postgres', password='root')
    cursor = conn.cursor()

    cursor.execute(f"SELECT * FROM product;")
    records = cursor.fetchall()

    cursor.close()
    conn.close()
    return records


@app.get("/product/{id_product}")
async def get_product(id_product: int):
    try:
        conn = psycopg2.connect(dbname='test', user='postgres', password='root')
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, descption, cost FROM product WHERE id = %s;", (id_product,))
        record = cursor.fetchone()
        cursor.close()
        conn.close()
        if record:
            return {"id": record[0], "name": record[1], "description": record[2], "price": record[3]}
        else:
            raise HTTPException(status_code=404, detail="Product not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/buy_product")
async def buy_product(id_product: int, user=Depends(current_active_user)):
    try:
        conn = psycopg2.connect(dbname='test', user='postgres', password='root')
        cursor = conn.cursor()

        cursor.execute(
            f"INSERT INTO public.purchase(date_p, id_product, id_user) VALUES ('{datetime.now()}', {id_product}, {user.id});")

        cursor.execute(f"SELECT product FROM public.product WHERE id = {id_product};")
        record = cursor.fetchone()

        if record:
            conn.commit()
            cursor.close()
            conn.close()
            return {"product": record[0]}
        else:
            cursor.close()
            conn.close()
            raise HTTPException(status_code=404, detail="Product not found")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/get_purchases")
async def get_purchases(user=Depends(current_active_user)):
    try:
        conn = psycopg2.connect(dbname='test', user='postgres', password='root')
        cursor = conn.cursor()

        cursor.execute(f"SELECT pur.id, date_p, category, cost, name, product FROM public.purchase pur"
                       f" INNER JOIN public.product p ON pur.id_product = p.id WHERE id_user = {user.id} ORDER BY id DESC;")
        records = cursor.fetchall()

        cursor.close()
        conn.close()
        return records

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/registration_seller")
async def registration_seller(first_name, last_name, email, password, passport):
    try:
        conn = psycopg2.connect(dbname='test', user='postgres', password='root')
        cursor = conn.cursor()

        cursor.execute(
            f"INSERT INTO public.seller(first_name, last_name, email, hashed_password, passport, date_registration) "
            f"VALUES ('{first_name}', '{last_name}', '{email}', crypt('{password}', gen_salt('md5')), '{passport}', '{datetime.now()}');")

        conn.commit()
        cursor.close()
        conn.close()

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/add_product")
async def add_product(email, hashed_password, category, cost, name, descption, product, limit='null'):
    try:
        conn = psycopg2.connect(dbname='test', user='postgres', password='root')
        cursor = conn.cursor()

        cursor.execute(
            f"SELECT id FROM seller WHERE email = '{email}'"
            f" AND hashed_password = crypt('{hashed_password}', hashed_password" + ');')
        id_seller = cursor.fetchone()

        if id_seller == None:
            raise HTTPException(status_code=404, detail='Такой продаыец не найден')
        else:

            cursor.execute(
                f" INSERT INTO public.product("
                f' id_seller, category, cost, name, descption, product, status, "limit")'
                f" VALUES ({id_seller[0]}, '{category}', '{cost}', '{name}', '{descption}', '{product}', true, {limit}" + ");")

            conn.commit()
            cursor.close()
            conn.close()

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/get_review/{id_product}")
async def get_product(id_product: int):
    try:
        conn = psycopg2.connect(dbname='test', user='postgres', password='root')
        cursor = conn.cursor()
        cursor.execute('SELECT r.id, name, first_name, last_name, grade, text FROM public.review r INNER JOIN purchase p ON p.id = r.id_purchase INNER JOIN product pr ON p.id_product = pr.id INNER JOIN "user" u ON u.id = p.id_user WHERE id_product = %s;', (id_product,))
        record = cursor.fetchall()
        cursor.close()
        conn.close()
        if record:
            return record
        else:
            raise HTTPException(status_code=404, detail="Product not found")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="localhost", port=8000, log_level="info")
