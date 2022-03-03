from io import StringIO
import pandas as pd
import plotly.express as px

NAME = "Player counts per day (from both this year and last year)"
DESCRIPTION = "Number of unique ckeys per day, per server, within the last 150 days. Also gives the same chart, but a year ago, for comparison."

def generate(html_out, mysql, get_server, read_file, server_discrete_color_map, **kwargs):
	with mysql.cursor() as cursor:
		cursor.execute(read_file("get_players.sql"))
		players = pd.DataFrame(cursor.fetchall())

		cursor.execute(read_file("get_players_from_long_ago.sql"))
		players_from_long_ago = pd.DataFrame(cursor.fetchall())

	players["server"] = players["server_port"].apply(get_server)
	players_from_long_ago["server"] = players_from_long_ago["server_port"].apply(get_server)

	out = StringIO()

	fig = px.line(
		players,
		x = "date",
		y = "count",
		color = "server",
		color_discrete_map = server_discrete_color_map,
		title = "Unique connections per day",
	)

	fig.write_html(out, include_plotlyjs = True, full_html = False)

	fig = px.line(
		players_from_long_ago,
		x = "date",
		y = "count",
		color = "server",
		color_discrete_map = server_discrete_color_map,
		title = "Unique connections per day (one year ago)",
	)

	fig.write_html(out, include_plotlyjs = False, full_html = False)

	with open(html_out, "w") as html_file:
		html_file.write(out.getvalue())
