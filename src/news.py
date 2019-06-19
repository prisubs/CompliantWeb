from tiingo import TiingoClient

if __name__ == "__main__":
    config = {}
    config['session'] = True
    config['api_key'] = "68410637165451ba499a7ce1142e02e7da1ea0d7"
    client = TiingoClient(config)
    ticker_metadata = client.get_ticker_metadata("GOOGL")
    print(ticker_metadata)
