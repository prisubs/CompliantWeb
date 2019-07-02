import dash
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, Output
import plotly.graph_objs as go
from flask import Flask
import pandas as pd

server = Flask(__name__)
app = dash.Dash(__name__, server=server)

appldata = pd.read_csv('../data/6m-weekly/aapl-6m-weekly.csv')
features = appldata.columns
feature_to_use = appldata[:-1] #don't want the sentiment_test column

#add markdown text
markdown_text = """
Data used for this dashboard was taken from Yahoo Finance
"""

app.layout = html.Div([
	html.Div([
    #Here is the interactive component
		html.Div([
			dcc.Dropdown(
				id='yaxis',
				options=[{'label':i,'value':i} for i in feature_to_use],
				value='var-type'
			)
		], style={'width': '40%'})
	]),
	html.Div([dcc.Graph(
		id='appl-graphic',
		figure={
			'data': [go.Scatter(
				x=appldata['sentiment_test'],
				y=[0,0],
				mode='markers'
			)],
			'layout': go.Layout(
				title = 'Use the dropdown to display the chart ...',
				xaxis={'tickformat': 'd'}
			)
		}
		)
	], style={'width':'50%', 'display':'inline-block'}),
	html.Div([
		dcc.Markdown(children=markdown_text)
	])
], style={'padding':10})

#Here is the callback
@app.callback(
	Output('appl-graphic', 'figure'),
	[Input ('yaxis', 'value')])
def update_graphic(yaxis_aapl):
	return {
		'data': [go.Scatter(
			x=appldata['sentiment_test'],
			y=appldata[yaxis_aapl],
			mode='lines+markers',
			marker={
				'size': 15,
				'opacity': 0.5,
				'line': {'width':0.5, 'color':'white'}
			}
		)],
		'layout': go.Layout(
			title='{} in the US by Volume, 1997-2016'.format(yaxis_aapl),
			xaxis={'title': 'Sentiment'},
			yaxis={'title': yaxis_appl},
			hovermode='closest'
		)
	}

if __name__ == '__main__':
    app.run_server(debug=True)
