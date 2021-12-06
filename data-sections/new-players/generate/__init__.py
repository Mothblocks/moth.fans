import pandas as pd
import plotly.graph_objects as go

NAME = "New Players"

def generate(html_out, mysql, get_server, read_file, **kwargs):
	with mysql.cursor() as cursor:
		cursor.execute(read_file("get_firstseens.sql"))
		first_seens = pd.DataFrame(cursor.fetchall())

	figure = go.Figure()

	first_seens_all = pd.Series(first_seens["date"]).value_counts().sort_index()

	figure.add_trace(go.Scatter(
		mode = "lines",
		x = first_seens_all.index,
		y = first_seens_all.values,
		name = "Total",
	))
	# figure.add_traces(list(px.line(first_seens_all).select_traces()))

	for port, data in first_seens.groupby("port"):
		server_name = get_server(port)
		if server_name.startswith("Unknown"):
			continue

		series = pd.Series(data["date"]).value_counts().sort_index()

		figure.add_trace(go.Scatter(
			mode = "lines",
			x = series.index,
			y = series.values,
			name = get_server(port),
		))

	figure.write_html(html_out, include_plotlyjs = True, full_html = False)
