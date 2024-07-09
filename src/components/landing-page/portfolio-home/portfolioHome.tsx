import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { Box, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import GlitchTypography from "../../../utils/glitchTypography";
// import { Delete, EditNote } from "@mui/icons-material";
// import { server } from "../../../utils/constants";
// import { DateFormatter } from '../../../utils/dateFormatter'

// const StyledTypography = styled(Typography)(({ theme }) => ({
//   fontFamily: 'Libre Franklin, Arial, sans-serif',
//   fontWeight: 200,
//   fontSize: '20px',
//   width: '70%',
//   color: 'lightgray'
// }));

interface OutletContextType {
  setSharedTitle: (title: string) => void;
}

export function PortfolioHome() {

  const { setSharedTitle } = useOutletContext<OutletContextType>();
  // const [openEditModal, setOpenEditModal] = useState(false)
  // const [editIndex, setEditIndex] = useState(false)
  // const [projectsData, setProjectsData] = useState<any[]>([]);
  // const [enviosData, setEnviosData] = useState<any[]>([]);
  // const [notificationsData, setNotificationsData] = useState<any[]>([]);
  // const [typeNoficationData, setTypeNotificationData] = useState<any[]>([]);
  // const [criteriaData, setCriteriaData] = useState<any[]>([]);

  // const onOpenEditModal = (index: any) => {
  //   setEditIndex(index)
  //   setOpenEditModal(true)
  // }

  // const deleteEnvio = async (index: any) => {

  //   const response = await fetch(server.dev_url + '/notifications/delete_envio', {

  //     method: 'POST',
  //     headers: { 'Content-Type': 'application/json' },
  //     body: JSON.stringify({ idEnvio: index }),

  //   }).then((response) => response.json())

  //     .then((data) => {
  //       console.dir(data)
  //       if (data[0].code) {
  //         // getEnviosData()
  //       } else {
  //         alert(data[0].message);

  //       }

  //     });

  // }
  // const getTypeNotificationData = async () => {


  //   const response = await fetch(server.dev_url + '/notifications/get_type_notification', {

  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },

  //   }).then((response) => {

  //     if (!response.ok) {
  //       alert("Error desconocido.");
  //     }
  //     return response.json()
  //   })
  //     .then((data) => {

  //       if (data[0].code) {

  //         setTypeNotificationData(data[0].data)

  //       } else {

  //         alert(data[0].message);

  //       }

  //     });
  // }

  // const getEnviosData = async () => {
  //   console.dir('getting envios')
  //   const response = await fetch(server.dev_url + '/notifications/get_envios', {

  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },

  //   }).then((response) => {

  //     console.dir(response)

  //     if (!response.ok) {
  //       alert("Error desconocido.");
  //     }
  //     return response.json()
  //   })
  //     .then((data) => {
  //       console.dir(data)
  //       if (data[0].code) {

  //         setEnviosData(data[0].data)

  //       } else {

  //         alert(data[0].message);

  //       }

  //     });
  // }

  // const getProjectData = async () => {


  //   const response = await fetch(server.dev_url + '/projects/get_projects', {

  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },

  //   }).then((response) => {

  //     if (!response.ok) {
  //       alert("Error desconocido.");
  //     }
  //     return response.json()
  //   })
  //     .then((data) => {


  //       if (data[0].code) {

  //         setProjectsData(data[0].data)

  //       } else {

  //         alert(data[0].message);

  //       }

  //     });
  // }

  // const getCriteriaData = async () => {


  //   const response = await fetch(server.dev_url + '/notifications/get_criterios', {

  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },

  //   }).then((response) => {

  //     if (!response.ok) {

  //       alert("Error desconocido.");

  //     }
  //     return response.json()
  //   })
  //     .then((data) => {

  //       console.dir('criterios')
  //       console.dir(data)
  //       if (data[0].code) {

  //         setCriteriaData(data[0].data)

  //       } else {

  //         alert(data[0].message);

  //       }

  //     });
  // }

  // const getNotificationData = async () => {

  //   const response = await fetch(server.dev_url + '/notifications/get_notifications', {

  //     method: 'GET',
  //     headers: { 'Content-Type': 'application/json' },

  //   }).then((response) => {

  //     if (!response.ok) {
  //       alert("Error desconocido.");
  //     }
  //     return response.json()
  //   })
  //     .then((data) => {
  //       console.dir(data);

  //       if (data[0].code) {

  //         setNotificationsData(data[0].data);

  //       } else {

  //         alert(data[0].message);

  //       }

  //     });
  // }

  useEffect(() => {
    // getEnviosData()
    // getProjectData()
    // getNotificationData()
    // getTypeNotificationData()
    // getCriteriaData()
    setSharedTitle('');

  }, [])



  return (

    <Grid container direction='row' spacing={{ xl: 2, md: 5 }}>
      <Grid item md={12} xl={10}>
        <Stack spacing={2} p={'10vw'}>
        <GlitchTypography text={'Hi, I\'m Luis Florencio'}>
        
      </GlitchTypography>
         

          <Typography
            sx={{
              fontFamily: 'Libre Franklin, Arial, sans-serif',
              fontWeight: '200',
              fontSize: '20px',
              width: '100%',
              color: 'lightgray'
              // backgroundColor:'green',
              // textAlign: 'center'
            }}
          >
            Senior Systems Analyst with a focus on mobile applications, Swift application developer expert
          </Typography>

          <Typography
            sx={{
              fontFamily: 'Libre Franklin, Arial, sans-serif',
              fontWeight: '200',
              fontSize: '20px',
              width: '100%',
              color: 'lightgray'
              // backgroundColor:'green',
              // textAlign: 'center'
            }}
          >
            My main focus is to building clean, simple and user friendly interfaces,
            to bring aplications to the users that they could use as tools in their everyday lives.
            I prefer to provide users with all the information on how to use an app through intuitive design rather than written instructions.
            I know it’s not always possible, but whenever it is, I make sure to take advantage of it.
          </Typography>



          <Box sx={{ flexGrow: 1, marginLeft: '0vw', width: '97.4vw', transition: 'width 0.2s ease, margin 0.2s ease' }}>
            <Typography
              sx={{
                fontFamily: 'Libre Franklin, Arial, sans-serif',
                fontWeight: '200',
                fontSize: '20px',
                width: '100%',
                color: 'lightgray',
              }}
            >
              <Link
                to="/landingPage/resume/"
                style={{ textDecoration: 'none', color: 'lightgray' }}
              >
                <Box component="span" sx={{ textDecoration: 'underline', fontWeight: '200', fontSize: '25px', color: 'lightgray' }}>
                  My experience
                </Box>
              </Link>
              →
            </Typography>
          </Box>

        </Stack>
      </Grid>
    </Grid>

  )

}