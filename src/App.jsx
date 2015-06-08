import React from 'react';
import Immutable from 'immutable';

import Style from './Style';
import theme from './theme';
import PlanetGraphic from './PlanetGraphic';

let WRAPPER = Style.registerStyle({
  width: '100vmin',
  height: '100vmin',
  padding: '10vmin',
  margin: 'auto',
});

let STYLE = Style.registerStyle({
  display: 'flex',
  fontFamily: theme.fontFamily,
  color: theme.color,
  backgroundColor: theme.bgColor,
  width: '100%',
  height: '100%',
});

let LABEL = Style.registerStyle({
  textAlign: 'center',
  fontSize: '3.8vmin',
  textTransform: 'lowercase',
});

let EDITOR = Style.registerStyle({
  width: '50%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

let RANGE = Style.registerStyle({
  height: '7vmin',
  padding: '0 5vmin',
  outline: 'none',
  WebkitAppearance: 'none',
  width: '100%',
  marginBottom: '1vmin',

  '&::WebkitSliderThumb': {
    WebkitAppearance: 'none',
    border: `0.3vmin solid ${theme.color}`,
    backgroundColor: 'white',
    width: '2vmin',
    height: '2vmin',
    borderRadius: '2vmin',
    transform: 'translateY(-0.9vmin)',
  },

  '&::WebkitSliderRunnableTrack': {
    width: '100%',
    height: '0.25vmin',
    backgroundColor: theme.color,
    borderRadius: '0.15vmin',
  },
});

let App = React.createClass({
  getInitialState: function () {
    return {
      strokeWidth: 1,
      planetPadding: 20,
    };
  },
  render: function () {
    return (
      <div className={WRAPPER.className}>
        <div className={STYLE.className}>
          <div className={EDITOR.className}>
            <div className={LABEL.className}>
              stroke width
            </div>
            <input type='range' className={RANGE.className}
              min={0.1}
              max={6.0}
              step={0.01}
              value={this.state.strokeWidth}
              onChange={(e) => {
                this.setState({
                  strokeWidth: parseFloat(e.target.value),
                });
              }}
            />

            <div className={LABEL.className}>
              planet padding
            </div>
            <input type='range' className={RANGE.className}
              min={0}
              max={60}
              step={0.01}
              value={this.state.planetPadding}
              onChange={(e) => {
                this.setState({
                  planetPadding: parseFloat(e.target.value),
                });
              }}
            />
          </div>

          <PlanetGraphic style={{
            width: `50%`,
            height: '100%',
            strokeWidth: this.state.strokeWidth,
          }}
            padding={this.state.planetPadding}
          />
        </div>

        <Style.Element />
      </div>
    );
  }
});

export default Style.component(App);