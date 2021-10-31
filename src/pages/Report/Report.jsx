import React from "react";
import Toolbar from "@mui/material/Toolbar";
import { useHistory } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import GlobalStyles from "@mui/material/GlobalStyles";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const footers = [
  {
    title: "Company",
    description: ["Team", "History", "Contact us", "Locations"],
  },
  {
    title: "Features",
    description: [
      "Cool stuff",
      "Random feature",
      "Team feature",
      "Developer stuff",
      "Another one",
    ],
  },
  {
    title: "Resources",
    description: [
      "Resource",
      "Resource name",
      "Another resource",
      "Final resource",
    ],
  },
  {
    title: "Legal",
    description: ["Privacy policy", "Terms of use"],
  },
];




function Report() {
    const history = useHistory();
    const loggedInUser = localStorage.getItem("user-info");
  const userObj = JSON.parse(loggedInUser);
  return (
    <React.Fragment>
      <GlobalStyles
        styles={{ ul: { margin: 0, padding: 0, listStyle: "none" } }}
      />
      <CssBaseline />
      <AppBar
        position="sticky"
        color="default"
        elevation={4}
        sx={{
          backgroundColor: `#18A0FB`,
          borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        }}
      >
        <Toolbar sx={{ flexWrap: "wrap" }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 , cursor: "pointer"}}
           onClick={() => {
            userObj !== null ? history.push("/maindashboard"):
            history.push("/");
          }}>
            Asterix
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Features
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Enterprise
            </Link>
            <Link
              variant="button"
              color="text.primary"
              href="#"
              sx={{ my: 1, mx: 1.5 }}
            >
              Support
            </Link>
          </nav>
          <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero unit */}
      <Container
        disableGutters
        maxWidth="sm"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
         Report Page
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Typography>
      </Container>
      {/* End hero unit */}

      <Container
        disableGutters
        maxWidth="lg"
        component="main"
        sx={{ pt: 8, pb: 6 }}
      >
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Lorem ipsum dolor sit amet
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          component="p"
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Risus quis
          varius quam quisque id diam vel. At urna condimentum mattis
          pellentesque id. Scelerisque eu ultrices vitae auctor eu augue ut.
          Nunc eget lorem dolor sed viverra ipsum nunc aliquet. Tortor id
          aliquet lectus proin nibh nisl. Ullamcorper eget nulla facilisi etiam
          dignissim diam quis enim. Vel quam elementum pulvinar etiam non quam
          lacus. Vitae semper quis lectus nulla at volutpat diam ut venenatis.
          Eget sit amet tellus cras adipiscing enim. Feugiat sed lectus
          vestibulum mattis ullamcorper velit sed. Justo eget magna fermentum
          iaculis eu non diam phasellus vestibulum. Varius quam quisque id diam
          vel. Nisl nunc mi ipsum faucibus vitae aliquet nec. Morbi non arcu
          risus quis varius quam. Ipsum nunc aliquet bibendum enim facilisis.
          Facilisis gravida neque convallis a cras semper auctor neque vitae.
          Lorem donec massa sapien faucibus et molestie ac feugiat. Libero enim
          sed faucibus turpis in eu mi bibendum neque. Porttitor rhoncus dolor
          purus non enim praesent. Sed risus pretium quam vulputate dignissim
          suspendisse in est ante. Id cursus metus aliquam eleifend mi in nulla
          posuere. Vitae ultricies leo integer malesuada. Ullamcorper dignissim
          cras tincidunt lobortis. Vulputate eu scelerisque felis imperdiet
          proin fermentum. Et netus et malesuada fames ac turpis egestas
          maecenas pharetra. Et netus et malesuada fames ac turpis egestas.
        </Typography>
      </Container>

      {/* Footer */}
      <Container
        maxWidth="md"
        component="footer"
        sx={{
          borderTop: (theme) => `1px solid ${theme.palette.divider}`,
          mt: 8,
          py: [3, 6],
        }}
      >
        <Grid container spacing={4} justifyContent="space-evenly">
          {footers.map((footer) => (
            <Grid item xs={6} sm={3} key={footer.title}>
              <Typography variant="h6" color="text.primary" gutterBottom>
                {footer.title}
              </Typography>
              <ul>
                {footer.description.map((item) => (
                  <li key={item}>
                    <Link href="#" variant="subtitle1" color="text.secondary">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 5 }} />
      </Container>
      {/* End footer */}
    </React.Fragment>
  );
}

export default Report;
