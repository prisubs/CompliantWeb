from wtforms import Form, SelectField, SubmitField
from flask import Flask, render_template, request
import backend

app = Flask(__name__)

class TickerQueryForm(Form):
    tickers = [("aapl", "AAPL"), ("amzn", "AMZN"),
			   ("crm", "CRM"), ("fb", "FB"),
			   ("nflx", "NFLX"), ("baba", "BABA"),
			   ("msft", "MSFT"), ("googl", "GOOGL"), ("wmt", "WMT")]
    ticker = SelectField(label='ticker', choices=tickers)
    submit = SubmitField('Submit!')

@app.route('/', methods=['POST', 'GET'])
def my_form_post():
	form = TickerQueryForm(request.form)
	if request.method == 'POST':
		t = form.ticker.data
		return render_template('result.html', t="hello you selected {0}".format(t))
	elif request.method == 'GET':
		return render_template('form.html', form=form)


if __name__ == "__main__":
	app.run(debug=True)