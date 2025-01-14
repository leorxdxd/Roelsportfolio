import "../assets/styles/Navigation.scss";
import React, { useEffect, useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListIcon from "@mui/icons-material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

// Import the logo from src/assets/images
import logo from "../assets/images/logo.png"; // Update the path to your logo

const drawerWidth = 240;

const navItems = [
  ["About Me", "about"],
  ["Expertise", "expertise"],
  ["Projects", "projects"],
  ["Career History", "history"],
  ["Gallery", "gallery"],
  ["Achievements", "achievements"],
  ["Testimonials", "testimonials"],
];

function Navigation() {
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [activeItem, setActiveItem] = useState<string>("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // Breakpoint for small devices

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  // Function to determine the active section based on scroll position
  const updateActiveItem = () => {
    const scrollPosition = window.scrollY + 100; // Add an offset to account for the navbar height

    for (const item of navItems) {
      const section = document.getElementById(item[1]);
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveItem(item[1]);
          break;
        }
      }
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("navigation");
      if (navbar) {
        const isScrolled = window.scrollY > navbar.clientHeight;
        setScrolled(isScrolled);
      }

      // Update the active menu item based on scroll position
      updateActiveItem();
    };

    window.addEventListener("scroll", handleScroll);

    // Initialize the active item on page load
    updateActiveItem();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (section: string) => {
    const sectionElement = document.getElementById(section);
    if (sectionElement) {
      sectionElement.scrollIntoView({ behavior: "smooth" });
      setActiveItem(section);
    } else {
      console.error(`Element with id "${section}" not found`);
    }
  };

  const handleLogoClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setActiveItem("");
  };

  const drawer = (
    <Box
      className="navigation-bar-responsive"
      onClick={handleDrawerToggle}
      sx={{ textAlign: "center" }}
    >
      <p className="mobile-menu-top">
        <ListIcon />
        Menu
      </p>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item[0]} disablePadding>
            <ListItemButton
              sx={{ textAlign: "center" }}
              onClick={() => scrollToSection(item[1])}
              className={activeItem === item[1] ? "active" : ""}
            >
              <ListItemText primary={item[0]} />
            </ListItemButton>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton
            className={`highlight-contact ${activeItem === "contact" ? "active" : ""}`}
            sx={{ textAlign: "center" }}
            onClick={() => scrollToSection("contact")}
          >
            <ListItemText primary="Contact Me" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        component="nav"
        id="navigation"
        className={`navbar-fixed-top${scrolled ? " scrolled" : ""}`}
        sx={{
          transition: "background-color 0.3s ease",
          ...(scrolled && {
            backgroundColor: theme.palette.grey[900],
          }),
        }}
      >
        <Toolbar className="navigation-bar">
          {/* Logo on the left */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={logo}
              alt="Logo"
              style={{ height: "40px", cursor: "pointer" }}
              onClick={handleLogoClick}
            />
          </Box>

          {/* Spacer to push menu items to the right */}
          <Box sx={{ flexGrow: 1 }} />

          {/* Menu items on the right */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: "20px", // Add spacing between menu items
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item[0]}
                onClick={() => scrollToSection(item[1])}
                sx={{
                  color: "#fff",
                  fontSize: "1rem",
                  "&:hover": {
                    color: theme.palette.primary.main,
                  },
                  ...(activeItem === item[1] && {
                    borderBottom: "2px solid #ffd700",
                  }),
                }}
              >
                {item[0]}
              </Button>
            ))}
          </Box>

          {/* Contact Me button on the far right */}
          <Box sx={{ display: { xs: "none", sm: "block" }, marginLeft: "20px" }}>
            <Button
              className={`highlight-contact ${activeItem === "contact" ? "active" : ""}`}
              onClick={() => scrollToSection("contact")}
            >
              Contact Me
            </Button>
          </Box>

          {/* Mobile menu button */}
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: isMobile ? "80%" : drawerWidth, // Dynamic width
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}

export default Navigation;