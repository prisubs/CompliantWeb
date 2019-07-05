import dash
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, Output
import plotly.graph_objs as go
from flask import Flask
import pandas as pd

server = Flask(__name__)
app = dash.Dash(__name__, server=server)

aapldata = pd.read_csv("../data/6m-weekly/aapl-6m-weekly.csv")
features = aapldata.columns
aapltypes = aapldata.drop(['Start', 'End', 'JSON', 'corpus', 'vectorized'], axis=1)
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
				options=[{'label':i,'value':i} for i in aapltypes],
				value='aapl-type'
			)
		], style={'width': '40%'})
	]),
	html.Div([dcc.Graph(
		id='aapl-graphic',
		figure={
			'data': [go.Scatter(
				x=aapldata['Start'],
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
		id='aapl-stacked',
		figure={
			'data': [go.Bar(
				x=aapldata['Start'],
				y=aapldata['Open'],
				name='Open'
				),
				go.Bar(
                                x=aapldata['Start'],
                                y=aapldata['High'],
                                name='High'
                                ),
				go.Bar(
                                x=aapldata['Start'],
                                y=aapldata['Low'],
                                name='Low'
                                ),
				go.Bar(
                                x=aapldata['Start'],
                                y=aapldata['Close'],
                                name='Close'
                                ),
				go.Bar(
                                x=aapldata['Start'],
                                y=aapldata['Volume'],
                                name='Volume'
                                ),
				go.Bar(
                                x=aapldata['Start'],
                                y=aapldata['Start'],
                                name='Start'
                                ),
				go.Bar(
                                x=aapldata['Start'],
                                y=aapldata['End'],
                                name='End'
                                )
			],
			'layout': go.Layout(
				title ='aapl in the United States by Volume, 1997–2016',
				barmode='stack'
			)
		}
		)
	], style={'width':'50%', 'display':'inline-block'}),
	html.Div([dcc.Graph(
		id='aapl-boxplot',
		figure={
			'data': [go.Box(
			y=aapldata['Open'],
			name='Open'
			),
			go.Box(
                        y=aapldata['High'],
                        name='High'
                        ),
			go.Box(
                        y=aapldata['Low'],
                        name='Low'
                        ),
			go.Box(
                        y=aapldata['Close'],
                        name='Close'
                        ),
			go.Box(
                        y=aapldata['Volume'],
                        name='Volume'
                        ),
			go.Box(
                        y=aapldata['Start'],
                        name='Start'
                        ),
			go.Box(
                        y=aapldata['End'],
                        name='End'
                        )
			],
			'layout': go.Layout(
			title='aapl in the United States by Volume, 1997–2016'
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
	Output('aapl-graphic', 'figure'),
	[Input ('yaxis', 'value')])
def update_graphic(yaxis_aapl):
    if yaxis_aapl:
    	return {
    		'data': [go.Scatter(
    			x=aapldata['Start'],
    			y=aapldata[yaxis_aapl],
    			mode='lines+markers',
    			marker={
    				'size': 15,
    				'opacity': 0.5,
    				'line': {'width':0.5, 'color':'white'}
    			}
    		)],
    		'layout': go.Layout(
    			title='{} in the US by Volume, 1997-2016'.format(yaxis_aapl),
    			xaxis={'title': 'Start'},
    			yaxis={'title': yaxis_aapl},
    			hovermode='closest'
    		)
    	}
    else:
        return {}

if __name__ == '__main__':
    app.run_server(debug=True)
