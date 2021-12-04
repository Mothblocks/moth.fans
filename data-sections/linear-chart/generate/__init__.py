import plotly.express as px

NAME = "Linear Chart"

def generate(html_out):
	fig = px.scatter(x=range(10), y=range(10))
	fig.write_html(html_out, include_plotlyjs = "cdn", full_html = False)
