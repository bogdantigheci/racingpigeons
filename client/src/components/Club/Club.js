import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import RacesReports from './RacesReports';

class Club extends Component {
  render() {
    return (
      <div className="container">
        <h1 className="text-center mt-2 mb-3">About</h1>
        <div>
          <p>
            "Sed ut perspiciatis unde omnis iste natus error sit voluptatem
            accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
            quae ab illo inventore veritatis et quasi architecto beatae vitae
            dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit
            aspernatur aut odit aut fugit, sed quia consequuntur magni dolores
            eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est,
            qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit,
            sed quia non numquam eius modi tempora incidunt ut labore et dolore
            magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis
            nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut
            aliquid ex ea commodi consequatur? Quis autem vel eum iure
            reprehenderit qui in ea voluptate velit esse quam nihil molestiae
            consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla
            pariatur?"
          </p>
        </div>
        <div>
          <h3 className="text-center mt-4">Races and Reports</h3>
        </div>
        <div className="d-flex flex-wrap mt-4">
          <RacesReports />
          <RacesReports />
          <RacesReports />
          <RacesReports />
          <RacesReports />
          <RacesReports />
          <RacesReports />
        </div>
      </div>
    );
  }
}

export default Club;
