import React from 'react';
import Immutable from 'immutable';

import Style from './Style';
import theme from './theme';
import planets from './planets';

function rad (deg) {
  return (deg/180) * Math.PI;
}

let STYLE = Style.registerStyle({
  display: 'flex',
  stroke: theme.color,
  strokeLinecap: 'round',
});

let AXIS = Style.registerStyle({
});

let widestPlanet = planets.reduce((result, planet) => {
  return planet.get('diameter') > result.get('diameter') ? planet : result;
}, Immutable.fromJS({diameter: 0}));

console.log('Widest planet: ', widestPlanet.toJS());

let PlanetGraphic = React.createClass({
  getDefaultProps: function () {
    return {
      padding: 20,
      strokeWidth: 1,
      showAxes: false,
      longAxes: false,
      axesLength: 0.8,
      axesOverlayTransparency: 1,
      axesRotation: 0,
    };
  },

  render: function () {
    let {
      padding,
      axesLength,
      axesRotation,
      axesOverlayTransparency,
    } = this.props;
    padding = parseFloat(padding);

    let {
      strokeWidth,
    } = this.props.style;

    let height = Math.max(padding, axesLength);
    let circles = planets.filter((planet) => {
      return planet.get('number');
    }).map((planet) => {
      let radius = 40 * planet.get('diameter') / widestPlanet.get('diameter');
      
      height += padding + radius + strokeWidth/2;

      let axis = <polyline
        className={AXIS.className}
        style={{
          opacity: this.props.showAxes ? 1 : 0,
        }}
        markerEnd='url(#triangle)'
        points={`${0},${
          this.props.longAxes ? -radius - axesLength : 0
        } ${0},${radius + axesLength}`}
      />;

      let result = (
        <g key={planet.get('name')}
          transform={`translate(${50},${height}) rotate(${axesRotation + planet.get('axialTilt')})`}
          style={{
            fill: `rgba(255,255,255,${1-axesOverlayTransparency})`,
          }}
        >
          {axis}
          <circle
            r={radius}
          />
        </g>
      );

      height += radius + strokeWidth/2;
      return result;
    });

    height += Math.max(padding, axesLength);
    
    return (
      <svg viewBox={`0 0 100 ${height}`} className={STYLE.className} {...this.props}>
        {circles}
      </svg>
    );
  }
});

export default Style.component(PlanetGraphic);