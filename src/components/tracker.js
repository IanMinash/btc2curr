import React, { Component } from "react";
import { BounceLoader } from "react-spinners";
import _ from "lodash";

const axios = require("axios");
const apiEndpoint =
  "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD";
const config = {
  headers: {
    authorization:
      `Apikey ${process.env.REACT_APP_CRYPTO_COMPARE_KEY}`
  }
};

var ColorPctChange = (props) => {
    if (props.percentChange < 0) {
        return <p className=" my-0 red-change">{props.percentChange.toFixed(2)}%</p>;
    }
    return <p className="my-0 green-change">+{props.percentChange.toFixed(2)}%</p>;
}

export default class CurrencyTracker extends Component {
  constructor(props) {
    super(props);
    this.state = { currentData: null, previousData: null };
  }

  fetchData(component) {
    var state = component.state;
    axios
      .get(apiEndpoint, config)
      .then(response => {
        component.setState({
          previousData: state.currentData,
          currentData: response.data.RAW.BTC.USD
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    var fetchData = _.debounce(this.fetchData, 60000, {
      leading: true,
      trailing: false
    });

    fetchData(this);

    if (this.state.currentData) {
      return (
        <div className="tracker">
          <div className="flex x-center rate">
            <sup>$</sup>
            <p className="bold my-0">{this.state.currentData.PRICE}</p>
          </div>
          <hr className="my-1" />
          <div className="grid fifty-fifty">
            <div>
              <h5 className="my-0 bold">24HR CHANGE</h5>
              <ColorPctChange percentChange={this.state.currentData.CHANGEPCT24HOUR} />
            </div>
            <div>
              <div className="flex mb-1">
                <h5 className="my-0 bold">HIGH</h5>
                <div className="flex hi-lo">
                    <sup>$</sup>
                    <p className="my-0 bold">{this.state.currentData.HIGH24HOUR}</p>
                </div>
              </div>
              <div className="flex">
                <h5 className="my-0 bold">LOW</h5>
                <div className="flex hi-lo">
                    <sup>$</sup>
                    <p className="my-0 bold">{this.state.currentData.LOW24HOUR}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return (
      <div className="tracker flex xy-center">
        <BounceLoader color="#CECECE" />
      </div>
    );
  }
}
