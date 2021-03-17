import { useContext } from 'react';
import { ChallengesContext } from '../contexts/ChallengesContext';
import styles from '../styles/components/CompleteChallenges.module.css';

export function CompleteChallenges() {

    const { challengesComplete } = useContext(ChallengesContext);

    return (
        <div className={styles.completedChallegesContainer}>
            <span>Desafios completos</span>
            <span>{challengesComplete}</span>
        </div>
    )
}