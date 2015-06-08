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
      axesOverlayTransparency: 1,
      axesRotation: 0,
    };
  },
  render: function () {
    let {
      padding,
    } = this.props;
    padding = parseFloat(padding);

    let {
      strokeWidth
    } = this.props.style;

    let height = 0;
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
          this.props.longAxes ? -radius - padding*0.3 : 0
        } ${0},${radius+padding*0.3}`}
      />;

      let result = (
        <g key={planet.get('name')}
          transform={`translate(${50},${height}) rotate(${this.props.axesRotation + planet.get('axialTilt')})`}
          style={{
            fill: `rgba(255,255,255,${1-this.props.axesOverlayTransparency})`,
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

    height += padding;
    
    return (
      <svg viewBox={`0 0 100 ${height}`} className={STYLE.className} {...this.props}>
        {circles}
      </svg>
    );
  }
});

export default Style.component(PlanetGraphic);