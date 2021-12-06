import pandas as pd
import plotly.express as px

NAME = "Retention"
DESCRIPTION = "How many players connected X days after their first play"

def generate(html_out, mysql, read_file, **kwargs):
	with mysql.cursor() as cursor:
		cursor.execute(read_file("retention.sql"))
		data = pd.DataFrame(cursor.fetchall())

	data["count"] = data["count"].apply(lambda count: count / data["count"][0] * 100)

	figure = px.line(
		data,
		x="days_since_first",
		y="count",
		labels={
			"days_since_first": "Days since first connection",
			"count": "% of players retained",
		},
	)

	figure.write_html(html_out, include_plotlyjs = True, full_html = False)
