from io import StringIO
import pandas as pd
import plotly.express as px

NAME = "Nukes 'n' Flukes"
DESCRIPTION = "Win rates of nuke ops, with and without war, per server, in 30 day buckets"

STATION_NUKED_RESULTS = {
	"win - syndicate nuke",
	"halfwin - syndicate nuke - did not evacuate in time",
}

def format_month_annotation(annotation):
	month = int(annotation.text[len("months_ago="):])
	annotation.update(
		text = f"{month * 30}-{(month + 1) * 30} days ago",
		textangle = 0,
	)

def generate(html_out, mysql, read_file, get_server, **kwargs):
	with mysql.cursor() as cursor:
		cursor.execute(read_file("get_results.sql"))
		data = pd.DataFrame(cursor.fetchall())

	data["server"] = data["server"].apply(get_server)
	data["declared_war"] = data["declared_war"].apply(lambda declared_war: "War" if declared_war else "No War")
	data["nuked"] = data["nuked"].apply(lambda nuked: "Win" if nuked else "Loss")

	results_by_server = data.groupby("server")

	out = StringIO()

	for index, (server, results) in enumerate(results_by_server):
		fig = px.bar(
			results,
			x = "count",
			y = "declared_war",
			color = "nuked",
			facet_row = "months_ago",
			orientation = "h",
			title = server,
			labels = {
				"count": "Rounds",
				"declared_war": "Declared War",
				"nuked": "Win",
			},
			height = 500,
		)

		fig.for_each_annotation(format_month_annotation)
		fig.update_layout(
			legend = { "x": 1.1 },
		)

		fig.update_yaxes(
			title = { "text": "" }
		)

		fig.write_html(out, include_plotlyjs = index == 0, full_html = False)

	with open(html_out, "w") as html_file:
		html_file.write(out.getvalue())
