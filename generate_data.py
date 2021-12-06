import importlib
import json
import os
import psycopg
import pymysql
from datetime import datetime
from pathlib import Path

data = {}

SERVER_PORTS = {
	1337: "Sybil",
	1447: "Manuel",
	2337: "Bagil",
	3336: "Terry",
	6337: "Campbell",
}

private_config = os.path.join(Path.home(), ".moth-fans")

print("Connecting to Scrubby...")
with open(os.path.join(private_config, "postgres.txt"), "r") as postgres_details_file:
	postgres = psycopg.connect(postgres_details_file.read())

print("Connecting to tg DB...")
with open(os.path.join(private_config, "mysql.json"), "r") as mysql_details_file:
	mysql = pymysql.connect(
		**json.loads(mysql_details_file.read()),
		cursorclass=pymysql.cursors.DictCursor,
	)

for section_name in os.listdir("./data-sections"):
	print(f"Generating {section_name}...")

	out_path = os.path.join("./data-sections", section_name, "output.html")

	generator = importlib.import_module(f"data-sections.{section_name}.generate")
	generator.generate(
		out_path,
		mysql=mysql,
		postgres=postgres,
		get_server=lambda port: SERVER_PORTS[port] if port in SERVER_PORTS else f"Unknown: {port}",
		read_file=lambda path: open(os.path.join("./data-sections", section_name, path), "r").read(),
	)

	try:
		with open(out_path, "r") as file:
			data[section_name] = {
				"name": generator.NAME,
				"last_updated": str(datetime.now()),
				"output": file.read(),
			}
	except Exception as error:
		print(f"Error generating {section_name}: {error}")

json.dump(data, open("data.json", "w"))
