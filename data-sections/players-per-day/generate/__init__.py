import pandas as pd
import plotly.express as px

NAME = "Player counts per day"
DESCRIPTION = "Number of unique ckeys per day, per server, within the last 150 days"

def generate(html_out, mysql, get_server, read_file, server_discrete_color_map, **kwargs):
	with mysql.cursor() as cursor:
		cursor.execute(read_file("get_players.sql"))
		players = pd.DataFrame(cursor.fetchall())

	players["server"] = players["server_port"].apply(get_server)
	fig = px.line(players, x = "date", y = "count", color = "server", color_discrete_map = server_discrete_color_map)
	fig.write_html(html_out, include_plotlyjs = True, full_html = False)
