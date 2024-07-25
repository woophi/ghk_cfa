import { BottomSheet } from '@alfalab/core-components/bottom-sheet';
import { ButtonMobile } from '@alfalab/core-components/button/mobile';
import { CDNIcon } from '@alfalab/core-components/cdn-icon';
import { Gap } from '@alfalab/core-components/gap';
import { IconButton } from '@alfalab/core-components/icon-button';
import { Typography } from '@alfalab/core-components/typography';
import { useCallback, useState } from 'react';
import caseIcon from './assets/case.png';
import cfa from './assets/cfa.png';
import checkIcon from './assets/check.png';
import safeIcon from './assets/safe.png';
import { data } from './data';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';

export const App = () => {
  const [cfaValue, setCFA] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({ title: '', subtitle: '' });
  const [err, setError] = useState('');
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [open, setOpen] = useState(false);

  const submit = useCallback(() => {
    setError('');
    if (!cfaValue) {
      setError('Введите количество ЦФА');
      return;
    }
    setLoading(true);
    // LS.setItem(LSKeys.ShowThx, true);
    setLoading(false);
    setThx(true);
    // sendDataToGA(checkedBox).then(() => {
    //   LS.setItem(LSKeys.ShowThx, true);
    //   setLoading(false);
    //   setThx(true);
    // });
  }, [cfaValue]);

  const onUp = useCallback(() => {
    setCFA(v => (v >= 999 ? 999 : v + 1));
  }, []);
  const onDown = useCallback(() => {
    setCFA(v => (v <= 0 ? 0 : v - 1));
  }, []);

  const openModal = useCallback((data: { title: string; subtitle: string }) => {
    setModalData(data);
    setOpen(true);
  }, []);

  if (thxShow) {
    return <ThxLayout />;
  }

  return (
    <>
      <div className={appSt.container}>
        <Typography.TitleResponsive tag="h1" view="medium" font="system" weight="medium">
          Заявка на покупку
        </Typography.TitleResponsive>

        <div className={appSt.box}>
          <img src={cfa} width={48} height={48} />

          <div>
            <Typography.Text tag="p" weight="bold" view="primary-medium" defaultMargins={false}>
              {data.title}
            </Typography.Text>
            <Typography.Text tag="p" view="primary-small" defaultMargins={false}>
              {data.cfaType}
            </Typography.Text>
          </div>
        </div>

        <div className={appSt.inputContainer}>
          <div className={appSt.inputValue}>
            <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
              {cfaValue}
            </Typography.Text>
            <Typography.Text tag="p" weight="bold" view="primary-medium" defaultMargins={false}>
              {data.inputValueText}
            </Typography.Text>
          </div>

          <div className={appSt.inputActions}>
            <span onClick={onDown} style={{ display: 'inline-flex' }}>
              <CDNIcon name="glyph_minus_m" />
            </span>
            <div className={appSt.inputActionsHR} />

            <span onClick={onUp} style={{ display: 'inline-flex' }}>
              <CDNIcon name="glyph_plus_m" />
            </span>
          </div>
        </div>
      </div>
      <div className={appSt.containerSecondary}>
        <Typography.TitleResponsive tag="h2" view="medium" font="system" weight="medium">
          {data.title}
        </Typography.TitleResponsive>
        <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
          {data.text}
        </Typography.Text>

        <div />
        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Тип ЦФА
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="bold" defaultMargins={false}>
              {data.cfaType}
            </Typography.Text>
          </div>
          <IconButton
            view="primary"
            size={32}
            icon={<CDNIcon name="glyph_information-circle_m" />}
            onClick={() =>
              openModal({
                title: 'Тип ЦФА',
                subtitle:
                  'Цифровые обязательства – проценты и возврат начальной стоимости ЦФА в срок погашения. ЦФА в денежный поток – выплаты по кредитному договору между эмитентом и третьей стороной. Недвижимость – инвестирование в недвижимость, выраженную в цифровом индексе',
              })
            }
          />
        </div>

        <div />
        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Цена ЦФА
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="bold" defaultMargins={false}>
              1000 ₽
            </Typography.Text>
          </div>
          <IconButton
            view="primary"
            size={32}
            icon={<CDNIcon name="glyph_information-circle_m" />}
            onClick={() =>
              openModal({
                title: 'Цена ЦФА',
                subtitle:
                  'Цену устанавливает эмитент, она не меняется. Купить или продать актив по другой цене можно будет только на вторичном рынке.',
              })
            }
          />
        </div>

        <div />
        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Тип процентной ставки
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="bold" defaultMargins={false}>
              Фиксированная
            </Typography.Text>
          </div>
          <IconButton
            view="primary"
            size={32}
            icon={<CDNIcon name="glyph_information-circle_m" />}
            onClick={() =>
              openModal({
                title: 'Тип процентной ставки',
                subtitle:
                  'Фиксированная процентная ставка - зафиксированная на уровне определенного значения. Плавающая процентная ставка – находится в зависимости от определенной переменной и может изменяться. Барьерная процентная ставка – находится в зависимости от определенной переменной и при этом не может быть ниже и/или выше уровня определенного зафиксированного значения',
              })
            }
          />
        </div>

        <div />
        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Процентная ставка
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="bold" defaultMargins={false}>
              {data.rate}
            </Typography.Text>
          </div>
          <IconButton
            view="primary"
            size={32}
            icon={<CDNIcon name="glyph_information-circle_m" />}
            onClick={() =>
              openModal({
                title: 'Процентная ставка',
                subtitle: 'Выплата, которую получает инвестор от эмитента, выпустившего цифровые обязательства.',
              })
            }
          />
        </div>

        <div />
        <div>
          <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
            Процентный доход выплачиваемости
          </Typography.Text>
          <Typography.Text tag="p" view="primary-medium" weight="bold" defaultMargins={false}>
            Ежемесячно
          </Typography.Text>
        </div>

        <div />
        <div>
          <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
            Срок обращения
          </Typography.Text>
          <Typography.Text tag="p" view="primary-medium" weight="bold" defaultMargins={false}>
            1 год
          </Typography.Text>
        </div>

        <Typography.TitleResponsive tag="h3" view="small" font="system" weight="semibold">
          Почему стоит купить
        </Typography.TitleResponsive>
        <div className={appSt.rowImg}>
          <img style={{ objectFit: 'contain' }} src={caseIcon} width={48} height={48} />

          <div>
            <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
              Низкий порог входа
            </Typography.Text>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Инвестиции от 1000 ₽
            </Typography.Text>
          </div>
        </div>
        <div className={appSt.rowImg}>
          <img style={{ objectFit: 'contain' }} src={checkIcon} width={48} height={48} />

          <div>
            <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
              Удобство
            </Typography.Text>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Доступ к выгодному активу без необходимости управлять физической недвижимостью
            </Typography.Text>
          </div>
        </div>
        <div className={appSt.rowImg}>
          <img style={{ objectFit: 'contain' }} src={safeIcon} width={48} height={48} />

          <div>
            <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
              Надёжность
            </Typography.Text>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Гарантированная доходность и защита капитала
            </Typography.Text>
          </div>
        </div>

        <Gap size={96} />
      </div>
      <div className={appSt.bottomBtn}>
        <ButtonMobile loading={loading} onClick={submit} block className={appSt.btn} view="primary" hint={err}>
          <div className={appSt.btnContainer}>
            <div>
              <Typography.TitleResponsive font="system" tag="h2" view="xsmall" weight="bold">
                {cfaValue * 1000} ₽
              </Typography.TitleResponsive>
              <Typography.Text color="secondary-inverted" tag="p" view="primary-medium" defaultMargins={false}>
                Комиссия 0 ₽
              </Typography.Text>
            </div>
            <div className={appSt.btnArrow}>
              <CDNIcon name="glyph_chevron-right_m" color="#000000" />
            </div>
          </div>
        </ButtonMobile>
      </div>

      <BottomSheet
        title={
          <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
            {modalData.title}
          </Typography.Text>
        }
        open={open}
        onClose={() => setOpen(false)}
        hasCloser
      >
        <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
          {modalData.subtitle}
        </Typography.Text>
      </BottomSheet>
    </>
  );
};
