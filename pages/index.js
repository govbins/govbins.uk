import data from "../src/bins";
import Bin from "../components/bin";
import RetroBin from "../components/retroBin";
import React from "react";
import Footer from "../components/footer";
import moment from "moment";
import binImage from "../utils/binImage";

export async function getStaticProps() {
  return {
    props: {
      bins: data.bins.map((bin) => binImage(bin)),
    },
  };
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);

    this.sortOldest = this.sortOldest.bind(this);
    this.sortLatest = this.sortLatest.bind(this);
    this.sortName = this.sortName.bind(this);
    this.sortColour = this.sortColour.bind(this);
    this.showRetro = this.showRetro.bind(this);

    this.state = {
      bins: props.bins,
      visibleBins: props.bins.filter((bin) => !bin.retro),
      sortOptions: {
        latest: {
          name: "Latest",
          active: true,
          func: this.sortLatest,
        },
        oldest: {
          name: "Oldest",
          active: false,
          func: this.sortOldest,
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
        },
        retro: {
          name: "Retro",
          active: false,
          func: this.showRetro,
        },
      },
    };
  }

  updateNav(newActive) {
    const options = this.state.sortOptions;
    const newOptions = {};

    Object.keys(options).map((key) => {
      newOptions[key] = {
        ...options[key],
        active: key === newActive ? true : false,
      };
    });

    this.setState({ sortOptions: newOptions });
  }

  sortLatest(e) {
    e.preventDefault();
    const bins = this.state.bins;

    this.setState({
      visibleBins: bins
        .filter((bin) => !bin.retro)
        .sort((a, b) => {
          const aDate = moment(a.collectionDate);
          const bDate = moment(b.collectionDate);

          if (aDate.isBefore(bDate)) return 1;
          if (aDate.isAfter(bDate)) return -1;
          return 0;
        }),
    });

    this.updateNav("latest");
  }

  sortOldest(e) {
    e.preventDefault();
    const bins = this.state.bins;

    this.setState({
      visibleBins: bins
        .filter((bin) => !bin.retro)
        .sort((a, b) => {
          const aDate = moment(a.collectionDate);
          const bDate = moment(b.collectionDate);

          if (aDate.isAfter(bDate)) return 1;
          if (aDate.isBefore(bDate)) return -1;
          return 0;
        }),
    });

    this.updateNav("oldest");
  }

  sortName(e) {
    e.preventDefault();
    const bins = this.state.bins;

    this.setState({
      visibleBins: bins
        .filter((bin) => !bin.retro)
        .sort((a, b) => {
          if (a.councilName.toLowerCase() < b.councilName.toLowerCase())
            return -1;
          if (a.councilName.toLowerCase() > b.councilName.toLowerCase())
            return 1;
          return 0;
        }),
    });

    this.updateNav("name");
  }

  showRetro(e) {
    e.preventDefault();
    const bins = this.state.bins;

    this.setState({
      visibleBins: bins.filter((bin) => bin.retro),
    });

    this.updateNav("retro");
  }

  sortColour(e) {
    e.preventDefault();
    const bins = this.state.bins;

    this.setState({
      visibleBins: bins
        .filter((bin) => !bin.retro)
        .sort((a, b) => {
          const aColour = parseInt(a.colour.substring(0, 3));
          const bColour = parseInt(b.colour.substring(0, 3));
          if (aColour < bColour) return -1;
          if (aColour > bColour) return 1;
          return 0;
        }),
    });

    this.updateNav("colour");
  }

  render() {
    const { sortOptions } = this.state;
    return (
      <React.Fragment>
        <ul className="sort-bar overflow-x-scroll whitespace-nowrap">
          {Object.keys(sortOptions).map((option, index) => {
            const sortOption = sortOptions[option];
            return (
              <li className="inline-block" key={index}>
                <a
                  href="#"
                  className={`block px-3 py-1 border-transparent border-t-4 ${
                    sortOption.active
                      ? "border-gray-800"
                      : "hover:border-gray-800"
                  }`}
                  onClick={sortOption.func}
                >
                  {sortOption.name}
                </a>
              </li>
            );
          })}
        </ul>
        <section className="grid grid-cols-2 lg:grid-cols-4">
          {this.state.visibleBins.map((bin, i) => {
            return bin.retro ? (
              <RetroBin key={i} {...bin} />
            ) : (
              <Bin key={i} {...bin} />
            );
          })}
        </section>
        <div className="pl-6 text-2xl">
          <Footer />
        </div>
      </React.Fragment>
    );
  }
}
