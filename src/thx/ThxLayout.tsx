import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { Gap } from '@alfalab/core-components/gap';
import { Typography } from '@alfalab/core-components/typography';
import aLogo from '../assets/a_logo.png';
import howTo from '../assets/how_to.png';
import { appSt } from '../style.css';
import { thxSt } from './style.css';

export const ThxLayout = () => {
  return (
    <>
      <div className={thxSt.container}>
        <img src={aLogo} className={thxSt.rocket} />
        <Typography.TitleResponsive font="system" tag="h1" view="large" defaultMargins weight="bold">
          Мы знаем, что вы хотели подать заявку
        </Typography.TitleResponsive>
        <Typography.TitleResponsive font="system" tag="h2" view="xsmall" defaultMargins weight="regular">
          Совсем скоро вы сможете выбрать ЦФА в нашем основном разделе.
        </Typography.TitleResponsive>
        <img src={howTo} className={thxSt.rocket} />
      </div>
      <Gap size={128} />
      <div className={appSt.bottomBtn}>
        <ButtonMobile
          block
          view="primary"
          href="alfabank://webFeature?type=recommendation&url=https%3A%2F%2Fdfa.alfabank.ru%2Fretail-investor%2Fwebview%2F%3Fchannel%3Ddf1"
        >
          Буду ждать!
        </ButtonMobile>
      </div>
    </>
  );
};
