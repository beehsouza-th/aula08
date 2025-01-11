import {Link} from "react-router-dom";
import styles from '../styles/header.module.css';

export default function Header(){
    return(
    <>
      <header>
        <h1> Vinil Records</h1>
            <div className={styles.header}>
              <div>
              <nav>
              <Link to="/home">
                    <h2 className={styles.menu}>Home</h2>
                 </Link>
               
              <Link to="/registro">
                    <h2 className={styles.menu}>Registrar</h2>
                 </Link>

              </nav>
              </div>
           </div>
      </header>
          
    </>
    )
}