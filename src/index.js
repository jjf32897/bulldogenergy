import React from 'react';
import ReactDOM from 'react-dom';
import GoogleMapReact from 'google-map-react';
import axios from 'axios';
import './index.css';

class Circle extends React.Component {
  render() {
    return (
      <div className="circle tooltip" style={{height: this.props.diameter, width: this.props.diameter, background: this.props.color, border: "1px solid " + this.props.borderColor}}>
        <span className="tooltiptext">{this.props.text}</span>
      </div>
    );
  }
}

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleCapChange = this.handleCapChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
  }

  handleDateChange(event) {
    this.props.onDateChange(parseInt(event.target.value));
  }

  handleCapChange(event) {
    this.props.onCapChange(parseInt(event.target.value));
  }

  handleFilterChange(event) {
    this.props.onFilterChange(parseInt(event.target.value));
  }

  render() {
    return (
      <div className="options">
        <h1>Yenergi</h1>
        <div>
          Explore energy consumption at Yale University. Use the following filters to visualize data across many different dimensions.
        </div>
        <h3>Options:</h3>
        <div className="date">
          <div>{this.props.currDate.month} {this.props.currDate.year}</div>
          <input type="range" min={0} max={181} defaultValue={181} onChange={this.handleDateChange} list="steplist"/>
          <datalist id="steplist">
            <option>0</option>
            <option>60</option>
            <option>120</option>
            <option>180</option>
          </datalist>
        </div>
        <div className="temp">
          Avg. temp (F): {this.props.temp}
        </div>
        <div className="cap">
          <div>Max energy usage to display:</div>
          <input type="radio" name="energy-cap" value={100000} checked={this.props.cap === 100000} onChange={this.handleCapChange} disabled={this.props.displayFilter === 2} />100,000<br/>
          <input type="radio" name="energy-cap" value={10000} checked={this.props.cap === 10000} onChange={this.handleCapChange} disabled={this.props.displayFilter === 2} />10,000<br/>
          <input type="radio" name="energy-cap" value={1000} checked={this.props.cap === 1000} onChange={this.handleCapChange} disabled={this.props.displayFilter === 2} />1,000<br/>
          <input type="radio" name="energy-cap" value={100} checked={this.props.cap === 100} onChange={this.handleCapChange} disabled={this.props.displayFilter === 2} />100<br/>
          <input type="radio" name="energy-cap" value={10} checked={this.props.cap === 10} onChange={this.handleCapChange} disabled={this.props.displayFilter === 2} />10<br/>
          <input type="radio" name="energy-cap" value={99999999} checked={this.props.cap === 99999999} onChange={this.handleCapChange} disabled={this.props.displayFilter === 2} />No cap
        </div><br/>
        <div className="studets-or-energy">
          <input type="radio" name="display-filter" value={0} checked={this.props.displayFilter === 0} onChange={this.handleFilterChange} />All buildings<br/>
          <input type="radio" name="display-filter" value={1} checked={this.props.displayFilter === 1} onChange={this.handleFilterChange} />Only colleges<br/><br/>
          <div>Display number of students per dormitory:</div>
          <input type="radio" name="display-filter" value={2} checked={this.props.displayFilter === 2} onChange={this.handleFilterChange} />Students<br/>
        </div>
      </div>
    );
  }
}

class Map extends React.Component {
  render() {
    return (
      <div style={{ height: '92vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyAfvrqHTxlg8C0nxideXF6wQS6ZhKTAEKc' }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          draggable={true}
          onChange={this.props.onChange}
        >
        {this.props.circles}
        </GoogleMapReact>
      </div>
    );
  }
}

class App extends React.Component {
  static defaultProps = {
    center: {
      lat: 41.3089,
      lng: 287.0696,
    },
    zoom: 14.5,
    initMonth: 6,
    initYear: 2002,
  };

