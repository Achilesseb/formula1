import constructorsView from './Views/constructorsView';
import {
  DRIVERS_URL,
  STANDINGS_URL,
  CIRCUITS_URL,
  CONSTRUCTORS_URL,
  RESULTS_URL,
  RES_PER_PAGE,
} from './config';
import { moreDataCircuits, moreDataConstructors } from './data';
export const state = {
  driversData: {
    drivers: [],
    standings: [],
  },
  constructorData: {},
  constructorsSlides: [],
  circuitData: { data: [], resultsPerPage: RES_PER_PAGE },
};
export const getDrivers = async function () {
  const driversFetch = await fetch(DRIVERS_URL);
  const standingsFetch = await fetch(STANDINGS_URL);

  Promise.all([driversFetch, standingsFetch])
    .then(responses => {
      return Promise.all(responses.map(response => response.json()));
    })
    .then(datas => {
      state.driversData.standings =
        datas[1].MRData.StandingsTable.StandingsLists[0].DriverStandings;
      state.driversData.drivers = datas[0].MRData.DriverTable.Drivers;
    });
};
getDrivers();
export const getStandingsData = async function (data) {
  console.log(data);
  const standingData = await data.standings.map(standing => {
    const { name: teamName } = standing.Constructors[0];
    const { points, position, wins } = standing;
    const { driverId, permanentNumber, nationality, givenName, familyName } =
      standing.Driver;
    return {
      points: points,
      position: position,
      wins: wins,
      id: driverId,
      number: permanentNumber,
      nation: nationality,
      family: familyName,
      name: givenName,
      team: teamName,
    };
  });
  return standingData;
};

export const getConstructors = async function () {
  const constructorFetch = await fetch(CONSTRUCTORS_URL);
  const response = await constructorFetch.json();
  state.constructorData = response.MRData.ConstructorTable.Constructors;
};

export const getConstructorsData = async function (data) {
  try {
    console.log(data);
    const constructorData = await data.map(constructor => {
      const { constructorId, name, nationality } = constructor;
      const index = moreDataConstructors.find(
        element => element.constructorsId === constructorId
      );
      const { base, teamChief, chassis, powerUnit } = index;
      return {
        id: constructorId,
        name: name,
        nationality: nationality,
        base: base,
        teamChief: teamChief,
        chassis: chassis,
        powerUnit: powerUnit,
      };
    });
    return constructorData;
  } catch (err) {
    console.error(err.message);
  }
};

export const getCircuits = async function () {
  const circuitFetch = await fetch(CIRCUITS_URL);
  const response = await circuitFetch.json();
  const circuits = response.MRData.CircuitTable.Circuits;
  console.log(circuits);
  state.circuitData.page = 1;

  return circuits;
};

export const getCircuitPage = function (page = state.circuitData.page) {
  const totalPages = Math.ceil(
    state.circuitData.data.length / state.circuitData.resultsPerPage
  );
  state.circuitData.numberOfPages = totalPages;
  state.circuitData.page = page;
  const start = (page - 1) * state.circuitData.resultsPerPage;
  const end = page * state.circuitData.resultsPerPage;
  return state.circuitData.data.slice(start, end);
};

// export const getNewWindowCircuitData = function () {
//   state.circuitData.push(moreDataCircuits);
// };
// getNewWindowCircuitData();
