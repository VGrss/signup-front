import React, { useContext, useEffect, useState } from 'react';
import { get, has, isEmpty } from 'lodash';
import { FormContext } from '../../../templates/Form';
import { ScrollablePanel } from '../../Scrollable';
import './index.css';
import { UserContext } from '../../UserContext';
import { findModifiedFields } from '../../../../lib';

export const DemarcheSectionReadOnly = ({ title }) => {
  const { enrollment, demarches } = useContext(FormContext);
  const { demarche: selectedDemarcheId } = enrollment;
  const {
    user: { roles },
  } = useContext(UserContext);

  const [modifiedFields, setModifiedFields] = useState([]);

  useEffect(() => {
    if (
      demarches[selectedDemarcheId] &&
      demarches[selectedDemarcheId].state &&
      enrollment
    ) {
      setModifiedFields(
        findModifiedFields(
          get(demarches, selectedDemarcheId, {}).state,
          enrollment
        )
      );
    }
  }, [enrollment, selectedDemarcheId, demarches]);

  const hasSelectedDemarche =
    has(demarches, selectedDemarcheId) && selectedDemarcheId !== 'default';

  return (
    <>
      <ScrollablePanel scrollableId="modeles-preremplis">
        <h2>{title || 'Modèles préremplis'}</h2>
        <div>
          {hasSelectedDemarche ? (
            <>
              <p>
                Ce formulaire a été pré-rempli selon le cas d’usage suivant :{' '}
                <i>
                  {get(demarches, selectedDemarcheId, {}).label ||
                    selectedDemarcheId}
                </i>
              </p>
              {!isEmpty(roles) && !isEmpty(modifiedFields) && (
                <p>
                  Certaines des sections pré-remplies par le cas d’usage ont été
                  modifiées.
                </p>
              )}
            </>
          ) : (
            <>Cette demande n’a pas utilisé de modèle de pré-remplissage.</>
          )}
        </div>
      </ScrollablePanel>
    </>
  );
};

export default DemarcheSectionReadOnly;
