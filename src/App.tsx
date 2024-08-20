import { BottomSheet } from '@alfalab/core-components/bottom-sheet';
import { CDNIcon } from '@alfalab/core-components/cdn-icon';
import { IconButton } from '@alfalab/core-components/icon-button';
import { Notification } from '@alfalab/core-components/notification';
import { ProgressBar } from '@alfalab/core-components/progress-bar';
import { TooltipDesktop } from '@alfalab/core-components/tooltip/desktop';
import { Typography } from '@alfalab/core-components/typography';
import { useCallback, useState } from 'react';
import calendar from './assets/calendar.png';
import main from './assets/main.jpg';
import sun from './assets/sun.png';
import suns from './assets/suns.png';
import { LS, LSKeys } from './ls';
import { appSt } from './style.css';
import { ThxLayout } from './thx/ThxLayout';
import { useCopyToClipboard } from './useCopyToClipBoard';

export const App = () => {
  const [cfaValue, setCFA] = useState(0);
  const [loading, setLoading] = useState(false);
  const [modalData, setModalData] = useState({ title: '', subtitle: '' });
  const [err, setError] = useState('');
  const [thxShow, setThx] = useState(LS.getItem(LSKeys.ShowThx, false));
  const [open, setOpen] = useState(false);
  const { copiedText, copy } = useCopyToClipboard();
  const [isVisible, setIsVisible] = useState(false);

  const submit = useCallback(() => {
    setError('');
    if (!cfaValue) {
      setError('Введите количество ЦФА');
      setIsVisible(true);
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

  const hideNotification = useCallback(() => setIsVisible(false), []);

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
      <img src={main} width="100%" />
      <div className={appSt.container}>
        <div className={appSt.topBanner}>
          <div className={appSt.topBannerText}>
            <Typography.Text view="primary-medium" defaultMargins={false} color="primary-inverted">
              Собрано заявок
            </Typography.Text>
            <Typography.Text view="primary-medium" defaultMargins={false} weight="bold" color="primary-inverted">
              5 000 / 200 000
            </Typography.Text>
          </div>
          <ProgressBar value={(5000 / 20_000) * 100} view="attention" className={appSt.topBannerProgress} />
          <div className={appSt.topBannerText}>
            <Typography.Text view="primary-small" defaultMargins={false} color="primary-inverted">
              Сбор заявок до
            </Typography.Text>
            <Typography.Text view="primary-small" defaultMargins={false} weight="bold" color="primary-inverted">
              01.09.2024 18:00 мск
            </Typography.Text>
          </div>
        </div>

        <div style={{ margin: '1rem 0' }}>
          <Typography.TitleResponsive tag="h1" view="medium" font="system" weight="medium">
            Санкт-Петербург
          </Typography.TitleResponsive>
          <Typography.Text view="primary-small" color="secondary">
            Жилая недвижимость • Срок 3 года
          </Typography.Text>
        </div>

        <Typography.Text view="primary-medium" defaultMargins={false}>
          Цифровые квадратные метры жилой недвижимости — это инвестиции в индексное значение стоимости первичной недвижимости
          соответствующего региона.
        </Typography.Text>
        <Typography.Text view="primary-medium" defaultMargins={false}>
          Покупая Цифровые квадратные метры жилой недвижимости, вы получаете участие в динамике стоимости жилой недвижимости,
          рассчитываемой на основании цен по заключенным и зарегистрированным договорам долевого участия (ДДУ).
        </Typography.Text>
        <Typography.Text view="primary-medium" defaultMargins={false}>
          Цифровые квадратные метры жилой недвижимости – это инновационный продукт, выпускаемый в формате ЦФА.
        </Typography.Text>

        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Номер ЦФА
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
              ALFB-1-DTD-092024-00073
            </Typography.Text>
          </div>
        </div>

        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Цена ЦФА
            </Typography.Text>

            <div style={{ display: 'inline-flex', gap: '1rem' }}>
              <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
                2500 ₽
              </Typography.Text>
              <Typography.Text tag="p" view="primary-medium" color="secondary" defaultMargins={false}>
                1 ЦФА = 0,01 м2
              </Typography.Text>
            </div>
          </div>

          <IconButton
            view="primary"
            size={32}
            icon={<CDNIcon name="glyph_information-circle_m" color="#C1C1C3" />}
            onClick={() =>
              openModal({
                title: 'Цена ЦФА',
                subtitle:
                  'Цену устанавливает эмитент, она не меняется. Купить или продать актив по другой цене можно будет только на вторичном рынке.',
              })
            }
          />
        </div>

        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Объем выпуска в денежном выражении
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
              от 50 000 000 ₽ до 500 000 000 ₽
            </Typography.Text>
          </div>
        </div>

        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Объём выпуска в квадратных метрах
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
              от 200 м2 до 2 000 м2
            </Typography.Text>
          </div>
        </div>

        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Выплата дохода
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
              В конце срока
            </Typography.Text>
          </div>
        </div>

        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Срок обращения
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
              3 года
            </Typography.Text>
          </div>
        </div>

        <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h2" view="medium" font="system" weight="medium">
          Ключевые даты
        </Typography.TitleResponsive>

        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Дата выпуска
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
              01.09.2024
            </Typography.Text>
          </div>

          <IconButton
            view="primary"
            size={32}
            icon={<CDNIcon name="glyph_information-circle_m" color="#C1C1C3" />}
            onClick={() =>
              openModal({
                title: 'Дата выпуска',
                subtitle: 'В этот день купленный ЦФА появится в вашем портфеле',
              })
            }
          />
        </div>

        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Возможная продажа не ранее
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
              05.09.2024
            </Typography.Text>
          </div>

          <IconButton
            view="primary"
            size={32}
            icon={<CDNIcon name="glyph_information-circle_m" color="#C1C1C3" />}
            onClick={() =>
              openModal({
                title: 'Когда можно продать ЦФА',
                subtitle: 'Дату, с которой можно перепродать ЦФА на вторичном рынке устанавливает эмитент',
              })
            }
          />
        </div>

        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Дата погашения
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
              01.09.2027
            </Typography.Text>
          </div>

          <IconButton
            view="primary"
            size={32}
            icon={<CDNIcon name="glyph_information-circle_m" color="#C1C1C3" />}
            onClick={() =>
              openModal({
                title: 'Дата погашения',
                subtitle: 'В этот день эмитент перечислит вам деньги на счет',
              })
            }
          />
        </div>

        <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h2" view="medium" font="system" weight="medium">
          Почему стоит купить
        </Typography.TitleResponsive>

        <div className={appSt.rowImg}>
          <img style={{ objectFit: 'contain' }} src={sun} width={48} height={48} />

          <div>
            <Typography.Text tag="p" view="primary-small" defaultMargins={false} color="secondary">
              Комплексная диверсификация
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
              По застройщикам и ЖК региона
            </Typography.Text>
          </div>
        </div>

        <div className={appSt.rowImg}>
          <img style={{ objectFit: 'contain' }} src={suns} width={48} height={48} />

          <div>
            <Typography.Text tag="p" view="primary-small" defaultMargins={false} color="secondary">
              Ожидаемая доходность
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
              18% — 20% годовых
            </Typography.Text>
          </div>
        </div>

        <div className={appSt.rowImg}>
          <img style={{ objectFit: 'contain' }} src={calendar} width={48} height={48} />

          <div>
            <Typography.Text tag="p" view="primary-small" defaultMargins={false} color="secondary">
              Комфортный срок
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
              Срок инвестиций — 3 года
            </Typography.Text>
          </div>
        </div>

        <Typography.TitleResponsive style={{ marginTop: '1rem' }} tag="h2" view="medium" font="system" weight="medium">
          Дополнительно
        </Typography.TitleResponsive>

        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Эмитент
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
              Альфа-Банк
            </Typography.Text>
          </div>
        </div>

        <div className={appSt.row}>
          <div>
            <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
              Юридический адрес эмитента
            </Typography.Text>
            <Typography.Text tag="p" view="primary-medium" weight="medium" defaultMargins={false}>
              ул. Каланчевская, д.27, г. Москва, 107078
            </Typography.Text>
          </div>
        </div>

        <TooltipDesktop view="hint" open={!!copiedText} content="Скопировано" position="top" offset={[0, -10]}>
          <div className={appSt.row} onClick={() => copy('https://alfabank.ru/')}>
            <div>
              <Typography.Text tag="p" view="primary-small" color="secondary" defaultMargins={false}>
                Cайт эмитента
              </Typography.Text>
              <Typography.Text
                tag="p"
                view="primary-medium"
                weight="medium"
                defaultMargins={false}
                style={{ textDecoration: 'underline' }}
              >
                https://alfabank.ru/
              </Typography.Text>
            </div>

            <IconButton view="primary" size={32} icon={<CDNIcon name="glyph_copy-line_m" color="#C1C1C3" />} />
          </div>
        </TooltipDesktop>

        <div style={{ height: '160px' }} />
      </div>
      <div className={appSt.bottomBtn}>
        <div className={appSt.btn}>
          <div className={appSt.btnContainerWrap}>
            <div className={appSt.inputContainer}>
              <div className={appSt.inputValue}>
                <Typography.Text tag="p" view="primary-medium" defaultMargins={false}>
                  {cfaValue}
                </Typography.Text>
                <Typography.Text tag="p" weight="bold" view="primary-medium" defaultMargins={false}>
                  ЦФА
                </Typography.Text>
              </div>

              <div className={appSt.inputActions}>
                <span onClick={onDown} style={{ display: 'inline-flex' }}>
                  <CDNIcon name="glyph_minus_m" className={appSt.inputActionsMinus} />
                </span>
                <div className={appSt.inputActionsHR} />

                <span onClick={onUp} style={{ display: 'inline-flex' }}>
                  <CDNIcon name="glyph_plus_m" />
                </span>
              </div>
            </div>

            <div className={appSt.btnContainer}>
              <div>
                <Typography.TitleResponsive font="system" tag="h2" view="xsmall" weight="bold">
                  {cfaValue * 1000} ₽
                </Typography.TitleResponsive>
                <Typography.Text color="secondary-inverted" tag="p" view="primary-medium" defaultMargins={false}>
                  Комиссия 0 ₽
                </Typography.Text>
              </div>
              <IconButton
                icon={<CDNIcon name="glyph_chevron-right_m" color="#000000" />}
                loading={loading}
                onClick={submit}
                className={appSt.btnArrow}
              />
            </div>
          </div>
        </div>
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

      <Notification
        badge="attention"
        title={err}
        visible={isVisible}
        offset={160}
        onClose={hideNotification}
        onCloseTimeout={hideNotification}
        position="bottom"
      />
    </>
  );
};
