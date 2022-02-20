import json
import pandas as pd
import plotly.express as px
from datetime import date, timedelta

NAME = "Borg Models"
DESCRIPTION = "Borg models picked per week"

BORG_MODELS = {
	"Clown",
	"Default",
	"Engineering",
	"Janitor",
	"Medical",
	"Miner",
	"Peacekeeper",
	"Service",
	"Syndicate Assault",
	"Syndicate Medical",
	"Syndicate Saboteur",
}

seen_bad_models = set()

def combine_models(model_jsons):
	combined_models = {}

	for model_json in model_jsons:
		for model, counter in json.loads(model_json).items():
			if model in BORG_MODELS:
				combined_models[model] = combined_models.get(model, 0) + counter
			elif model not in seen_bad_models:
				# This is not an error, just a ton of stupid shit like "The Sticky Peacekeeper"
				print(f"Unknown borg model {model}")

				seen_bad_models.add(model)

	return pd.DataFrame(combined_models, index = [0])

def display_week(weeks):
	today = date.today()
	return f"{(today - timedelta(weeks = weeks + 1))} - {(today - timedelta(weeks = weeks))}"

def generate(html_out, mysql, read_file, **kwargs):
	with mysql.cursor() as cursor:
		cursor.execute(read_file("get_models_per_week.sql"))
		model_jsons_per_week = pd.DataFrame(cursor.fetchall())

	model_jsons_per_week["week"] = model_jsons_per_week["week"].apply(display_week)
	models_per_week = model_jsons_per_week.groupby("week").models.apply(combine_models).stack().reset_index(name = "count").drop(columns = "level_1").rename(columns = {"level_2": "model"})

	fig = px.line(models_per_week, x = "week", y = "count", color = "model")
	fig.write_html(html_out, include_plotlyjs = True, full_html = False)
