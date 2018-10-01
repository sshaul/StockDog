# A python script that saves portfolio values at the end of open market days.
import requests

base_url = "http://198.199.100.209:5005/api"
portfolio_url = base_url + "/portfolio"

# Gets the list of all portfolios in the StockDog system.
def get_portfolios():
    req = requests.get(portfolio_url)
    return req.json()

# Save the portfolio values by submitting them into the API.
def save_values(portfolios):
    # Check to see the market status
    if (not is_market_open()):
        return
    for portfolio in portfolios:
        print("Saving for portfolio ID: " + str(portfolio["id"]))
        req = requests.get(portfolio_url + "/" + str(portfolio["id"]) + "/value")
        value = req.json()["value"]
        print("Value of portfolio: " + str(value))

        # Call api to save value
        save_url = portfolio_url + "/" + str(portfolio["id"]) + "/history"
        requests.post(save_url, json = {"value": value})
        print("Saved")
        print("===============================================")

# Checks to see if the market is open
def is_market_open():
    req = requests.get("https://api.iextrading.com/1.0/deep/system-event")
    print(req.text);
    status = req.json()["systemEvent"]
    if (status == "R"):
        print("Market is in regular trading hours")
        print("")
        return True
    else:
        print("")
        print("Market is closed")
        return False

def main():
    portfolios = get_portfolios()
    save_values(portfolios)

if __name__ == "__main__":
    main()
