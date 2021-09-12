import React, { useState, useContext } from 'react';
import FilterSubRegion from './FilterSubRegion';
import subRegionData from '../../data/subregions';
import { RiArrowDownSLine } from 'react-icons/ri';
import { CSSTransition } from 'react-transition-group';
import { AppContext } from '../../context/app-context';

const FilterRegion = ({ region, idx }) => {
  const [filterState, dispatch] = useContext(AppContext);

  const toggleSubRegionsMenu = (region) => {
    dispatch({ type: 'TOGGLE-SUB-REGIONS-MENU', payload: region });
  };

  const toggleRegionCheck = (idx) => {
    dispatch({ type: 'TOGGLE-REGION-CHECK', payload: idx });
  };

  const [fuck, setFuck] = useState(true);

  return (
    <div className="option">
      <div className="top-layer">
        <input
          type="checkbox"
          id={region}
          checked={filterState.regions[region].selected}
          onChange={() => toggleRegionCheck(region)}
        />
        <label className="capitalize" htmlFor={region}>
          {region}
        </label>
        <RiArrowDownSLine
          className="dropdown"
          onClick={() => toggleSubRegionsMenu(region)}
          // onClick={() => setFuck((prevState) => !prevState)}
        />
      </div>
      {/* <div
        className={`bottom-layer ${
          filterState.regions[region].expanded ? 'sub-open' : undefined
        }`}
      > */}
      <CSSTransition
        in={filterState.regions[region].expanded}
        // in={fuck}
        classNames="fade"
        timeout={0}
      >
        <div className="bottom-layer">
          {Object.values(subRegionData)[idx].map((subregion) => {
            return (
              <FilterSubRegion
                // filterState={filterState}
                // dispatch={dispatch}
                region={region}
                name={subregion.name}
                initials={subregion.initials}
                key={subregion.initials}
              />
            );
          })}
        </div>
      </CSSTransition>
      {/* </div> */}
    </div>
  );
};

export default FilterRegion;
