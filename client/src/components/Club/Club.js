import React from 'react';
import Races from './Races';
import { connect } from 'react-redux';
import { getRaces } from '../../actions/product';
import { selectRaces } from '../../selectors/product';
import { withNamespaces } from 'react-i18next';
import RacesMap from './RacesMap';

const Club = ({ getRaces, selectRaces, t, races }) => {
  React.useEffect(() => {
    getRaces();
  }, [getRaces]);

  return (
    <div className="container">
      <h1 className="text-center mt-2 mb-3 page-title">{t('About')}</h1>
      <div>
        <p>
          Membrii columbofili participă la concursuri în asociaţia proprie sau
          dacă sunt primiţi de conducerea altei asociaţii la concursurile
          acesteia. Rezultatele obţinute de aceştia vor fi centralizate în
          cadrul Asociaţiei cu care au concurat în anul respectiv (coduri ale
          judetului respectiv) la toate categoriile de zbor. Membrii columbofili
          trebuie să participe pe acelaşi plan de zbor la următoarele categorii
          de concursuri: Viteza – Demifond (sau Mare Demifond), Fond (sau Mare
          Fond) respectiv Maraton. Aceştia trebuie să ţină cont de faptul ca
          schimbarea Asociaţiei de la o categorie de concursuri la alta atrage
          participarea sub mai multe coduri de judeţ si automat pierderea unor
          categorii. Din punct de vedere al tipului, concursurile se împart în
          următoarele tipuri:
        </p>
        <p>
          <strong>Viteză 100 – 300 km</strong> distanţe până în 300 km
        </p>
        <p>
          <strong>Viteză + Demifond 300 – 400 km</strong> distanţe între 300 şi
          400 km
        </p>
        <p>
          <strong>Demifond 400 – 600 km </strong>distanţe între 400 şi 600 km
        </p>
        <p>
          <strong>Demifond + Fond </strong>distanţe între 500 şi 600 km
        </p>
        <p>
          <strong>Fond </strong>distanţe peste 600 km
        </p>
        <p>
          <strong>Maraton </strong>distanţe peste 800 km
        </p>
      </div>
      <div>
        <h3 className="text-center mt-4 page-title">{t('Races')}</h3>
      </div>
      <div className="d-flex flex-wrap mt-4">
        <Races races={races} />
      </div>
      <div>
        <h3 className="text-center mt-4 page-title">
          {t('See number of races in each county')}
        </h3>
      </div>
      <div>
        <RacesMap races={races} />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({ races: selectRaces(state) });

const mapDispatchToProps = (dispatch) => ({
  getRaces: () => dispatch(getRaces()),
});

export default withNamespaces()(
  connect(mapStateToProps, mapDispatchToProps)(Club)
);
