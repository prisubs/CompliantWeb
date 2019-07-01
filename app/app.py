from wtforms import Form, SelectField, SubmitField
from flask import Flask, render_template, request

app = Flask(__name__)

class TickerQueryForm(Form):
    tickers = ["AAPL", "AMZN", "CRM", "FB", "NFLX", "BABA", "MSFT", "GOOGL", "WMT"]
    ticker = SelectField(label='ticker', choices=tickers)
    submit = SubmitField('Submit!')

@app.route('/', methods=['POST', 'GET'])
def my_form_post():
	form = TickerQueryForm(request.form)
	if request.method == 'POST':
		return render_template('result.html')
	elif request.method == 'GET':
		return render_template('form.html', form=form)


if __name__ == "__main__":
	app.run(debug=True)