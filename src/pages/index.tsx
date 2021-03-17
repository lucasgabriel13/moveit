import { CompleteChallenges } from "../components/CompletedChallenges";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import Profile from '../components/Profile';
import styles from '../styles/pages/Home.module.css';
import { ChallengeBox } from "../components/ChallengeBox";
import { CountdownProvider } from '../contexts/CountdownContext';
import { ChallengesContext, ChallengesProvider } from '../contexts/ChallengesContext';

import { GetServerSideProps } from 'next';

import Head from 'next/head'

interface HomePros {
  level: number,
  currentExperience: number,
  challengesComplete: number,
}


export default function Home(props: HomePros) {


  return (
    <ChallengesProvider
      level={props.level}
      currentExperience={props.currentExperience}
      challengesComplete={props.challengesComplete}
    >
      <div className={styles.container}>
        <Head>
          <title> Início | Move.it</title>
        </Head>

        <ExperienceBar />
        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompleteChallenges />
              <Countdown />
            </div>
            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengesProvider>
  )
}


export const getServerSideProps: GetServerSideProps = async (ctx) => {

  const { level, currentExperience, challengesComplete } = ctx.req.cookies;

  return {
    props: {
      level: Number(level),
      currentExperience: Number(currentExperience),
      challengesComplete: Number(challengesComplete)
    }
  }
}