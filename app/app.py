from wtforms import Form, SelectField, SubmitField
from flask import Flask, render_template, request, Markup
import random
from bokeh.models import (HoverTool, FactorRange, Plot, LinearAxis, Grid,
                          Range1d)
from bokeh.models.glyphs import VBar
#from bokeh.plotting import figure
#from bokeh.plotting import Bar
from bokeh.embed import components
from bokeh.models.sources import ColumnDataSource
import pandas as pd
import dash
import dash_core_components as dcc
import dash_html_components as html
from dash.dependencies import Input, Output
import plotly.graph_objs as go
import numpy as np


server = Flask(__name__)
app = dash.Dash(__name__, server=server)

np.random.seed(101)
random_x = np.random.randint(1, 21, 20)
random_y = np.random.randint(1, 21, 20)
app.layout = html.Div(children=[
    html.H1('Hello World'),
    dcc.Dropdown(
        id='yaxis',
        options=[
            {'label': 'Random List 1', 'value': 'random_y1'},
            {'label': 'Random List 2', 'value': 'random_y2'}
        ]
    ),
    dcc.Graph(
        id='scatter',
        figure={
            'data': [
                go.Scatter(
                    x = random_x,
                    y = random_y,
                    mode = 'markers'
                )
            ],
            'layout': go.Layout(
                title = 'Here is My Scatter Plot',
                xaxis = {'title': 'Here is My X-Axis'},
                yaxis = {'title': 'Here is my Y-Axis'}
            )
        }
    )
])

#here is the callback
@app.callback(
    Output('scatter', 'figure'),
    [Input ('yaxis', 'value')])
def update_graphic(yaxis):
    return {
        'data': [go.Scatter(
            x=random_x,
            y=random_y[yaxis],
            mode='markers',
        )],
        'layout': go.Layout(
            title='Here is My Scatter Plot{}'.format(yaxis),
            xaxis={'title': 'Here is My X-Axis'},
            yaxis={'title': yaxis},
        )
    }


aapl_df = pd.read_csv("../data/6m-weekly/aapl-6m-weekly.csv", names=["Open", "High", "Low", "Close", "Adj Close", "Volume", "Start", "End", "JSON", "corpus", "vectorized", "sentiment", "sentiment_test"])
feature_names = aapl_df.columns[-2:].values.tolist()

class TickerQueryForm(Form):
    tickers = [("aapl", "AAPL"), ("amzn", "AMZN"),
			   ("crm", "CRM"), ("fb", "FB"),
			   ("nflx", "NFLX"), ("baba", "BABA"),
			   ("msft", "MSFT"), ("googl", "GOOGL"), ("wmt", "WMT")]
    ticker = SelectField(label='ticker', choices=tickers)
    submit = SubmitField('Submit!')
'''
@app.route('/', methods=['POST', 'GET'])
def my_form_post():
	form = TickerQueryForm(request.form)
	if request.method == 'POST':
		return render_template('result.html')
	elif request.method == 'GET':
		return render_template('form.html', form=form)



@app.route('/chart')
def chart():
    labels = ["January","February","March","April","May","June","July","August"]
    values = [10,9,8,7,6,4,7,8]
    return render_template('chart.html', values=values, labels=labels)
'''

'''
@app.route("/<int:bars_count>/")
def chart(bars_count):
    if bars_count <= 0:
        bars_count = 1

    data = {"days": [], "bugs": [], "costs": []}
    for i in range(1, bars_count + 1):
        data['days'].append(i)
        data['bugs'].append(random.randint(1,100))
        data['costs'].append(random.uniform(1.00, 1000.00))

    hover = create_hover_tool()
    plot = create_bar_chart(data, "Bugs found per day", "days",
                            "bugs", hover)
    script, div = components(plot)

    return render_template("chart.html", bars_count=bars_count,
                           the_div=div, the_script=script)

def create_hover_tool():
    """Generates the HTML for the Bokeh's hover data tool on our graph."""
    hover_html = """
      <div>
        <span class="hover-tooltip">$x</span>
      </div>
      <div>
        <span class="hover-tooltip">@bugs bugs</span>
      </div>
      <div>
        <span class="hover-tooltip">$@costs{0.00}</span>
      </div>
    """
    return HoverTool(tooltips=hover_html)

def create_bar_chart(data, title, x_name, y_name, hover_tool=None,
                     width=1200, height=300):
    """Creates a bar chart plot with the exact styling for the centcom
       dashboard. Pass in data as a dictionary, desired plot title,
       name of x axis, y axis and the hover tool HTML.
    """
    source = ColumnDataSource(data)
    xdr = FactorRange(factors=data[x_name])
    ydr = Range1d(start=0,end=max(data[y_name])*1.5)

    tools = []
    if hover_tool:
        tools = [hover_tool,]

    plot = figure(title=title, x_range=xdr, y_range=ydr, plot_width=width,
                  plot_height=height, h_symmetry=False, v_symmetry=False,
                  min_border=0, toolbar_location="above", tools=tools,
                  responsive=True, outline_line_color="#666666")

    glyph = VBar(x=x_name, top=y_name, bottom=0, width=.8,
                 fill_color="#e12127")
    plot.add_glyph(source, glyph)

    xaxis = LinearAxis()
    yaxis = LinearAxis()

    plot.add_layout(Grid(dimension=0, ticker=xaxis.ticker))
    plot.add_layout(Grid(dimension=1, ticker=yaxis.ticker))
    plot.toolbar.logo = None
    plot.min_border_top = 0
    plot.xgrid.grid_line_color = None
    plot.ygrid.grid_line_color = "#999999"
    plot.yaxis.axis_label = "Bugs found"
    plot.ygrid.grid_line_alpha = 0.1
    plot.xaxis.axis_label = "Days after app deployment"
    plot.xaxis.major_label_orientation = 1
    return plot

'''

if __name__ == "__main__":
	app.run_server()
