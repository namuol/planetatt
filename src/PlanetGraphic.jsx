import React from 'react';
import Immutable from 'immutable';

import Style from './Style';
import theme from './theme';
import planets from './planets';

let STYLE = Style.registerStyle({
  display: 'flex',
  // backgroundColor: '#edd8a3',
  fill: 'none',
  stroke: theme.color,
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
    };
  },
  render: function () {
    let {
      padding,
    } = this.props;

    let {
      strokeWidth
    } = this.props.style;

    let height = 0;
    let circles = planets.filter((planet) => {
      return planet.get('number');
    }).map((planet) => {
      let radius = 40 * planet.get('diameter') / widestPlanet.get('diameter');
      
      height += padding + radius + strokeWidth/2;

      let result = <circle
        key={planet.get('name')}
        cx={50}
        cy={height}
        r={radius}
      />;

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