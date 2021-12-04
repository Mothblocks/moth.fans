import importlib
import json
import os
import psycopg
from datetime import datetime
from pathlib import Path

data = {}

private_config = os.path.join(Path.home(), ".moth-fans")

print("Connecting to Scrubby...")
postgres_details = ""
with open(os.path.join(private_config, "postgres.txt"), "r") as postgres_details_file:
	postgres_details = postgres_details_file.read()
postgres = psycopg.connect(postgres_details)

for section_name in os.listdir("./data-sections"):
	print(f"Generating {section_name}...")

	out_path = os.path.join("./data-sections", section_name, "output.html")

	generator = importlib.import_module(f"data-sections.{section_name}.generate")
	generator.generate(out_path, postgres=postgres)

	with open(out_path, "r") as file:
		data[section_name] = {
			"name": generator.NAME,
			"last_updated": str(datetime.now()),
			"output": file.read(),
		}

json.dump(data, open("data.json", "w"))
