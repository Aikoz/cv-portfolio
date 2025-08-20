import { Box, Paper, Typography, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import CyberpunkTypography from "../../../utils/cyberpunkTypography";
import CyberpunkSecondaryTypography from "../../../utils/cyberpunkSecondaryTypography";

export function ContactWidget() {
  useEffect(() => {
  }, [])
  const [contactOpen, setContactOpen] = useState(false);
  return (
    <>
      <Box
        sx={{
          position: "fixed",
          bottom: 16,
          right: 16,
          zIndex: 2000,
          pointerEvents: contactOpen ? "auto" : "none", // solo interactúa si está abierto
        }}
      >
        <Box
          sx={{
            transition: "all 0.35s ease-in-out",
            transformOrigin: "bottom right",
            transform: contactOpen ? "scale(1)" : "scale(0.5)",
            width: contactOpen ? "70vw" : "60vw", // solo ocupa lo que mide el botón
            height: contactOpen ? "45vh" : "15vh",
            pointerEvents: "auto", // el botón sí recibe clics
            marginRight: "20px",
            marginBottom: contactOpen ? "45px" : "10px",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Paper
            sx={{
              width: "100%",
              height: "100%",
              p: contactOpen ? 2 : 0,
              display: "flex",
              flexDirection: contactOpen ? "column" : "row",
              justifyContent: contactOpen ? "space-between" : "center",
              alignItems: contactOpen ? "flex-start" : "center",
              gap: contactOpen ? 0 : 1,
              // padding: contactOpen ? 10 : 0,
              borderRadius: "0.9rem",
              boxShadow: 4,
              cursor: "pointer",
              backdropFilter: 'blur(16px) saturate(180%)',
              WebkitBackdropFilter: 'blur(16px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.46)',
              backgroundColor: contactOpen
                ? "rgba(9, 48, 92, 0.14)"
                : "rgba(170, 127, 127, 0.11)",
              color: contactOpen ? "inherit" : "white",
              transition: "all 0.35s ease-in-out",
              overflow: "hidden",
              fontWeight: "bold",
              pointerEvents: "auto", // mantiene el clic en el botón
              padding: contactOpen ? "50px" : "0px",

            }}
            onClick={() => setContactOpen((prev) => !prev)}
          >
            {contactOpen ? (
              <>
                {/* Encabezado */}
                <Box sx={{ display: "flex", justifyContent: "space-between", width: "100%" }}>

                  <CyberpunkTypography > &lt;&#47;: - Are you minding a project?   </CyberpunkTypography>

                  <IconButton
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      setContactOpen(false);
                    }}
                  >
                    <CyberpunkSecondaryTypography> X </CyberpunkSecondaryTypography>

                  </IconButton>
                </Box>

                {/* Cuerpo */}
                <Box sx={{ flex: 1, mt: 2 }}>
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{
                      margin: '5px',
                      fontFamily: 'Libre Franklin, Arial, sans-serif',
                      fontWeight: '100',
                      fontSize: '20px'
                    }}
                  >
                    Contact me:
                  </Typography>
                  <br />
<a href="mailto:aikoz_1@live.com" style={{
                    textDecoration: 'none', // quitar subrayado
                    color: 'inherit', // heredar color del Typography
                    fontFamily: 'Libre Franklin, Arial, sans-serif',
                    fontWeight: 100,
                    fontSize: '20px',
                    margin: '25px'
                  }}>✉️ Mail me</a>
                  <br />
                  <a
                    href="https://wa.me/5215545277660"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      textDecoration: 'none', // quitar subrayado
                      color: 'inherit', // heredar color del Typography
                      fontFamily: 'Libre Franklin, Arial, sans-serif',
                      fontWeight: 100,
                      fontSize: '20px',
                      margin: '25px'
                    }}
                  >
                    📱 Send a message
                  </a>
                  
                </Box>
              </>
            ) : (
              <>
                {/* <Chat sx={{ fontSize: 50, marginLeft: "35px" }} /> */}
                <CyberpunkTypography > &lt;&#47;: Let’s connect &gt;  </CyberpunkTypography>
              </>

            )}
          </Paper>
        </Box>
      </Box>




    </>
  );
}

