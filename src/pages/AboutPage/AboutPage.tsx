import { Button, Title, Space } from '@mantine/core';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import cl from './AboutPage.module.css';
import gitIco from '../../assets/git.svg';
import mantine from '../../assets/mantine-ico.svg';
import react from '../../assets/react-ico.svg';
import ts from '../../assets/ts-ico.svg';
import redux from '../../assets/redux-ico.svg';
import i18 from '../../assets/i18-ico.svg';

const AboutPage = memo(() => {
  const { t } = useTranslation();

  return (
    <main className="main page-about animated-background animated-background--topLeft">
      <div className="container page-wrapper">
        <Title order={1} className={cl.pageTitle}>
          {t('About project')}
        </Title>
        <div className={cl.aboutList}>
          <div className={cl.aboutItem}>
            <div className={cl.aboutTitle}>
              Mrdoker1
              <a href="https://github.com/Mrdoker1/">
                <img src={gitIco} alt="GitHub Mrdoker1" />
              </a>
            </div>
            <div className={cl.respList}>
              <Button
                className={cl.respItem}
                variant="gradient"
                gradient={{ from: 'indigo', to: 'cyan' }}
                uppercase
                radius={50}
              >
                Design
              </Button>
              <Button
                className={cl.respItem}
                variant="gradient"
                gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                uppercase
                radius={50}
              >
                Api
              </Button>
              <Button
                className={cl.respItem}
                variant="gradient"
                gradient={{ from: 'orange', to: 'red' }}
                uppercase
                radius={50}
              >
                Features
              </Button>
            </div>
            <Space w="xs" />
            <p className={cl.aboutDescr}>
              {t(
                "App design, API requests, Boards page, Drag'n Drop, Supervise the development process."
              )}
            </p>
          </div>

          <div className={cl.aboutItem}>
            <div className={cl.aboutTitle}>
              GeoBo
              <a href="https://github.com/GeoBo/">
                <img src={gitIco} alt="GitHub GeoBo" />
              </a>
            </div>
            <div className={cl.respList}>
              <Button
                className={cl.respItem}
                variant="gradient"
                gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }}
                uppercase
                radius={50}
              >
                Router
              </Button>
              <Button
                className={cl.respItem}
                variant="gradient"
                gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                uppercase
                radius={50}
              >
                Api
              </Button>
              <Button
                className={cl.respItem}
                variant="gradient"
                gradient={{ from: 'orange', to: 'red' }}
                uppercase
                radius={50}
              >
                Features
              </Button>
            </div>
            <Space w="xs" />
            <p className={cl.aboutDescr}>
              {t(
                'Routing, API requests, authorization / registration, kanban-board, project documentation.'
              )}
            </p>
          </div>

          <div className={cl.aboutItem}>
            <div className={cl.aboutTitle}>
              Makrakvladislav
              <a href="https://github.com/makrakvladislav/">
                <img src={gitIco} alt="GitHub Makrakvladislav" />
              </a>
            </div>
            <div className={cl.respList}>
              <Button
                className={cl.respItem}
                variant="gradient"
                gradient={{ from: 'grape', to: 'violet', deg: 105 }}
                uppercase
                radius={50}
              >
                Markup
              </Button>
              <Button
                className={cl.respItem}
                variant="gradient"
                gradient={{ from: 'teal', to: 'lime', deg: 105 }}
                uppercase
                radius={50}
              >
                Api
              </Button>
              <Button
                className={cl.respItem}
                variant="gradient"
                gradient={{ from: 'orange', to: 'red' }}
                uppercase
                radius={50}
              >
                Features
              </Button>
            </div>
            <Space w="xs" />
            <p className={cl.aboutDescr}>
              {t('Layout, Localization, Pages: Main, Profile, Search, About, 404. Api requests.')}
            </p>
          </div>
        </div>
        <div className={cl.techListWrapper}>
          <div className={cl.techTitle}>{t('Build with')}</div>
          <div className={cl.techList}>
            <img src={mantine} alt="Mantine" />
            <img src={react} alt="React" />
            <img src={ts} alt="TypeScript" />
            <img src={redux} alt="Redux" />
            <img src={i18} alt="I18n" />
          </div>
        </div>
      </div>
    </main>
  );
});

export default AboutPage;
