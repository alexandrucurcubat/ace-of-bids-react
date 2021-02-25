import React, { useContext } from 'react';
import { CssBaseline, ThemeProvider } from '@material-ui/core';
import Container from '@material-ui/core/Container';

import './App.css';
import Drawer from './common/components/drawer/Drawer';
import Header from './common/components/header/Header';
import Footer from './common/components/footer/Footer';
import { DarkThemeContext } from './common/theme/theme-context';
import { useStyles } from './common/theme/theming';

const App = () => {
  const { theme } = useContext(DarkThemeContext);
  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Drawer />
      <Header />
      <Container fixed className={classes.appContainer}>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Officia,
        ipsam, deserunt maiores voluptates asperiores, consectetur commodi
        reiciendis voluptate quas repudiandae laboriosam? Placeat quia ratione
        doloremque dicta. Quae perferendis accusamus adipisci. Quas est ut,
        impedit asperiores quibusdam molestias animi. Unde, maiores nobis aut
        eius neque eaque, corrupti officiis at quo inventore, rem ipsam magnam
        dolorem assumenda laboriosam ipsa similique explicabo reiciendis.
        Dolores aut non vel quod, eos totam eligendi consequatur, distinctio
        debitis quis quidem voluptates laboriosam, labore sed vitae! Culpa
        earum, quas officiis fuga libero neque optio eos! Atque, harum dolorum.
        Quaerat rerum totam esse sit fugit nam laboriosam! Error harum soluta ab
        vitae! Ad, aperiam voluptas omnis quod soluta accusamus asperiores
        cupiditate explicabo eius maxime illum pariatur voluptatibus ducimus
        corporis. Expedita distinctio quam, a molestias eum veniam omnis eos
        nemo odio nesciunt corporis eveniet nostrum voluptatibus provident,
        nobis facere optio ad excepturi? Saepe, nesciunt. Autem eius fuga error
        doloremque esse? Vitae atque voluptatem, cum quasi maxime saepe
        molestias illo doloribus dolorum dicta eos, beatae unde accusamus
        impedit molestiae aliquid repellat aspernatur reprehenderit. Repellendus
        nihil ea quidem quis, laborum excepturi consectetur! Dolores laudantium
        fuga sed laboriosam dignissimos a dolor iusto repellat nostrum aperiam
        corrupti ad deserunt sapiente aut illum voluptas, delectus vero
        doloremque. Officiis, quam? Facere rerum illo voluptatem. Iste,
        voluptatum? Magni accusantium ratione voluptatem temporibus id laborum
        necessitatibus aut sed assumenda tenetur laboriosam, voluptas debitis,
        quis a ullam. Aut error sunt architecto exercitationem iure consequuntur
        distinctio a vero fugiat eaque! Quod, pariatur, ipsam possimus minima
        nam qui veniam officia dolor explicabo architecto optio. Asperiores,
        earum? Maiores aspernatur, dicta iure laborum earum doloribus facilis!
        Iure, aut fugiat nihil nemo quasi labore! Iste aliquam nemo expedita
        consectetur sed similique nisi culpa, vitae dolores soluta explicabo
        magni nam dignissimos facilis temporibus. Tempora id tempore quo quis
        architecto fugit recusandae corrupti, similique enim sequi.
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

export default App;
