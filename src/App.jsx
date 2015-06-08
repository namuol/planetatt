import React from 'react';
import Immutable from 'immutable';

import Style from './Style';
import theme from './theme';
import PlanetGraphic from './PlanetGraphic';

import page from 'page';
import qs from 'qs';

let WRAPPER = Style.registerStyle({
  width: '100vmin',
  height: '100vmin',
  padding: '5vmin',
  margin: 'auto',
});

let STYLE = Style.registerStyle({
  display: 'flex',
  fontFamily: theme.fontFamily,
  color: theme.color,
  backgroundColor: theme.bgColor,
  width: '100%',
  height: '100%',
  textAlign: 'left',
});

let LABEL = Style.registerStyle({
  fontSize: '3.8vmin',
  textTransform: 'lowercase',
});

let EDITOR = Style.registerStyle({
  width: '30%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});

let RANGE = Style.registerStyle({
  height: '7vmin',
  // padding: '0 5vmin',
  outline: 'none',
  WebkitAppearance: 'none',
  width: '100%',
  marginBottom: '1vmin',
  cursor: 'pointer',
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
    height: '0.3vmin',
    border: `0.15vmin solid ${theme.color}`,
    backgroundColor: theme.color,
    borderRadius: '0.15vmin',
  },
});

let CHECKBOX = Style.registerStyle({
  margin: 0,
  width: '100%',
  height: '7vmin',
  outline: 'none',
  WebkitAppearance: 'none',
  marginBottom: '1vmin',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  // justifyContent: 'center',
  position: 'relative',

  '&:before': {
    content: '" "',
    fontFamily: theme.fontFamily,
    fontWeight: 600,
    fontSize: '2vmin',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    width: '8vmin',
    height: '4vmin',
    borderRadius: '6vmin',
    border: `0.3vmin solid ${theme.color}`,
    transition: 'background 250ms',
    margin: 'auto',
    top: 0,
    bottom: 0,
  },

  '&:after': {
    content: '""',
    display: 'block',
    width: '3vmin',
    height: '3vmin',
    borderRadius: '3vmin',
    border: `0.3vmin solid ${theme.color}`,
    margin: '0.5vmin',
    transition: 'transform 250ms',
    background: 'white',
    zIndex: 2,
  },

  '&:checked:after': {
    transform: `translateX(4vmin)`,
  },

  '&:checked:before': {
    background: `rgba(0,255,0,0.4)`,
  }

});

let App = React.createClass({
  getDefaultProps: function () {
    return {
      strokeWidth: 1,
      padding: 20,
      showAxes: false,
      longAxes: false,
      axesLength: 0.8,
      axesOverlayTransparency: 1,
      axesRotation: 0,
    };
  },
  
  getInitialState: function () {
    return Object.assign({}, this.props);
  },

  componentWillUpdate: function (nextProps, nextState) {
    page(`/?${qs.stringify(nextState)}`);
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
              spacing
            </div>
            <input type='range' className={RANGE.className}
              min={0}
              max={60}
              step={0.01}
              value={this.state.padding}
              onChange={(e) => {
                this.setState({
                  padding: parseFloat(e.target.value),
                });
              }}
            />

            <div className={LABEL.className}>
              axes
            </div>

            <input type='checkbox' className={CHECKBOX.className}
              checked={this.state.showAxes}
              onChange={(e) => {
                this.setState({
                  showAxes: e.target.checked,
                });
              }}
            />

            <div className={LABEL.className} style={{
              opacity: this.state.showAxes ? 1 : 0.5,
            }}>
              bipoles
            </div>

            <input type='checkbox' className={CHECKBOX.className}
              style={{
                opacity: this.state.showAxes ? 1 : 0.5,
              }}
              disabled={this.state.showAxes ? false : 'disabled'}
              checked={this.state.longAxes}
              onChange={(e) => {
                this.setState({
                  longAxes: e.target.checked,
                });
              }}
            />

            <div className={LABEL.className} style={{
              opacity: this.state.showAxes ? 1 : 0.5,
            }}>
              length
            </div>
            <input type='range' className={RANGE.className}
              style={{
                opacity: this.state.showAxes ? 1 : 0.5,
              }}
              disabled={this.state.showAxes ? false : 'disabled'}
              min={0}
              max={20}
              step={0.01}
              value={this.state.axesLength}
              onChange={(e) => {
                this.setState({
                  axesLength: parseFloat(e.target.value),
                });
              }}
            />

            <div className={LABEL.className} style={{
              opacity: this.state.showAxes ? 1 : 0.5,
            }}>
              rotation
            </div>
            <input type='range' className={RANGE.className}
              style={{
                opacity: this.state.showAxes ? 1 : 0.5,
              }}
              disabled={this.state.showAxes ? false : 'disabled'}
              min={0}
              max={360}
              step={0.01}
              value={this.state.axesRotation}
              onChange={(e) => {
                this.setState({
                  axesRotation: parseFloat(e.target.value),
                });
              }}
            />

            <div className={LABEL.className} style={{
              opacity: this.state.showAxes ? 1 : 0.5,
            }}>
              overlay
            </div>
            <input type='range' className={RANGE.className}
              style={{
                opacity: this.state.showAxes ? 1 : 0.5,
              }}
              disabled={this.state.showAxes ? false : 'disabled'}
              min={0}
              max={1}
              step={0.01}
              value={this.state.axesOverlayTransparency}
              onChange={(e) => {
                this.setState({
                  axesOverlayTransparency: parseFloat(e.target.value),
                });
              }}
            />

          </div>

          <PlanetGraphic style={{
            width: `70%`,
            height: '100%',
            strokeWidth: this.state.strokeWidth,
          }}
            {...this.state}
          />
        </div>

        <Style.Element />
      </div>
    );
  }
});

export default Style.component(App);