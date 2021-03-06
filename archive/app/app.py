from wtforms import Form, SelectField, SubmitField
from flask import Flask, render_template, request

app = Flask(_name_)

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
		return render_template('result.html')
	elif request.method == 'GET':
		return render_template('form.html', form=form)


if _name_ == "main":
	app.run(debug=True)
