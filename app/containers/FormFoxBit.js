import React from 'react';
import {
  Title,
  Description,
  FieldName,
  FieldBirthday,
  FieldPhoneNumber,
  FieldAddress,
  FieldSelect,
  FieldNationalID,
  FieldPhotoID,
  FieldPhotoSelf,
  FieldLanguage,
} from '../components';

import FormBase from './FormBase';

const media = [
  'Campus Party',
  'Facebook',
  'Google',
  'Grupo Bitcoin Brasil',
  'Grupo Libertarianismo',
  'Indicação de amigos',
  'Criptotransfer',
  'Canal Daniel Fraga',
  'Canal Ideias Radicais',
  'Canal Rodrigo Souza',
  'Youtube',
  'Outros',
];

const title = 'R$ 2,00 de crédito para todos os novos usuários verificados';
const subtitle = '(limitado por CPF, não acumulativa)';

const description1 = 'As selfies precisam ser de alta resolução de forma que o seu rosto, juntamente com os dados dos documentos estejam legíveis.';
const description2 = 'Isso serve apenas para nos protegermos de fraudes. Seus documentos serão armazenados de forma criptgrafada fora de nossos servidores. A FoxBit respeita a privacidade de seus usuários.';

const languages = [
  { key: 'en', value: 'English' },
  { key: 'pt', value: 'Portugues' },
];

const FormFoxBit = () => (
  <FormBase>
    <FieldLanguage languages={languages} />
    <Title title={title} subtitle={subtitle} />
    <FieldName />
    <FieldBirthday />
    <FieldPhoneNumber />
    <FieldAddress />
    <FieldNationalID name="cpf_cnpj" />
    <FieldSelect
      data={media}
      required={false}
      groupName="Como você conheceu a FoxBit?"
    />
    <FieldPhotoID />
    <FieldPhotoSelf />
    <Description text={description1} />
    <Description text={description2} />
  </FormBase>
);

export default FormFoxBit;
