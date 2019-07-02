import dash
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, Output
import plotly.graph_objs as go
from flask import Flask
import pandas as pd

server = Flask(__name__)
app = dash.Dash(__name__, server=server)

crimedata = pd.read_csv("../data/6m-weekly/aapl-6m-weekly.csv")
features = crimedata.columns
crimetypes = features[:-1] #don't want the sentiment_test column

#add markdown text
markdown_text = """
Data used for this dashboard was taken from the US Department of Justice website which can be accessed [here.](https://ucr.fbi.gov/crime-in-the-u.s/2016/crime-in-the-u.s.-2016/topic-pages/tables/table-1)
"""

app.layout = html.Div([
	html.Div([
    #Here is the interactive component
		html.Div([
			dcc.Dropdown(
				id='yaxis',
				options=[{'label':i,'value':i} for i in crimetypes],
				value='crime-type'
			)
		], style={'width': '40%'})
	]),
	html.Div([dcc.Graph(
		id='crime-graphic',
		figure={
			'data': [go.Scatter(
				x=crimedata['sentiment_test'],
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
	html.Div([dcc.Graph(
		id='crime-stacked',
		figure={
			'data': [go.Bar(
				x=crimedata['sentiment_test'],
				y=crimedata['Open'],
				name='Open'
				),
				go.Bar(
                                x=crimedata['sentiment_test'],
                                y=crimedata['High'],
                                name='High'
                                ),
				go.Bar(
                                x=crimedata['sentiment_test'],
                                y=crimedata['Low'],
                                name='Low'
                                ),
				go.Bar(
                                x=crimedata['sentiment_test'],
                                y=crimedata['Close'],
                                name='Close'
                                ),
				go.Bar(
                                x=crimedata['sentiment_test'],
                                y=crimedata['Volume'],
                                name='Volume'
                                ),
				go.Bar(
                                x=crimedata['sentiment_test'],
                                y=crimedata['Start'],
                                name='Start'
                                ),
				go.Bar(
                                x=crimedata['sentiment_test'],
                                y=crimedata['End'],
                                name='End'
                                )
			],
			'layout': go.Layout(
				title ='Crime in the United States by Volume, 1997–2016',
				barmode='stack'
			)
		}
		)
	], style={'width':'50%', 'display':'inline-block'}),
	html.Div([dcc.Graph(
		id='crime-boxplot',
		figure={
			'data': [go.Box(
			y=crimedata['Open'],
			name='Open'
			),
			go.Box(
                        y=crimedata['High'],
                        name='High'
                        ),
			go.Box(
                        y=crimedata['Low'],
                        name='Low'
                        ),
			go.Box(
                        y=crimedata['Close'],
                        name='Close'
                        ),
			go.Box(
                        y=crimedata['Volume'],
                        name='Volume'
                        ),
			go.Box(
                        y=crimedata['Start'],
                        name='Start'
                        ),
			go.Box(
                        y=crimedata['End'],
                        name='End'
                        )
			],
			'layout': go.Layout(
			title='Crime in the United States by Volume, 1997–2016'
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
	Output('crime-graphic', 'figure'),
	[Input ('yaxis', 'value')])
def update_graphic(yaxis_crime):
	return {
		'data': [go.Scatter(
			x=crimedata['sentiment_test'],
			y=crimedata[yaxis_crime],
			mode='lines+markers',
			marker={
				'size': 15,
				'opacity': 0.5,
				'line': {'width':0.5, 'color':'white'}
			}
		)],
		'layout': go.Layout(
			title='{} in the US by Volume, 1997-2016'.format(yaxis_crime),
			xaxis={'title': 'sentiment_test'},
			yaxis={'title': yaxis_crime},
			hovermode='closest'
		)
	}


if __name__ == '__main__':
    app.run_server(debug=True)
