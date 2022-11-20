import { Button } from '@mantine/core';
import React from 'react';
import cl from './HomePage.module.css';
import feature1 from '../../assets/feature1.svg';
import feature2 from '../../assets/feature2.svg';
import feature3 from '../../assets/feature3.svg';
import checkIco from '../../assets/check-ico.svg';
import img1 from '../../assets/main-page-img1.png';
import img2 from '../../assets/main-page-img2.png';
import img3 from '../../assets/main-page-img3.png';

const HomePage = () => {
  return (
    <>
      <section className={cl.splash}>
        <div className="container">
          <h3 className={cl.subtitle}>Project Management App</h3>
          <h2 className={cl.title}>
            Colaborate and build <br /> faster, together.
          </h2>
          <p className={cl.description}>
            Create, share, and get feedback with collaborative <br /> boards for rapid development.
          </p>
          <Button className="button" color="cyan" radius={8} sx={{ height: 36 }}>
            Create Kanban Board
          </Button>
        </div>
      </section>
      <div className="container">
        <section className={cl.features}>
          <div className={`${cl.feature} ${cl.gradientBorder}`}>
            <img src={feature1} />
            <h4 className={cl.featureTitle}>Integrate</h4>
            <p className={cl.featureDescription}>
              The ability to quickly set up and customize workflows for just about anything.
            </p>
          </div>
          <div className={`${cl.feature} ${cl.gradientBorder}`}>
            <img src={feature2} />
            <h4 className={cl.featureTitle}>Colaborate</h4>
            <p className={cl.featureDescription}>
              Manage projects, organize tasks, and build team spirit—all in one place.
            </p>
          </div>
          <div className={`${cl.feature} ${cl.gradientBorder}`}>
            <img src={feature3} />
            <h4 className={cl.featureTitle}>Succeed</h4>
            <p className={cl.featureDescription}>
              Every single part of your task can be managed, tracked, and shared with teammates.
            </p>
          </div>
        </section>
        <section className={cl.mainPageText}>
          <div className={cl.textWrapper}>
            <div className={cl.textSubTitle}>
              <img src={checkIco} />
              Universal
            </div>
            <h3>Build the workflow you want</h3>
            <p>Manage your boards using Drag-n-Drop, create adittional boards and tasks.</p>
          </div>
          <img src={img1} className={cl.textImg} />
        </section>
        <section className={cl.mainPageText}>
          <img src={img2} className={cl.textImg} />
          <div className={cl.textWrapper}>
            <div className={cl.textSubTitle}>
              <img src={checkIco} />
              Optimized
            </div>
            <h3>Everything you need in one place</h3>
            <p>You can specify additional info in task description and assign users.</p>
          </div>
        </section>
        <section className={cl.mainPageText}>
          <div className={cl.textWrapper}>
            <div className={cl.textSubTitle}>
              <img src={checkIco} />
              Unlimited
            </div>
            <h3>No limits for all users.</h3>
            <p>Unlimited kanban boards, columns and tasks.</p>
          </div>
          <img src={img3} className={cl.textImg} />
        </section>
      </div>
    </>
  );
};

export default HomePage;
