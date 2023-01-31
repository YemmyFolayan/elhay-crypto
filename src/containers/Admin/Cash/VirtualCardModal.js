import {
  openNotificationWithIcon,
  openNotificationWithIconErr,
} from 'appRedux/actions/Common';
import api from 'appRedux/api';
import Modal from 'components/common/Modal';
import Create from 'containers/Admin/Cash/CardSteps/Create';
import { Form, Formik } from 'formik';
import { useStep } from 'helpers/hooks';
import { errorMessage } from 'helpers/utils';
import React from 'react';
import SetPin from './CardSteps/SetPin';

const VirtualCardModal = ({ isOpen, onClose }) => {
  const { step, previousStep, nextStep } = useStep(0);
  const _renderStepContent = () => {
    const stepProps = () => ({ step, nextStep, previousStep });
    switch (step) {
      case 0:
        return <Create {...stepProps()} />;
      case 1:
        return <SetPin {...stepProps()} />;

      default:
        return <>Not Found</>;
    }
  };

  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <Formik
        initialValues={{
          cardColor: 'Black',
          cardBrands: 'Visa',
          cardPin: '',
          country: 'Texas,USA',
          postalCode: '76010',
          billingAddress:
            'C/o Coven Works 2909 E. Arkansas Lane, Suite C Arlington',
        }}
        onSubmit={values => {
          api
            .post('/stripe/createStripeVirtualCard', values)
            .then(res =>
              openNotificationWithIcon(
                res.data.message,
                'Virtual Card',
                'success',
              ),
            )
            .catch(error => {
              openNotificationWithIconErr(
                errorMessage(error),
                'Virtual Card',
                'error',
              );
            })
            .finally(() => onClose());
        }}
      >
        <Form>{_renderStepContent()}</Form>
      </Formik>
    </Modal>
  );
};

export default VirtualCardModal;