  constructor(props) {
    super(props);
    this.state = {
      buildings: [],
      colleges: [],
      students: [],
      temps: [],
      index: 180,
      cap: 99999999,
      nlat: 41.3187,
      slat: 41.2991,
      displayFilter: 0,
    };
    // get building usage data
    axios.get("http://yenergi-app-heroku.herokuapp.com/energyovertime")
      .then(res => {
        this.setState({
          buildings: res.data,
        });
      });
    // get weather data
    axios.get("http://yenergi-app-heroku.herokuapp.com/weather")
      .then(res => {
        this.setState({
          temps: res.data,
        });
      });
    // get energy for only residential colleges
    axios.get("http://yenergi-app-heroku.herokuapp.com/rcenergy")
      .then(res => {
        this.setState({
          colleges: res.data,
        });
      });
    // get number of students in each res college
    axios.get("http://yenergi-app-heroku.herokuapp.com/students")
      .then(res => {
        this.setState({
          students: res.data,
        });
      });
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleCapChange = this.handleCapChange.bind(this);
    this.handleFilterChange = this.handleFilterChange.bind(this);
    this.handleZoomChange = this.handleZoomChange.bind(this);
  }
 
  normalize(usage) {
    // return 25;
    if (usage < 3) {
      usage = 3;
    }
    return Math.log(usage) * 0.125 / (this.state.nlat - this.state.slat);
  }

  getTemp() {
    if (this.state.temps.length > 0 && this.state.temps[this.state.index]) {
      return this.state.temps[this.state.index];
    }
    return "Unavailable";
  }

  getDate() {
    const months = [
        'January', 'February', 'March', 'April', 'May',
        'June', 'July', 'August', 'September',
        'October', 'November', 'December'
      ];
    return {
      month: months[(this.props.initMonth + this.state.index) % 12],
      year: this.props.initYear + Math.floor((this.props.initMonth + this.state.index) / 12)
    };
  }

  // returns the circles for this specific date
  getUsage() {
    if (this.state.displayFilter === 2) {    // get just student counts
      return this.state.students.map((bldg) => {
        return (
            <Circle key={parseInt(bldg.id)} lat={bldg.lat} lng={bldg.lng} text={bldg.description} diameter={bldg.count * (0.001 / (this.state.nlat - this.state.slat))} color={"rgba(0, 255, 0, 0.25)"} borderColor={"green"} />
          );
      });
    } else if (this.state.displayFilter === 1) {   // get only college data
      return this.state.colleges.map((bldg) => {
        return (
            <Circle key={bldg.id} lat={bldg.lat} lng={bldg.lng} text={bldg.description} diameter={this.normalize(bldg.usage[this.state.index])} color={"rgba(0, 0, 255, 0.25)"} borderColor={"blue"} />
          );
      });
    } else {    // get all buildings
      const buildings = this.state.buildings.filter((bldg) => {
          return bldg.usage[this.state.index] < this.state.cap;
        });

      return buildings.map((bldg) => {
        return (
            <Circle key={bldg.id} lat={bldg.lat} lng={bldg.lng} text={bldg.description} diameter={this.normalize(bldg.usage[this.state.index])} color={"rgba(255, 0, 0, 0.25)"} borderColor={"red"} />
          );
      });
    }
  }

  // handles date change from form
  handleDateChange(index) {
    if (index !== this.state.index) {
      this.setState({
        index: index,
      });
    }
  }

  // handle change in energy cap
  handleCapChange(cap) {
    if (cap !== this.state.cap) {
      this.setState({
        cap: cap,
      });
    }
  }

  // handle filter change
  handleFilterChange(newFilter) {
    if (newFilter !== this.state.displayFilter) {
      this.setState({
        displayFilter: newFilter,
      })
    }
  }

  handleZoomChange(event) {
    if (this.state && (event.bounds.ne.lat !== this.state.nlat || event.bounds.se.lat !== this.state.slat)) {
      this.setState({
        nlat: event.bounds.ne.lat,
        slat: event.bounds.se.lat,
      });
    }
  }

  render() {
    return (
      <div className="container">
        <Form onDateChange={this.handleDateChange} onCapChange={this.handleCapChange} onFilterChange={this.handleFilterChange} cap={this.state.cap} currDate={this.getDate()} temp={this.getTemp()} displayFilter={this.state.displayFilter} />
        <div className="map">
          <Map center={this.props.center} zoom={this.props.zoom} circles={this.getUsage()} onChange={this.handleZoomChange}/>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
