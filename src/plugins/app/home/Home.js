import { IconCheck } from './IconCheck'
import { IconLock } from './IconLock'
import { TaxFormSection } from './TaxFormSection'
import { PostponeSection } from './PostponeSection'
import styles from './Home.module.css'


export const Home = ({ nextRoute, nextPostponeRoute, isDebug }) => (
  <>
    <div className="govuk-grid-column-two-thirds">
      <TaxFormSection nextRoute={nextRoute} isDebug={isDebug} />
    </div>

    <div className="govuk-grid-column-one-third">
      <div className={styles.postponeBox}>
        <PostponeSection nextPostponeRoute={nextPostponeRoute} />
      </div>

      <ul className={styles.safeList}>
        <li>
          <IconLock />
          <p>Bezpečné SSL pripojenie</p>
        </li>
        <li>
          <IconCheck />
          <p>Pripravené v spolupráci s daňovými poradcami</p>
        </li>
      </ul>
    </div>
  </>
)
