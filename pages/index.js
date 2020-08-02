import fetch from "node-fetch";
import binsData from "../src/bins";
import Bin from "../components/bin";
import React from "react";
import Footer from "../components/footer";
import moment from "moment"

const engAuthorityCodes = async () => {
  return await fetchCodes(
    "https://local-authority-eng.register.gov.uk/records.json?page-size=500"
  );
};

const welshAuthorityCodes = async () => {
  return await fetchCodes(
    "https://principal-local-authority.register.gov.uk/records.json?page-size=500"
  );
};

const scotAuthorityCodes = async () => {
  return await fetchCodes(
    "https://local-authority-sct.register.gov.uk/records.json?page-size=500"
  );
};

const niAuthorityCodes = async () => {
  return await fetchCodes(
    "https://local-authority-nir.register.gov.uk/records.json?page-size=500"
  );
};

const fetchCodes = async (url) => {
  let codes = {};

  try {
    const response = await fetch(url);
    const results = await response.json();
    for (var localAuthorityCode in results) {
      codes[localAuthorityCode] =
        results[localAuthorityCode]["item"][0]["name"];
    }
  } catch (e) {
    return null;
  }

  return codes;
};

export async function getStaticProps() {
  const eng = engAuthorityCodes();
  const wales = welshAuthorityCodes();
  const scot = scotAuthorityCodes();
  const ni = niAuthorityCodes();
  return {
    props: {
      engAuthorityCodes: await eng,
      welshAuthorityCodes: await wales,
      scotAuthorityCodes: await scot,
      niAuthorityCodes: await ni,
    },
  };
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.sortOldest = this.sortOldest.bind(this)
    this.sortLatest = this.sortLatest.bind(this)
    this.sortName = this.sortName.bind(this)
    this.sortColour = this.sortColour.bind(this)

    this.state = {
      bins: binsData.bins.map((bin) => {
        bin.councilName = bin.councilName || this.councilName(bin)
        return bin
      }),
      sortOptions: {
        latest: {
          name: "Latest",
          active: true,
          func: this.sortLatest,
        },
        oldest: {
          name: "Oldest",
          active: false,
          func: this.sortOldest
        },
        name: {
          name: "Name",
          active: false,
          func: this.sortName,
        },
        colour: {
          name: "Colour",
          active: false,
          func: this.sortColour,
        }
      }
    };
  }

  updateNav(newActive) {
    const options = this.state.sortOptions
    const newOptions = {}

    Object.keys(options).map((key) => {
      newOptions[key] = {
        ...options[key],
        active: key === newActive ? true : false,
      }
    })

    this.setState({ sortOptions: newOptions })
  }

  sortLatest(e) {
    e.preventDefault()
    const bins = this.state.bins

    this.setState({
      bins: bins.sort((a, b) => {
        const aDate = moment(a.collectionDate)
        const bDate = moment(b.collectionDate)

        if (aDate.isBefore(bDate)) return 1
        if (aDate.isAfter(bDate)) return -1
        return 0
      }),
    })

    this.updateNav("latest")
  }

  sortOldest(e) {
    e.preventDefault()
    const bins = this.state.bins

    console.log('clicked oldest')

    this.setState({
      bins: bins.sort((a, b) => {
        const aDate = moment(a.collectionDate)
        const bDate = moment(b.collectionDate)

        if (aDate.isAfter(bDate)) return 1
        if (aDate.isBefore(bDate)) return -1
        return 0
      }),
    })

    this.updateNav("oldest")
  }

  sortName(e) {
    e.preventDefault()
    const bins = this.state.bins

    this.setState({
      bins: bins.sort((a, b) => {
        if (a.councilName.toLowerCase() < b.councilName.toLowerCase()) return -1;
        if (a.councilName.toLowerCase() > b.councilName.toLowerCase()) return 1;
        return 0;
      }),
    })

    this.updateNav("name")
  }

  sortColour(e) {
    e.preventDefault()
    const bins = this.state.bins

    this.setState({
      bins: bins.sort((a, b) => {
        const aColour = parseInt(a.colour.substring(0, 3))
        const bColour = parseInt(b.colour.substring(0, 3))
        if (aColour < bColour) return -1;
        if (aColour > bColour) return 1;
        return 0;
      }),
    })

    this.updateNav("colour")
  }


  councilName(bin) {
    const { localAuthorityCountry, localAuthorityCode } = bin
    switch (localAuthorityCountry) {
      case "eng":
        return this.props.engAuthorityCodes[localAuthorityCode];
      case "sct":
        return this.props.scotAuthorityCodes[localAuthorityCode];
      case "wls":
        return this.props.welshAuthorityCodes[localAuthorityCode];
      case "ni":
        return this.props.niAuthorityCodes[localAuthorityCode];
      default:
        return "";
    }
  }

  render() {
    const { sortOptions } = this.state
    return (
      <React.Fragment>
        <div className="sort-bar">
          <ul>
            {Object.keys(sortOptions).map((option, index) => {
              const sortOption = sortOptions[option]
              return <li className="inline-block" key={index}>
                <a href="#" onClick={sortOption.func} className={`block px-3 py-1 border-transparent border-t-4 ${sortOption.active ? 'border-gray-800' : 'hover:border-gray-800'}`} >
                  {sortOption.name}
                </a>
              </li>
            })}
          </ul>
        </div>
        <section className="grid grid-cols-2 lg:grid-cols-4">
          {this.state.bins.map((bin, i) => {
            return <Bin
              key={i}
              {...bin}
            />;
          })}
        </section>
        <div className="pl-6 text-2xl">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}
