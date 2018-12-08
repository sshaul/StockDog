import React, { Component } from 'react';
import Modal from 'react-responsive-modal';
import Select from 'react-select';
import Button from '../../Button/Button';
import './Transaction.css';

const tradeOptions = [
	{ value: 'buy', label: 'Buy' },
	{ value: 'sell', label: 'Sell' }
]


class Transaction extends Component {

	constructor(props) {
		super(props);

		this.state = {
			selectedOption: { value: 'buy', label: 'Buy' },
			buttonDisabled: true,
			amount: ""
		}
	}

	handleSelectChange = (selectedOption) => {
		this.setState({ selectedOption });
	}

	onChange = (event) => {
		var newState = this.state;

		// Strip all non-numeral characters
		var amount = event.target.value.replace(/[^0-9.]/g, "");
		// If 0, replace with empty
		amount = amount === "0" ? "" : amount;
		newState[event.target.id] = amount;

		// Check to enable Execute button
		if (amount !== "" && this.state.selectedOption.value === 'buy'
			&& this.props.price * amount <= this.props.buyingPower) {
			newState["buttonDisabled"] = false;
		}
		else if (amount !== "" && this.state.selectedOption.value === 'sell'
			&& amount <= this.props.amountOwned) {
			newState["buttonDisabled"] = false;
		}
		else {
			newState["buttonDisabled"] = true;
		}

		this.setState(newState);
	}

	render() {
		return (
			<div className="Transaction">
				<Modal open={this.props.isOpen} onClose={this.props.onClose}
					center
				>

					<div className="transaction-modal-content">
						<div className="transaction-info">
							<h1>
								${Math.round(this.props.price * this.state.amount * 100) / 100}
							</h1>
							<h2>Buying Power: ${this.props.buyingPower}</h2>
							<h2>Amount Owned: {this.props.amountOwned}</h2>
						</div>
						<div className="transaction-form">
							<form>
								<Select
									defaultValue={{ value: 'buy', label: 'Buy' }}
									className="transaction-type-select"
									value={this.state.selectedOption}
									onChange={this.handleSelectChange}
									options={tradeOptions}
									placeholder='Type'
									isSearchable={false}
								/>
								<input id="amount"
									type="text"
									placeholder='Amount'
									onChange={this.onChange}
									value={this.state.amount}
								/>
								<Button width={143} text="Execute"
									isDisabled={this.state.buttonDisabled}
								/>
							</form>
						</div>
					</div>

				</Modal>
			</div>
		);
	}
}

export default Transaction;