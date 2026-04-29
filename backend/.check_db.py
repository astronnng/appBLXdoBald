import sqlite3
conn=sqlite3.connect('blx_banco.db')
cur=conn.cursor()
cur.execute("SELECT name, type, sql FROM sqlite_master WHERE type IN ('table','index')")
rows=cur.fetchall()
for name, typ, sql in rows:
    print(f"{typ}: {name}")
    # print(sql)
conn.close()