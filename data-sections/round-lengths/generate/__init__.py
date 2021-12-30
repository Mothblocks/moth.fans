from plotly.subplots import make_subplots
import pandas as pd
import psycopg

NAME = "Round Lengths (in past 30 days)"
DESCRIPTION = "Round lengths over the past 30 days, per server. The red bar is 90 minutes, the designed around round time."

# TODO: This query takes in rulesets and threatlevel, but this is not available through the charts
def process_round(raw_round):
	return {
		"round": int(raw_round["round"]),
		"round_length": raw_round["roundlength"].total_seconds() // 60,
		"first_shuttle_call_time": raw_round["first_shuttle_call_time"].total_seconds() // 60,
		"hour": int(pd.Timestamp(raw_round["starttime"]).tz_convert("US/Pacific").strftime("%H")),
		"server": raw_round["server"],
	}

def generate(html_out, postgres, read_file, **kwargs):
	with postgres.cursor(row_factory = psycopg.rows.dict_row) as cursor:
		cursor.execute(read_file("get_rounds.sql"))

		rounds = pd.DataFrame(list(map(
			process_round,
			filter(
				lambda round: round["first_shuttle_call_time"] is not None,
				cursor.fetchall()
			)
		)))

	print(f"{len(rounds)} rounds acquired")

	rounds_by_server = rounds.groupby("server")
	fig = make_subplots(
		rows=len(rounds_by_server),
		cols=1,
		subplot_titles=list(rounds_by_server.groups.keys()),
	)

	for row, (server, rounds) in enumerate(rounds_by_server):
		print(f"{server}: {len(rounds)} rounds")

		for hour in rounds["hour"].unique():
			fig.add_box(
				x=rounds["hour"][rounds["hour"] == hour],
				y=rounds["round_length"][rounds["hour"] == hour],
				name=str(hour),
				showlegend=False,
				row=row + 1,
				col=1,
			)

		fig.add_hline(y = 90, line_color="#f00")

		fig.update_xaxes(tickmode="linear", title_text="Hour (PST)")
		fig.update_yaxes(title_text="Round Length (minutes)")

	fig.update_layout(height = len(rounds_by_server) * 500)

	fig.write_html(html_out, include_plotlyjs = True, full_html = False)
