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
    print(portfolios)
    for portfolio in portfolios:
        print("Saving for portfolio ID: " + str(portfolio["id"]))
        req = requests.get(portfolio_url + "/" + str(portfolio["id"]) + "/value")
#        print(req.text)
        value = req.json()["value"]
        print("Value of portfolio: " + str(value))

        # Call api to save value
        save_url = portfolio_url + "/" + str(portfolio["id"]) + "/history"
        print(save_url)
        requests.post(save_url, json = {"value": value})
        print("Saved")
        print("===============================================")


def main():
    portfolios = get_portfolios()
    save_values(portfolios)

if __name__ == "__main__":
    main()
