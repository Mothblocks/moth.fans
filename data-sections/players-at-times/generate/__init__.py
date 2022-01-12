import plotly.express as px
import plotly.graph_objects as go
import pandas as pd
import psycopg

NAME = "Median player counts per hour"
DESCRIPTION = "Median player counts per hour, per server, within the past 30 days."

def generate(html_out, postgres, read_file, **kwargs):
	with postgres.cursor(row_factory = psycopg.rows.dict_row) as cursor:
		cursor.execute(read_file("get_players.sql"))

		rounds = pd.DataFrame(cursor.fetchall())

	print(f"{len(rounds)} rounds acquired")

	rounds_by_server = rounds.groupby(["hour", "server"]).median().reset_index()
	rounds_by_server["hour"] = rounds_by_server["hour"].apply(lambda hour: str(int(hour)))

	fig = px.line_polar(
		rounds_by_server,
		r = "players",
		theta = "hour",
		color = "server",
		line_close = True,
		labels = {"hour": "Hour (UTC)"},
		range_r = [0, 100],
	)

	fig.write_html(html_out, include_plotlyjs = True, full_html = False)
