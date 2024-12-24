import {Link} from "react-router-dom";
import styles from '../styles/header.module.css';

export default function Header(){
    return(
    <>
      <header>
            <div className={styles.header}>
                
                <h1>vineil</h1>
               </div>

             <nav className="blocodois">

                <Link to="/registro">
                    <h2 class='header-link'>Registrar</h2>
                 </Link>



            </nav>
      </header>
          
    </>
    )
}