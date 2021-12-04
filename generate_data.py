import importlib
import json
import os

data = {}

for section_name in os.listdir("./data-sections"):
	print(f"Generating {section_name}...")

	out_path = os.path.join("./data-sections", section_name, "output.html")

	generator = importlib.import_module(f"data-sections.{section_name}.generate")
	generator.generate(out_path)

	with open(out_path, "r") as file:
		data[section_name] = {
			"name": generator.NAME,
			"output": file.read(),
		}

json.dump(data, open("data.json", "w"))
